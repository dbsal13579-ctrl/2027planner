/* ══════════════════════════════════════════════════════════════
   여러 기기 동기화 + 이메일 로그인 (Firebase Auth + Firestore REST API)
   - 별도 Firebase SDK 없이 fetch()로 REST API를 직접 호출합니다.
   - 같은 이메일/비밀번호로 로그인하면 모든 기기에서 같은 데이터를 봅니다.
═══════════════════════════════════════════════════════════════ */
(function(){
    const FIREBASE_CONFIG = {
        apiKey: "AIzaSyCW8U1VNxI8COr-HR0RTg2ydgpOLE-VBTc",
        projectId: "planner-99d73"
    };

    const COLLECTION = "planners";
    // 이 키들은 로그인/토큰/동기화 메타정보라서 클라우드로 보내지 않고 이 기기에만 저장
    const EXCLUDED_KEYS = ['sync_auth_uid','sync_auth_idtoken','sync_auth_refreshtoken','sync_auth_email','sync_last_synced_at'];

    const originalSetItem = Storage.prototype.setItem.bind(localStorage);
    const originalRemoveItem = Storage.prototype.removeItem.bind(localStorage);
    const originalGetItem = Storage.prototype.getItem.bind(localStorage);

    function firestoreUrl(uid){
        return `https://firestore.googleapis.com/v1/projects/${FIREBASE_CONFIG.projectId}/databases/(default)/documents/${COLLECTION}/${uid}`;
    }

    function authUrl(kind){
        return `https://identitytoolkit.googleapis.com/v1/accounts:${kind}?key=${FIREBASE_CONFIG.apiKey}`;
    }

    function refreshUrl(){
        return `https://securetoken.googleapis.com/v1/token?key=${FIREBASE_CONFIG.apiKey}`;
    }

    // ── 인증 상태 ──
    let authState = { uid:null, idToken:null, refreshToken:null, email:null };

    function loadStoredAuth(){
        authState.uid = originalGetItem('sync_auth_uid');
        authState.idToken = originalGetItem('sync_auth_idtoken');
        authState.refreshToken = originalGetItem('sync_auth_refreshtoken');
        authState.email = originalGetItem('sync_auth_email');
    }

    function storeAuth(a){
        authState = { ...authState, ...a };
        if(a.uid) originalSetItem('sync_auth_uid', a.uid);
        if(a.idToken) originalSetItem('sync_auth_idtoken', a.idToken);
        if(a.refreshToken) originalSetItem('sync_auth_refreshtoken', a.refreshToken);
        if(a.email) originalSetItem('sync_auth_email', a.email);
    }

    function clearAuth(){
        EXCLUDED_KEYS.forEach(k=>originalRemoveItem(k));
        authState = { uid:null, idToken:null, refreshToken:null, email:null };
    }

    async function signUp(email, password){
        const res = await fetch(authUrl('signUp'), {
            method:'POST', headers:{'Content-Type':'application/json'},
            body: JSON.stringify({ email, password, returnSecureToken:true })
        });
        const json = await res.json();
        if(!res.ok) throw new Error(json?.error?.message || '회원가입 실패');
        return json;
    }

    async function signIn(email, password){
        const res = await fetch(authUrl('signInWithPassword'), {
            method:'POST', headers:{'Content-Type':'application/json'},
            body: JSON.stringify({ email, password, returnSecureToken:true })
        });
        const json = await res.json();
        if(!res.ok) throw new Error(json?.error?.message || '로그인 실패');
        return json;
    }

    async function refreshIdToken(){
        const res = await fetch(refreshUrl(), {
            method:'POST', headers:{'Content-Type':'application/x-www-form-urlencoded'},
            body: `grant_type=refresh_token&refresh_token=${encodeURIComponent(authState.refreshToken)}`
        });
        const json = await res.json();
        if(!res.ok) throw new Error('토큰 갱신 실패');
        storeAuth({ idToken: json.id_token, refreshToken: json.refresh_token, uid: json.user_id });
        return json.id_token;
    }

    function authHeader(){
        return { 'Authorization': `Bearer ${authState.idToken}` };
    }

    // ── Firestore 데이터 읽기/쓰기 ──
    function snapshotLocalStorage(){
        const obj = {};
        for(let i=0;i<localStorage.length;i++){
            const k = localStorage.key(i);
            if(EXCLUDED_KEYS.includes(k)) continue;
            obj[k] = localStorage.getItem(k);
        }
        return obj;
    }

    function applySnapshotToLocalStorage(obj){
        const keysToRemove = [];
        for(let i=0;i<localStorage.length;i++){
            const k = localStorage.key(i);
            if(!EXCLUDED_KEYS.includes(k)) keysToRemove.push(k);
        }
        keysToRemove.forEach(k=>originalRemoveItem(k));
        Object.keys(obj).forEach(k=>originalSetItem(k, obj[k]));
    }

    // 반환값: { data: {...} | null, updatedAt: string | null } — 문서가 없으면 둘 다 null
    async function fetchCloudData(){
        let res = await fetch(firestoreUrl(authState.uid), { headers: authHeader() });
        if(res.status === 401){
            await refreshIdToken();
            res = await fetch(firestoreUrl(authState.uid), { headers: authHeader() });
        }
        if(res.status === 404) return { data:null, updatedAt:null };
        if(!res.ok) throw new Error('Firestore fetch failed: ' + res.status);
        const json = await res.json();
        const dataStr = json?.fields?.data?.stringValue;
        const updatedAt = json?.fields?.updatedAt?.timestampValue || null;
        let data = null;
        if(dataStr){ try { data = JSON.parse(dataStr); } catch(e){ data = null; } }
        return { data, updatedAt };
    }

    // 성공 시 실제로 서버에 기록된 updatedAt(ISO 문자열)을 반환
    async function pushCloudData(obj){
        const nowIso = new Date().toISOString();
        const body = {
            fields: {
                data: { stringValue: JSON.stringify(obj) },
                updatedAt: { timestampValue: nowIso }
            }
        };
        let res = await fetch(firestoreUrl(authState.uid), {
            method:'PATCH',
            headers: { 'Content-Type':'application/json', ...authHeader() },
            body: JSON.stringify(body)
        });
        if(res.status === 401){
            await refreshIdToken();
            res = await fetch(firestoreUrl(authState.uid), {
                method:'PATCH',
                headers: { 'Content-Type':'application/json', ...authHeader() },
                body: JSON.stringify(body)
            });
        }
        if(!res.ok) throw new Error('Firestore push failed: ' + res.status);
        return nowIso;
    }

    // ── localStorage 변경 감지 → 자동 업로드 ──
    let pushTimer = null;
    let syncEnabled = false;
    let statusEl = null;

    function setStatus(text, color){
        if(!statusEl) return;
        statusEl.textContent = text;
        statusEl.style.color = color || '#94a3b8';
    }

    function schedulePush(){
        if(!syncEnabled) return;
        clearTimeout(pushTimer);
        setStatus('저장 대기중…', '#f59e0b');
        pushTimer = setTimeout(async ()=>{
            try{
                const syncedAt = await pushCloudData(snapshotLocalStorage());
                originalSetItem('sync_last_synced_at', syncedAt);
                setStatus(`${authState.email} · 저장됨 ✓`, '#10b981');
            }catch(e){
                console.error(e);
                setStatus('저장 실패 (연결 확인)', '#ef4444');
            }
        }, 1200);
    }

    Storage.prototype.setItem = function(k, v){
        originalSetItem(k, v);
        if(!EXCLUDED_KEYS.includes(k)) schedulePush();
    };
    Storage.prototype.removeItem = function(k){
        originalRemoveItem(k);
        if(!EXCLUDED_KEYS.includes(k)) schedulePush();
    };

    // 50분마다 idToken 자동 갱신 (기본 만료 1시간)
    setInterval(()=>{ if(authState.refreshToken) refreshIdToken().catch(e=>console.error(e)); }, 50*60*1000);

    // ── UI ──
    function buildLoginOverlay(){
        const overlay = document.createElement('div');
        overlay.id = 'sync-overlay';
        overlay.style.cssText = 'position:fixed;inset:0;background:#f7f8fc;z-index:99999;display:flex;align-items:center;justify-content:center;font-family:Pretendard,sans-serif;';
        overlay.innerHTML = `
            <div style="max-width:380px;width:90%;background:#fff;border-radius:24px;padding:32px 28px;box-shadow:0 20px 50px rgba(15,23,42,.12);text-align:center;">
                <div style="font-size:22px;font-weight:900;color:#0f172a;margin-bottom:8px;">🔐 로그인</div>
                <div style="font-size:14px;color:#64748b;margin-bottom:20px;line-height:1.5;">이메일로 로그인하면 어떤 기기에서든<br>같은 플래너 데이터를 볼 수 있어요.</div>
                <input id="sync-email" type="email" placeholder="이메일"
                    style="width:100%;box-sizing:border-box;padding:12px 16px;border:2px solid #e2e8f0;border-radius:14px;font-size:15px;font-weight:600;outline:none;margin-bottom:8px;">
                <input id="sync-password" type="password" placeholder="비밀번호 (6자 이상)"
                    style="width:100%;box-sizing:border-box;padding:12px 16px;border:2px solid #e2e8f0;border-radius:14px;font-size:15px;font-weight:600;outline:none;margin-bottom:12px;">
                <button id="sync-signin"
                    style="width:100%;padding:12px;border:none;border-radius:14px;background:#23D196;color:#fff;font-weight:900;font-size:15px;cursor:pointer;margin-bottom:8px;">
                    로그인
                </button>
                <button id="sync-signup"
                    style="width:100%;padding:12px;border:2px solid #23D196;border-radius:14px;background:#fff;color:#23D196;font-weight:900;font-size:15px;cursor:pointer;margin-bottom:10px;">
                    처음이에요 (회원가입)
                </button>
                <button id="sync-skip"
                    style="width:100%;padding:10px;border:none;background:transparent;color:#94a3b8;font-weight:700;font-size:13px;cursor:pointer;">
                    로그인 없이 이 기기에서만 사용
                </button>
                <div id="sync-msg" style="margin-top:10px;font-size:13px;color:#ef4444;min-height:16px;"></div>
            </div>`;
        document.body.appendChild(overlay);
        return overlay;
    }

    function loadApp(){
        const s = document.createElement('script');
        s.src = 'app.js';
        document.body.appendChild(s);
    }

    function addStatusBadge(){
        statusEl = document.createElement('div');
        statusEl.id = 'sync-status-badge';
        statusEl.style.cssText = 'position:fixed;bottom:70px;right:12px;z-index:9998;font-size:11px;font-weight:800;background:rgba(255,255,255,.9);padding:5px 10px;border-radius:999px;box-shadow:0 4px 12px rgba(15,23,42,.08);cursor:pointer;';
        statusEl.textContent = authState.email ? `${authState.email} · 동기화중` : '이 기기에만 저장';
        statusEl.title = '탭하면 로그아웃할 수 있어요';
        statusEl.onclick = ()=>{
            if(!authState.email){ alert('로그인하지 않은 상태예요.'); return; }
            if(confirm(`${authState.email} 계정에서 로그아웃할까요?`)){
                clearAuth();
                location.reload();
            }
        };
        document.body.appendChild(statusEl);
    }

    async function hydrateAndLaunch(){
        const overlay = document.createElement('div');
        overlay.id = 'sync-loading';
        overlay.style.cssText = 'position:fixed;inset:0;background:#f7f8fc;z-index:99999;display:flex;align-items:center;justify-content:center;font-family:Pretendard,sans-serif;color:#64748b;font-weight:700;';
        overlay.textContent = '동기화 중…';
        document.body.appendChild(overlay);
        try{
            const { data: cloudData, updatedAt: cloudUpdatedAt } = await fetchCloudData();
            const localSyncedAt = originalGetItem('sync_last_synced_at');

            if(!cloudData){
                // 클라우드에 아직 데이터가 없음 → 내 기기 데이터를 올림
                const syncedAt = await pushCloudData(snapshotLocalStorage());
                originalSetItem('sync_last_synced_at', syncedAt);
            } else if(!localSyncedAt || (cloudUpdatedAt && cloudUpdatedAt > localSyncedAt)){
                // 클라우드가 내가 마지막으로 동기화한 시점보다 최신 → 다른 기기에서 바뀐 것이므로 받아옴
                applySnapshotToLocalStorage(cloudData);
                originalSetItem('sync_last_synced_at', cloudUpdatedAt);
            } else {
                // 내 기기 데이터가 최신이거나 같음 → 혹시 이전에 업로드가 실패했을 수 있으니 다시 올려둠
                const syncedAt = await pushCloudData(snapshotLocalStorage());
                originalSetItem('sync_last_synced_at', syncedAt);
            }
            syncEnabled = true;
        }catch(e){
            console.error('동기화 실패, 로컬 데이터로 계속 진행합니다.', e);
        }
        overlay.remove();
        addStatusBadge();
        loadApp();
    }

    async function start(){
        loadStoredAuth();

        // 저장된 로그인 정보로 자동 로그인 시도
        if(authState.refreshToken && authState.uid){
            try{
                await refreshIdToken();
                await hydrateAndLaunch();
                return;
            }catch(e){
                console.error('자동 로그인 실패, 다시 로그인해주세요.', e);
                clearAuth();
            }
        }

        const overlay = buildLoginOverlay();
        const emailEl = overlay.querySelector('#sync-email');
        const pwEl = overlay.querySelector('#sync-password');
        const msg = overlay.querySelector('#sync-msg');
        const signinBtn = overlay.querySelector('#sync-signin');
        const signupBtn = overlay.querySelector('#sync-signup');
        const skipBtn = overlay.querySelector('#sync-skip');

        skipBtn.onclick = ()=>{
            overlay.remove();
            syncEnabled = false;
            addStatusBadge();
            loadApp();
        };

        async function handle(kind){
            const email = emailEl.value.trim();
            const password = pwEl.value;
            if(!email || !password){ msg.textContent = '이메일과 비밀번호를 입력해주세요.'; return; }
            signinBtn.disabled = signupBtn.disabled = true;
            msg.style.color = '#94a3b8';
            msg.textContent = '처리 중…';
            try{
                const result = kind === 'signUp' ? await signUp(email, password) : await signIn(email, password);
                storeAuth({ uid: result.localId, idToken: result.idToken, refreshToken: result.refreshToken, email: result.email });
                overlay.remove();
                await hydrateAndLaunch();
            }catch(e){
                msg.style.color = '#ef4444';
                msg.textContent = translateError(e.message);
                signinBtn.disabled = signupBtn.disabled = false;
            }
        }

        signinBtn.onclick = ()=>handle('signIn');
        signupBtn.onclick = ()=>handle('signUp');
    }

    function translateError(m){
        if(!m) return '오류가 발생했어요.';
        if(m.includes('EMAIL_EXISTS')) return '이미 가입된 이메일이에요. 로그인을 눌러주세요.';
        if(m.includes('INVALID_PASSWORD') || m.includes('INVALID_LOGIN_CREDENTIALS')) return '이메일 또는 비밀번호가 틀렸어요.';
        if(m.includes('EMAIL_NOT_FOUND')) return '가입되지 않은 이메일이에요. 회원가입을 눌러주세요.';
        if(m.includes('WEAK_PASSWORD')) return '비밀번호는 6자 이상이어야 해요.';
        if(m.includes('INVALID_EMAIL')) return '올바른 이메일 형식이 아니에요.';
        return m;
    }

    document.addEventListener('DOMContentLoaded', start);
})();
