/* ═══════════════════════════════════════════════
   SCHEDULE LOGIC (from tracker)
═══════════════════════════════════════════════ */
function bookSeq(sp,ep,daily){const r=[];for(const[h,ppd]of daily){let c=sp;while(c<=ep){r.push({h,s:c,e:Math.min(c+ppd-1,ep)});c+=ppd;}}return r;}
function rep(h,ppd,n){return Array(n).fill(null).map(()=>[h,ppd]);}
const ox2=bookSeq(8,363,[...rep('2회',16,23),...rep('3회',16,23),...rep('4회',20,20)]).slice(0,65);
const gi2=bookSeq(12,1256,[...rep('2회',40,32),...rep('3회',40,34)]).slice(0,65);
const hak2=bookSeq(3,922,[...rep('2회',42,22),...rep('3회',42,22),...rep('4회',42,22)]).slice(0,65);
const hs2=bookSeq(1,503,[...rep('2회',25,21),...rep('3회',25,21),...rep('4회',25,24)]).slice(0,65);
const ed2=(()=>{const r=[];for(const h of['1회','2회','3회']){let c=1;while(c<=50){r.push({h,s:c,e:Math.min(c+2,50)});c+=3;}}while(r.length<65)r.push({h:'3회유지',s:48,e:50});return r;})();
const eg2=(()=>{const r=[];for(const h of['1회','2회'])for(let d=1;d<=30;d++)r.push({h,d});while(r.length<65)r.push({h:'2회유지',d:30});return r;})();
const hn2=(()=>{const r=[];let b=14;for(let i=0;i<57;i++){r.push({t:'인강',l:i+1,s:b,e:Math.min(b+5,1440)});b+=6;}for(let i=0;i<8;i++){r.push({t:'집중',l:0,s:b,e:Math.min(b+19,1440)});b+=20;}return r;})();
const ox3=bookSeq(8,363,[...rep('5회',8,45),...rep('6회',8,70)]).slice(0,113);
const gi3=bookSeq(12,1256,[...rep('4회',23,55),...rep('5회',23,60)]).slice(0,113);
const kk3=(()=>{const r=[];bookSeq(8,443,rep('각풀기①',11,40)).forEach(x=>r.push(x));bookSeq(8,300,rep('비각기OX①',11,27)).forEach(x=>r.push(x));bookSeq(8,300,rep('비각기OX②',14,22)).forEach(x=>r.push(x));bookSeq(8,300,rep('비각기OX③',18,17)).forEach(x=>r.push(x));while(r.length<113)r.push({h:'OX③',s:283,e:300});return r;})();
const hk3=bookSeq(3,922,[...rep('5회',25,37),...rep('6회',25,37),...rep('7회',25,40)]).slice(0,113);
const ec3=(()=>{const r=[];bookSeq(12,880,[...rep('객경①',37,24),...rep('객경②',50,18),...rep('객경③',50,18),...rep('객경④',50,18)]).forEach(x=>r.push({t:'b',...x}));for(const h of['모의①','모의②'])for(let i=1;i<=35;i++)r.push({t:'m',h,r:i});while(r.length<113)r.push({t:'m',h:'모의②',r:35});return r;})();
const hn3=(()=>{const r=[];const add=(a)=>a.forEach(x=>r.push(x));add(bookSeq(516,1440,rep('비헌기①(잔)',46,21)));add(bookSeq(14,1440,rep('비헌기②',57,26)));add(bookSeq(14,1096,rep('기출①',76,15)));add(bookSeq(14,1440,rep('비헌기③',76,19)));add(bookSeq(14,1440,rep('비헌기④',76,19)));add(bookSeq(14,1096,rep('기출②',115,12)));while(r.length<113)r.push({h:'기출②유지',s:1082,e:1096});return r;})();

function cntWD(a,b){let n=0;const c=new Date(a+'T00:00:00'),t=new Date(b+'T00:00:00');while(c<t){if(c.getDay()!==0)n++;c.setDate(c.getDate()+1);}return n;}

function getSched(ds){
    try{
        const dow=new Date(ds+'T00:00:00').getDay();
        if(dow===0)return{type:'sun'};
        if(ds>='2026-04-06'&&ds<='2026-06-19'){
            const i=cntWD('2026-04-06',ds);if(i>=65)return null;
            const o=ox2[i],g=gi2[i],hk=hak2[i],hs=hs2[i],ed=ed2[i],eg=eg2[i],hn=hn2[Math.min(i,64)];
            return{type:'p2',phase:'Phase 2 · 지방직 9급',tot:565,subs:[
                {n:'행정법OX',   m:80, r:`${o.h}: ${o.s}~${o.e}p`,   pg:true},
                {n:'행정법기출', m:60, r:`${g.h}: ${g.s}~${g.e}p`,   pg:true},
                {n:'행정학기출', m:85, r:`${hk.h}: ${hk.s}~${hk.e}p`,pg:true},
                {n:'한국사기출', m:50, r:`${hs.h}: ${hs.s}~${hs.e}p`,pg:true},
                {n:'국어모의',   m:40, r:`${i+1}회차`,               pg:false},
                {n:'영어단어',   m:15, r:`${ed.h}: ${ed.s}~${ed.e}일치`,pg:false},
                {n:'영어문법',   m:15, r:`${eg.h}: ${eg.d}일치`,     pg:false},
                {n:'영어독해',   m:50, r:`${i+1}회차`,               pg:false},
                {n:'경제인강',   m:70, r:`${i+1}강`,                 pg:false},
                {n:'헌법',       m:100,r:hn.t==='인강'?`인강${hn.l}강+비헌기${hn.s}~${hn.e}p`:`비헌기집중 ${hn.s}~${hn.e}p`,pg:true},
            ]};
        }
        if(ds>='2026-06-22'&&ds<='2026-10-30'){
            const i=cntWD('2026-06-22',ds);if(i>=113)return null;
            const o=ox3[i],g=gi3[i],kk=kk3[i],hk=hk3[i];let gu=66+i;if(gu>100)gu-=100;
            const ec=ec3[i],hn=hn3[i];
            return{type:'p3',phase:'Phase 3 · 지방직 7급',tot:590,subs:[
                {n:'행정법OX',   m:30, r:`${o.h}: ${o.s}~${o.e}p`,  pg:true},
                {n:'행정법기출', m:35, r:`${g.h}: ${g.s}~${g.e}p`,  pg:true},
                {n:'각론',       m:55, r:`${kk.h}: ${kk.s}~${kk.e}p`,pg:true},
                {n:'행정학기출', m:50, r:`${hk.h}: ${hk.s}~${hk.e}p`,pg:true},
                {n:'국어모의',   m:40, r:`${gu}회차`,                pg:false},
                {n:'경제',       m:150,r:ec.t==='b'?`${ec.h}: ${ec.s}~${ec.e}p`:`${ec.h}: ${ec.r}회차`,pg:ec.t==='b'},
                {n:'헌법',       m:230,r:`${hn.h}: ${hn.s}~${hn.e}p`,pg:true},
            ]};
        }
        return null;
    }catch{return null;}
}

/* ═══════════════════════════════════════════════
   THEMES
═══════════════════════════════════════════════ */
const THEMES = {
    morningdew:  { name:'모닝듀',      color:'#FDDD41', rgb:'253,221,65',  solid:'#FCD617', solidRgb:'252,214,23' },
    watermelon:  { name:'수박크러쉬',  color:'#FB5050', rgb:'251,80,80',   solid:'#FA2A2A', solidRgb:'250,42,42' },
    mintmojito:  { name:'민트모히토',  color:'#4BD9A9', rgb:'75,217,169',  solid:'#23D196', solidRgb:'35,209,150' },
    clearsky:    { name:'클리어스카이',color:'#87D7F9', rgb:'135,215,249', solid:'#6DCEF8', solidRgb:'109,206,248' },
    mojito:      { name:'모히토',      color:'#D8EB73', rgb:'216,235,115', solid:'#D0E654', solidRgb:'208,230,84' },
    dreamviolet: { name:'드림바이올렛',color:'#8D72ED', rgb:'141,114,237', solid:'#7453E9', solidRgb:'116,83,233' },
    summervibes: { name:'섬머바이브',  color:'#FC9334', rgb:'252,147,52',  solid:'#FB7B07', solidRgb:'251,123,7' },
    dreamysurf:  { name:'드리미서프',  color:'#EEC2CF', rgb:'238,194,207', solid:'#EAB4C4', solidRgb:'234,180,196' },
    aurora:      { name:'오로라',      color:'#404559', rgb:'64,69,89',    solid:'#161C34', solidRgb:'22,28,52' },
    forest:      { name:'포레스트',    color:'#A6B66B', rgb:'166,182,107', solid:'#93A64B', solidRgb:'147,166,75' },
    lilacblue:   { name:'라일락블루',  color:'#8998C0', rgb:'137,152,192', solid:'#6F81B2', solidRgb:'111,129,178' },
    grayscale:   { name:'그레이스케일',color:'#868686', rgb:'134,134,134', solid:'#6C6C6C', solidRgb:'108,108,108' },
    pebble:      { name:'페블',        color:'#6294A2', rgb:'98,148,162',  solid:'#3F7D8D', solidRgb:'63,125,141' },
    deepwave:    { name:'딥웨이브',    color:'#5068A2', rgb:'80,104,162',  solid:'#29478E', solidRgb:'41,71,142' },
};

/* 실제 참고 사진(9개 팔레트) 스와치에서 직접 픽셀 추출한 6색.
   국어/영어/행정학/행정법/단어/모의고사 순서로 매칭 */
const SUBJECT_SWATCHES = {
    morningdew:  { 국어:'#FEF9E3', 영어:'#FCEF93', 행정학:'#FDD51B', 행정법:'#98CFF6', 단어:'#60A5E8', 모의고사:'#346C8F' },
    watermelon:  { 국어:'#F72D2D', 영어:'#F7C5BE', 행정학:'#D8E68E', 행정법:'#A5BD29', 단어:'#93E47E', 모의고사:'#22CD6D' },
    mintmojito:  { 국어:'#E5FFF2', 영어:'#99FACD', 행정학:'#AAEEED', 행정법:'#EAF090', 단어:'#CCEE8D', 모의고사:'#7AD605' },
    clearsky:    { 국어:'#F2F4F3', 영어:'#E7E7E9', 행정학:'#C8CCCF', 행정법:'#A6ADB3', 단어:'#E2F3FA', 모의고사:'#C2E9FA' },
    mojito:      { 국어:'#CFE35D', 영어:'#F9BDBF', 행정학:'#FAF9DB', 행정법:'#CFE9E0', 단어:'#EDF1F2', 모의고사:'#FDEECD' },
    dreamviolet: { 국어:'#EFECF5', 영어:'#D5C6F1', 행정학:'#9E8CE0', 행정법:'#ADE0D9', 단어:'#76BABB', 모의고사:'#F4F085' },
    summervibes: { 국어:'#FFE6A1', 영어:'#F9C740', 행정학:'#FEA98A', 행정법:'#FD5F22', 단어:'#82BFF5', 모의고사:'#2388E0' },
    dreamysurf:  { 국어:'#F7F5F6', 영어:'#F4E5EC', 행정학:'#F3CEDF', 행정법:'#EEEBE6', 단어:'#E5F0F2', 모의고사:'#8F9DA8' },
    aurora:      { 국어:'#162961', 영어:'#3D4B7A', 행정학:'#489EB5', 행정법:'#A7C5CF', 단어:'#35FD79', 모의고사:'#1EDC94' },
    forest:      { 국어:'#527E05', 영어:'#BACD73', 행정학:'#A0B99C', 행정법:'#C6E4A4', 단어:'#94A654', 모의고사:'#4D6B47' },
    lilacblue:   { 국어:'#A5B3E0', 영어:'#DFE2F5', 행정학:'#F1F3FF', 행정법:'#D8ECF7', 단어:'#BCD7EA', 모의고사:'#7EA8C0' },
    grayscale:   { 국어:'#1C1C1C', 영어:'#6E6E6E', 행정학:'#838383', 행정법:'#C2C2C2', 단어:'#D2D2D2', 모의고사:'#F6F6F6' },
    pebble:      { 국어:'#141D2E', 영어:'#3E7C8B', 행정학:'#70B2BE', 행정법:'#C68988', 단어:'#E69F7F', 모의고사:'#ECCBBC' },
    deepwave:    { 국어:'#28496A', 영어:'#2A478D', 행정학:'#3E79BB', 행정법:'#609BC7', 단어:'#9DCBFF', 모의고사:'#DBEBFA' },
};

/* 위 원본 스와치를 과목 배지/기록용 파스텔로 가공한 값.
   - 채도(0.30~0.50)·명도(0.74~0.87) 범위로 맞춰 "너무 쨍하거나 너무 흐린" 색이 없게 통일
   - 그러고도 같은 테마 안에서 색상(Hue)이 서로 너무 가까우면(26도 미만) 자동으로 살짝 밀어내서
     늘 6개 과목이 파스텔톤을 유지하면서도 서로 구분되게 함 */
const SUBJECT_BG = {
    morningdew:  { 국어:'#F3E4DB', 영어:'#E0EBC3', 행정학:'#E7DFB8', 행정법:'#C3DAEB', 단어:'#B8BDE7', 모의고사:'#B9E6E5' },
    watermelon:  { 국어:'#E7B8BF', 영어:'#F2DFD7', 행정학:'#E7E4B8', 행정법:'#D5E7B8', 단어:'#C0E7B8', 모의고사:'#B8E7CD' },
    mintmojito:  { 국어:'#DBF3E1', 영어:'#C5ECDF', 행정학:'#C8E9ED', 행정법:'#E9E1BB', 단어:'#DAE7B8', 모의고사:'#C4E7B8' },
    clearsky:    { 국어:'#E0EEE4', 영어:'#E6E0EE', 행정학:'#CFDAE5', 행정법:'#C1C3DE', 단어:'#DBF3EC', 모의고사:'#DBF1F3' },
    mojito:      { 국어:'#D5E7B8', 영어:'#F2D8D9', 행정학:'#F3F1DB', 행정법:'#DCEFE9', 단어:'#E0ECEE', 모의고사:'#F3E7DB' },
    dreamviolet: { 국어:'#E4E0EE', 영어:'#ECD9F2', 행정학:'#B8BEE7', 행정법:'#C4E9DE', 단어:'#BFDADF', 모의고사:'#E7E5B8' },
    summervibes: { 국어:'#E9EECC', 영어:'#E7DAB8', 행정학:'#EABFC6', 행정법:'#E7C5B8', 단어:'#B8C6E7', 모의고사:'#B8DCE7' },
    dreamysurf:  { 국어:'#EEE0ED', 영어:'#F1DDE7', 행정학:'#F3DBDC', 행정법:'#EEE9E0', 단어:'#DFEEEF', 모의고사:'#C1CFDE' },
    aurora:      { 국어:'#B8C1E7', 영어:'#C8C0DF', 행정학:'#BBE4E1', 행정법:'#C1D3DE', 단어:'#B8E7BB', 모의고사:'#B8E7CF' },
    forest:      { 국어:'#DAE7B8', 영어:'#E6CFB8', 행정학:'#C1DED1', 행정법:'#CDEAC0', 단어:'#DFDBC0', 모의고사:'#C1DEC4' },
    lilacblue:   { 국어:'#BEC8E9', 영어:'#EBDBF3', 행정학:'#E0DBF3', 행정법:'#DBF3EA', 단어:'#CFEFEF', 모의고사:'#BFD3DF' },
    grayscale:   { 국어:'#DEC1D8', 영어:'#DECDC1', 행정학:'#DEC1C8', 행정법:'#E0C6D2', 단어:'#E9DAD5', 모의고사:'#EEECE0' },
    pebble:      { 국어:'#BDC5E2', 영어:'#BDD5E1', 행정학:'#BDE1DD', 행정법:'#E0BEC6', 단어:'#E7C1B8', 모의고사:'#F0E5D0' },
    deepwave:    { 국어:'#BAE4E5', 영어:'#CFB8E7', 행정학:'#B9B8E7', 행정법:'#B8E6D7', 단어:'#CAE2ED', 모의고사:'#DBE4F3' },
};

function normalizeSubjectForPalette(name){
    const n=String(name||'');
    if(n.includes('단어')) return '단어';
    if(n.includes('영어')) return '영어';
    if(n.includes('모의')) return '모의고사';
    if(n.includes('국어')) return '국어';
    if(n.includes('행정학') || n.includes('행학')) return '행정학';
    if(n.includes('행정법') || n.includes('행법')) return '행정법';
    return null;
}

function setTheme(key) {
    const t = THEMES[key] || THEMES.clearsky;
    document.documentElement.style.setProperty('--pc', t.color);
    document.documentElement.style.setProperty('--pc-rgb', t.rgb);
    document.documentElement.style.setProperty('--pc-solid', t.solid);
    document.documentElement.style.setProperty('--pc-solid-rgb', t.solidRgb);
    currentTheme = key;
    localStorage.setItem('young_theme', key);
    render();
}

function pcAlpha(a) {
    const rgb = THEMES[currentTheme]?.rgb || '101,111,128';
    return `rgba(${rgb},${a})`;
}

function getThemeAccent(){
    const accents={
        morningdew:'🌼',
        watermelon:'🍉',
        mintmojito:'🌿',
        clearsky:'☁️',
        mojito:'🍈',
        dreamviolet:'💜',
        summervibes:'🍹',
        dreamysurf:'🐚',
        aurora:'🌌',
        forest:'🌲',
        lilacblue:'💠',
        grayscale:'⬛',
        pebble:'🪨',
        deepwave:'🌊'
    };
    return accents[currentTheme] || '✦';
}

const TIMETABLE_COLORS = {
    rose: {
        title:'#C06080', header:'#E8A0BC', headerDark:'#DD8EAE', grid:'#F0D8E4', ink:'#7A5060', hourBg:'#FEF0F5', hourText:'#C06080', empty:'#FEFEFE',
        subjects:{헌법:'#C9A0C8', 경제:'#E8B4C8', 영어:'#F2CCDA', 국어:'#F9C0BB', 한국사:'#FAD4C0', 행정학:'#F7BAD0', 행정법:'#FDE8EF', 점심:'#F5C2CE', 운동:'#EAAFC0', 샤워:'#EDD5E8', 낮잠:'#E8D0F0'}
    },
    pink: {
        title:'#B55C86', header:'#DDA4BE', headerDark:'#CF86A7', grid:'#EFD5E1', ink:'#7C5164', hourBg:'#FDF1F6', hourText:'#B55C86', empty:'#FFFDFE',
        subjects:{헌법:'#D7B4D8', 경제:'#EDC2D4', 영어:'#F5D9E5', 국어:'#F9D0C8', 한국사:'#FBE0D1', 행정학:'#F5C9DB', 행정법:'#FDECF3', 점심:'#F7D2DC', 운동:'#F0C5D4', 샤워:'#F0DFF0', 낮잠:'#ECDCF5'}
    },
    marine: {
        title:'#3F7F3A', header:'#9FD49A', headerDark:'#7DB777', grid:'#D8EBD4', ink:'#53704E', hourBg:'#F3FBF0', hourText:'#3F7F3A', empty:'#FDFFFC',
        subjects:{헌법:'#8FB36A', 경제:'#D5E4C9', 영어:'#E0EED7', 국어:'#F7DFD2', 한국사:'#F9E7D7', 행정학:'#BFE3A5', 행정법:'#EAF6E5', 점심:'#F5D9DE', 운동:'#D7EDD5', 샤워:'#E7E5F0', 낮잠:'#E5E1F2'}
    },
    navy: {
        title:'#38549C', header:'#8DA4D8', headerDark:'#7088C4', grid:'#D8E0F0', ink:'#4C5D82', hourBg:'#F3F6FC', hourText:'#38549C', empty:'#FCFDFF',
        subjects:{헌법:'#98A9D8', 경제:'#D3D8EF', 영어:'#E2E4F6', 국어:'#F5DAD3', 한국사:'#F8E4D9', 행정학:'#B8C7EC', 행정법:'#EBEFF8', 점심:'#EFD9E8', 운동:'#D8E7E2', 샤워:'#E7E2F2', 낮잠:'#E2DEF3'}
    },
    red: {
        title:'#B24F64', header:'#E3A1A8', headerDark:'#D1848D', grid:'#F0D8DA', ink:'#7A525C', hourBg:'#FDF2F3', hourText:'#B24F64', empty:'#FFFEFE',
        subjects:{헌법:'#D9B7C4', 경제:'#EDC0C7', 영어:'#F5D9DE', 국어:'#F8D1C8', 한국사:'#FAE0D1', 행정학:'#F3C5D0', 행정법:'#FCECEF', 점심:'#F4CED6', 운동:'#E9BEC8', 샤워:'#EADFED', 낮잠:'#E6DCF1'}
    },
    orange: {
        title:'#CA6B32', header:'#F0BE95', headerDark:'#E29C68', grid:'#F4DEC9', ink:'#86624C', hourBg:'#FFF6F0', hourText:'#CA6B32', empty:'#FFFDFC',
        subjects:{헌법:'#D9C2D7', 경제:'#EFC8D5', 영어:'#F6DCE5', 국어:'#F8D2BB', 한국사:'#FBE0C4', 행정학:'#F2B9C4', 행정법:'#FDF0F4', 점심:'#F8D7D4', 운동:'#ECD1C6', 샤워:'#EEE2EE', 낮잠:'#E8E0F4'}
    },
    teal: {
        title:'#3C96A2', header:'#9FDCE0', headerDark:'#7CC8CF', grid:'#D6ECEE', ink:'#4F7076', hourBg:'#F1FBFC', hourText:'#3C96A2', empty:'#FCFEFE',
        subjects:{헌법:'#95B8DE', 경제:'#D1DFF0', 영어:'#DDEAF6', 국어:'#F5D9D2', 한국사:'#FAE5DA', 행정학:'#A9E1D6', 행정법:'#E8F7F8', 점심:'#F2DBE1', 운동:'#CFE8DF', 샤워:'#E4E4F1', 낮잠:'#E2E1F3'}
    },
    gold: {
        title:'#C79A2B', header:'#E7C86A', headerDark:'#DDB852', grid:'#EFE4C8', ink:'#7E6A3B', hourBg:'#FFF8E8', hourText:'#C79A2B', empty:'#FFFDF7',
        subjects:{헌법:'#D9C36A', 경제:'#F2E2A8', 영어:'#F8EDC9', 국어:'#F7DFC8', 한국사:'#F3E7D6', 행정학:'#DDD59A', 행정법:'#FBF3D9', 점심:'#F6D8CF', 운동:'#E3E8C8', 샤워:'#E8E1D6', 낮잠:'#E6DFF0'}
    },
    mint: {
        title:'#2D9B85', header:'#94DACB', headerDark:'#6CC7B3', grid:'#D4ECE5', ink:'#486F67', hourBg:'#F1FCF8', hourText:'#2D9B85', empty:'#FCFEFD',
        subjects:{헌법:'#8FB7D8', 경제:'#D1E0F0', 영어:'#DFE9F7', 국어:'#F5D9CE', 한국사:'#F9E5D8', 행정학:'#A7E0C8', 행정법:'#E8F8F4', 점심:'#F1DCE2', 운동:'#CFE8DA', 샤워:'#E5E5F1', 낮잠:'#E3E1F4'}
    }
};

const TIMETABLE_COLS = [10,20,30,40,50,60];
const TIMETABLE_PHASES = {
    phase1: {
        label:'Phase 1',
        sub:'현재 시간표',
        legend:['헌법','경제','영어','국어','한국사','행정학','행정법'],
        schedule:[
            ['5',  ['행정법','행정법','행정법','행정법','행정법','행정법']],
            ['6',  ['행정법','행정법','행정법', null,   '행정법','행정법']],
            ['7',  ['행정법','행정법','행정법','행정법','행정법','행정법']],
            ['8',  ['행정법', null,  '행정학','행정학','행정학','행정학']],
            ['9',  ['행정학','행정학','행정학','행정학','행정학', null   ]],
            ['10', ['한국사','한국사','한국사','한국사','한국사','한국사']],
            ['11', [ null,  '국어', '국어', '국어', '국어', '국어']],
            ['12', 'LUNCH'],
            ['1',  'EXERCISE'],
            ['2',  'SPLIT'],
            ['3',  ['영어', '영어', '영어', '영어', '영어', '영어']],
            ['4',  [ null,  '경제', '경제', '경제', '경제', '경제']],
            ['5',  ['경제', '경제',  null,  '헌법','헌법','헌법']],
            ['6',  ['헌법','헌법',  '헌법', null,  '헌법','헌법']],
            ['7',  ['헌법','헌법',  null,   null,  null,  null ]],
            ['8',  [ null,  null,   null,   null,  null,  null ]],
            ['9',  [ null,  null,   null,   null,  null,  null ]],
            ['10', [ null,  null,   null,   null,  null,  null ]]
        ]
    },
    phase2: {
        label:'Phase 2',
        sub:'6월 20일 이후',
        legend:['헌법','경제','행정학','국어','행정법'],
        schedule:[
            ['5',  ['헌법','헌법','헌법','헌법','헌법','헌법']],
            ['6',  [ null, '헌법','헌법','헌법','헌법','헌법']],
            ['7',  ['헌법', null, '경제','경제','경제','경제']],
            ['8',  ['경제','경제','경제','경제','경제', null]],
            ['9',  ['경제','경제','경제','경제','경제','경제']],
            ['10', [ null, '행정법','행정법','행정법','행정법','행정법']],
            ['11', ['행정법', null, '국어','국어','국어','국어']],
            ['12', 'LUNCH'],
            ['1',  'EXERCISE'],
            ['2',  'SPLIT'],
            ['3',  ['행정법','행정법','행정법','행정법','행정법','행정법']],
            ['4',  [ null, '행정학','행정학','행정학','행정학','행정학']],
            ['5',  ['행정학','행정학','행정학','행정학', null, '헌법']],
            ['6',  ['헌법','헌법','헌법','헌법','헌법', null]],
            ['7',  ['헌법','헌법','헌법','헌법','헌법','헌법']],
            ['8',  [ null,  null,   null,   null,  null,  null ]],
            ['9',  [ null,  null,   null,   null,  null,  null ]],
            ['10', [ null,  null,   null,   null,  null,  null ]]
        ]
    }
};

function getTimetableTheme(){
    return TIMETABLE_COLORS[currentTheme] || TIMETABLE_COLORS.rose;
}

const PROGRESS_SUBJECT_ORDER = ['한국사','국어','영어','행정학','행정법','헌법','경제','모의고사'];

function getProgressSubjectRank(name){
    const n = String(name || '');
    if(n.includes('한국사')) return PROGRESS_SUBJECT_ORDER.indexOf('한국사');
    if(n.includes('영어')) return PROGRESS_SUBJECT_ORDER.indexOf('영어');
    if(n.includes('국어') || n.includes('모의')) {
        if(n.includes('모의')) return PROGRESS_SUBJECT_ORDER.indexOf('모의고사');
        return PROGRESS_SUBJECT_ORDER.indexOf('국어');
    }
    if(n.includes('행정학') || n.includes('행학')) return PROGRESS_SUBJECT_ORDER.indexOf('행정학');
    if(n.includes('행정법') || n.includes('행법')) return PROGRESS_SUBJECT_ORDER.indexOf('행정법');
    if(n.includes('헌법')) return PROGRESS_SUBJECT_ORDER.indexOf('헌법');
    if(n.includes('경제')) return PROGRESS_SUBJECT_ORDER.indexOf('경제');
    return 999;
}

/* ═══════════════════════════════════════════════
   STATE
═══════════════════════════════════════════════ */
const TODAY = localDateStr(); // ★ 로컬 날짜 기준

let scheduleData   = JSON.parse(localStorage.getItem('young_study_v4'))    || [];
let completedTasks = JSON.parse(localStorage.getItem('young_completed'))   || {};
const DEFAULT_REVIEW_COUNTS = {};
let reviewCounts   = JSON.parse(localStorage.getItem('young_reviews'))     || DEFAULT_REVIEW_COUNTS;
let studyTimes     = JSON.parse(localStorage.getItem('young_study_times')) || {};
let pageActuals    = JSON.parse(localStorage.getItem('young_page_actuals'))|| {}; // ★ 실제 도달 페이지
let currentTheme   = localStorage.getItem('young_theme') || 'gray';
let currentTab     = 'planner';
let currentView    = 'month';
let currentRecords = 'week';
let currentRecordMode = 'study';
let currentTimetablePhase = 'phase1';
let monthShowAllTasks = JSON.parse(localStorage.getItem('young_month_show_all_tasks') || 'false');
let ganttShowWeekday = JSON.parse(localStorage.getItem('young_gantt_show_weekday') || 'true'); // 달력 탭(연간계획표) 항목 옆 요일 표기 on/off
let viewDate       = new Date();
let weekRefDate    = new Date();
let selectedDate   = TODAY;
let weekMemos      = JSON.parse(localStorage.getItem('young_week_memos')) || {};
let mockScores     = JSON.parse(localStorage.getItem('young_mock_scores')) || [];
const DEFAULT_MOCK_SCORES = [];

const MOCK_SUBJECTS = ['국어','영어','행정학','행정법'];
mockScores = [...mockScores, ...DEFAULT_MOCK_SCORES]
    .reduce((acc, entry)=>{
        const idx=acc.findIndex(item=>item.date===entry.date);
        if(idx>=0) acc[idx]=entry.updatedAt >= (acc[idx].updatedAt || 0) ? entry : acc[idx];
        else acc.push(entry);
        return acc;
    }, [])
    .sort((a,b)=>a.date.localeCompare(b.date));

mockScores = mockScores.filter(entry=>!(
    entry?.date==='2026-04-04' &&
    entry?.label==='국가직 9급' &&
    Number(entry?.scores?.['국어'])===95 &&
    Number(entry?.scores?.['영어'])===100 &&
    Number(entry?.scores?.['한국사'])===90 &&
    Number(entry?.scores?.['행정학'])===90 &&
    Number(entry?.scores?.['행정법'])===65
));
localStorage.setItem('young_mock_scores', JSON.stringify(mockScores));

if(reviewCounts['경제학']!==undefined && reviewCounts['경제']===undefined){
    reviewCounts['경제'] = reviewCounts['경제학'];
}
reviewCounts = { ...DEFAULT_REVIEW_COUNTS, ...reviewCounts };

// Timer state
let timerDate      = TODAY;
let timerSubjects  = [];
let timerReady     = false;
let timerInterval  = null;
let timerSaveT     = null;
let timerDates     = JSON.parse(localStorage.getItem('yst4_dates')) || [];
let timerLogs      = []; // [{n, color, startSec, endSec}] 당일 0시 기준 초

// Records state
let recordsYear  = new Date().getFullYear();
let recordsMonth = new Date().getMonth();
let recordsWeekRef = new Date();

const DEFAULT_EXAM_DATES = [
    {name:'국가직 9급', date:'2026-04-04'},
    {name:'지방직 9급', date:'2026-06-20'},
    {name:'지방직 7급', date:'2026-10-31'},
];
let examDates = lsGet('young_exam_dates') || DEFAULT_EXAM_DATES;
let progressItems = lsGet('young_progress_items') || [];
let todayCondition = lsGet(`young_condition_${TODAY}`) || '상';
let restDays = lsGet('young_rest_days') || [];
const CONDITION_RATIO = { '상':1.2, '중':1.0, '하':0.5 };
let progressCollapsedSubjects = lsGet('young_progress_collapsed') || {};
let hiddenItemsPanelOpen = false;
let piFormOpen = true; // 진도 탭 "진도 항목 등록" 폼 접기/펼치기 상태 (기본은 펼침)

// 특정 날짜의 컨디션(상/중/하) 조회 — 오늘이면 메모리 값, 아니면 저장된 값(없으면 기본 '상')
function getConditionForDate(date){
    if(date===TODAY) return todayCondition;
    return lsGet(`young_condition_${date}`) || '상';
}

/* ═══════════════════════════════════════════════
   UTILS
═══════════════════════════════════════════════ */
// ★ 로컬 날짜 기준 YYYY-MM-DD 반환 (toISOString은 UTC 기준이라 한국에서 날짜 오류 발생)
function localDateStr(d) {
    const dt = d || new Date();
    const y  = dt.getFullYear();
    const m  = String(dt.getMonth()+1).padStart(2,'0');
    const dy = String(dt.getDate()).padStart(2,'0');
    return `${y}-${m}-${dy}`;
}
function toKey(d)  { return d instanceof Date ? localDateStr(d) : d; }
function weekStart(d){const x=new Date(d);x.setHours(0,0,0,0);x.setDate(x.getDate()-(x.getDay()===0?6:x.getDay()-1));return x;}
function fmtHHMM(sec){ const h=Math.floor(sec/3600),m=Math.floor((sec%3600)/60);return `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}`; }
function fmtHHMMSS(sec){ const h=Math.floor(sec/3600),m=Math.floor((sec%3600)/60),s=Math.floor(sec%60);return `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`; }
function fmtSec(s) { return fmtHHMM(s); }
function fmtMin(m) { return fmtHHMM(m*60); }
function fmtTimerSec(s){ return `${Math.floor(s/60)}:${String(s%60).padStart(2,'0')}`; }
function getWeekMemoKey(refDate){ return toKey(weekStart(refDate)); }
function getUpcomingSunday(refDate = new Date()){
    const d = new Date(refDate);
    d.setHours(0,0,0,0);
    const add = (7 - d.getDay()) % 7;
    d.setDate(d.getDate() + add);
    return toKey(d);
}

// ★ 태스크에서 페이지 범위 파싱 — "진출 3~20p" → {start:3, end:20}
function parseTaskPages(task){
const m=task.match(/(\d+)~(\d+)\s*(p|회|강)/);
if(!m) return null;
return {start:+m[1], end:+m[2], unit:m[3]};
}

function getTaskSubject(task){
    const tagged=task.match(/\[(.*?)\]/)?.[1]?.trim() || '';
    if(tagged) return tagged;
    const inferred=normalizeReviewSubject(task);
    return inferred!==String(task||'') ? inferred : '';
}

function getDayTaskSubjects(dateKey){
    const day=scheduleData.find(d=>d.date===dateKey);
    if(!day?.tasks?.length) return [];
    return [...new Set(
        day.tasks
            .map(task=>getTaskSubject(task))
            .filter(Boolean)
    )];
}

// ★ 태스크 1개의 달성도(0~, 목표보다 더 했으면 100%를 넘어감) 계산
function getTaskCompletion(dateKey, idx, task){
    const pages=parseTaskPages(task);
    if(pages){
        const actual=pageActuals[`${dateKey}-${idx}`];
        if(actual!==undefined && actual!==''){
            const span=pages.end - pages.start;
            if(span<=0) return (+actual>=pages.end) ? 1 : 0; // 목표 구간이 0이면 도달 여부로만 판단
            const ratio=(+actual - pages.start)/span;
            return Math.max(0, ratio); // ★ 목표보다 더 했으면(예: 11/10강) 100%를 넘게 표시
        }
    }
    // 페이지 없거나 미입력 → 체크박스 기준
    return completedTasks[`${dateKey}-${idx}`] ? 1 : 0;
}

/* ═══════════════════════════════════════════════
   진도 탭: 과목/항목/전체 분량을 미리 등록해두면,
   플래너에 [과목] 항목명... 형식으로 쓴 기록을 찾아
   자동으로 "지금 어디까지 했는지" 계산해서 보여줌
═══════════════════════════════════════════════ */
function canonicalSubjectName(name){
    const n=String(name||'').trim();
    if(!n) return '기타';
    if(n.includes('한국사')) return '한국사';
    if(n.includes('단어')) return '단어';
    if(n.includes('영어')) return '영어';
    if(n.includes('모의')) return '모의고사';
    if(n.includes('국어')) return '국어';
    if(n.includes('행정학')||n.includes('행학')) return '행정학';
    if(n.includes('행정법')||n.includes('행법')) return '행정법';
    if(n.includes('헌법')) return '헌법';
    if(n.includes('경제')) return '경제';
    return n;
}

function findMatchingProgressItem(subject, taskText){
    if(!subject) return null;
    const canonSub = canonicalSubjectName(subject);
    return progressItems.find(p => p.subject===canonSub && taskText && taskText.includes(p.name));
}

function saveProgressItems(){
    localStorage.setItem('young_progress_items', JSON.stringify(progressItems));
}

let editingProgressItemId=null;

function getSelectedWeekdays(){
    return [...document.querySelectorAll('#pi-weekday-group .weekday-btn.active')].map(b=>+b.dataset.day);
}

// 컨디션(상/중/하)이 바뀌면, 그 날 플래너에 이미 추가해둔 "진도 목표" 태스크 중
// 아직 실제값을 입력하지 않은(=손대지 않은) 항목의 목표 분량을 새 컨디션에 맞게 다시 계산해서 갱신
// (예: 하루 적정 목표가 10일 때 상=12, 중=10, 하=5로 목표 범위 자체를 다시 씀)
function syncPlannerGoalsForCondition(date){
    const day=scheduleData.find(dd=>dd.date===date);
    if(!day || !day.tasks?.length) return;
    let changed=false;
    day.tasks=day.tasks.map((t,idx)=>{
        const sub=getTaskSubject(t);
        const txt=t.replace(/^\[.*?\]\s*/,'');
        const item=findMatchingProgressItem(sub, txt);
        if(!item) return t;
        const pages=parseTaskPages(t);
        if(!pages || pages.unit!==item.unit) return t;
        const actualKey=`${date}-${idx}`;
        const hasActual = pageActuals[actualKey]!==undefined && pageActuals[actualKey]!=='';
        const isDone = !!completedTasks[actualKey];
        if(hasActual || isDone) return t; // 이미 실제값을 입력했거나 완료 체크한 목표는 건드리지 않음
        const prog=computeItemProgress(item, date);
        if(prog.todayTarget===null || prog.remaining<=0) return t;
        const newEnd=Math.min(item.total, pages.start + prog.todayTarget - 1);
        if(newEnd===pages.end) return t;
        changed=true;
        const prefix=t.match(/^\[.*?\]\s*/)?.[0] || '';
        const newTxt=txt.replace(/\d+~\d+\s*(p|회|강)/, `${pages.start}~${newEnd}${pages.unit}`);
        return prefix+newTxt;
    });
    if(changed) saveAll();
}

function setTodayCondition(level, date){
    const d = date || selectedDate || TODAY;
    if(d===TODAY) todayCondition=level;
    localStorage.setItem(`young_condition_${d}`, JSON.stringify(level));
    syncPlannerGoalsForCondition(d);
    renderProgress();
    if(currentTab==='planner' && currentView==='day') renderPlanner();
}

function toggleTodayRestDay(date){
    const d = date || selectedDate || TODAY;
    if(restDays.includes(d)){
        restDays=restDays.filter(x=>x!==d);
        showToast('쉬는 날 취소했어요');
    } else {
        restDays=[...restDays, d];
        showToast(d===TODAY ? '😴 오늘은 쉬는 날로 표시했어요' : '😴 쉬는 날로 표시했어요');
    }
    localStorage.setItem('young_rest_days', JSON.stringify(restDays));
    renderProgress();
    if(currentTab==='planner' && currentView==='day') renderPlanner();
}

function updateMinutesLabel(){
    const unitEl=document.getElementById('pi-unit-input');
    const label=document.getElementById('pi-minperunit-label');
    if(!unitEl || !label) return;
    label.textContent = unitEl.value==='p' ? '10p당 분 (선택)' : '1개당 분 (선택)';
}

function toggleWeekdayBtn(btn){
    btn.classList.toggle('active');
    btn.style.background = btn.classList.contains('active') ? 'var(--pc-solid)' : '';
    btn.style.color = btn.classList.contains('active') ? '#fff' : '';
    btn.style.borderColor = btn.classList.contains('active') ? 'var(--pc-solid)' : '';
}

function resetProgressForm(){
    ['pi-subject-input','pi-name-input','pi-total-input','pi-start-input','pi-deadline-input','pi-dpw-input','pi-passes-input','pi-passdays-input','pi-minperunit-input'].forEach(id=>{
        const e=document.getElementById(id); if(e) e.value='';
    });
    document.querySelectorAll('#pi-weekday-group .weekday-btn').forEach(b=>{
        b.classList.remove('active'); b.style.background=''; b.style.color=''; b.style.borderColor='';
    });
    editingProgressItemId=null;
    const btn=document.getElementById('pi-submit-btn');
    if(btn){ btn.textContent='추가'; }
    const cancelBtn=document.getElementById('pi-cancel-btn');
    if(cancelBtn) cancelBtn.classList.add('hidden');
}

function startEditProgressItem(id){
    const item=progressItems.find(p=>p.id===id);
    if(!item) return;
    if(!piFormOpen){
        piFormOpen=true;
        document.getElementById('pi-form-body')?.classList.remove('hidden');
        const arrow=document.getElementById('pi-form-toggle-arrow');
        if(arrow) arrow.style.transform='rotate(90deg)';
    }
    document.getElementById('pi-subject-input').value=item.subject||'';
    document.getElementById('pi-name-input').value=item.name||'';
    document.getElementById('pi-total-input').value=item.total||'';
    document.getElementById('pi-unit-input').value=item.unit||'p';
    updateMinutesLabel();
    document.getElementById('pi-start-input').value=item.startDate||'';
    document.getElementById('pi-deadline-input').value=item.deadline||'';
    document.getElementById('pi-dpw-input').value=item.daysPerWeek||'';
    document.getElementById('pi-passes-input').value=item.totalPasses||'';
    document.getElementById('pi-passdays-input').value=item.passTargetDays||'';
    document.getElementById('pi-minperunit-input').value=item.minutesPerUnit||'';
    document.querySelectorAll('#pi-weekday-group .weekday-btn').forEach(b=>{
        const on=(item.studyDays||[]).includes(+b.dataset.day);
        b.classList.toggle('active',on);
        b.style.background = on ? 'var(--pc-solid)' : '';
        b.style.color = on ? '#fff' : '';
        b.style.borderColor = on ? 'var(--pc-solid)' : '';
    });
    editingProgressItemId=id;
    const btn=document.getElementById('pi-submit-btn');
    if(btn) btn.textContent='수정 완료';
    const cancelBtn=document.getElementById('pi-cancel-btn');
    if(cancelBtn) cancelBtn.classList.remove('hidden');
    document.getElementById('pi-form-card')?.scrollIntoView({behavior:'smooth', block:'start'});
}

function cancelEditProgressItem(){
    resetProgressForm();
}

function addProgressItem(){
    const subEl=document.getElementById('pi-subject-input');
    const nameEl=document.getElementById('pi-name-input');
    const totalEl=document.getElementById('pi-total-input');
    const unitEl=document.getElementById('pi-unit-input');
    const startEl=document.getElementById('pi-start-input');
    const deadlineEl=document.getElementById('pi-deadline-input');
    const dpwEl=document.getElementById('pi-dpw-input');
    const passesEl=document.getElementById('pi-passes-input');
    const passDaysEl=document.getElementById('pi-passdays-input');
    const minPerUnitEl=document.getElementById('pi-minperunit-input');
    const subject=(subEl?.value||'').trim();
    const name=(nameEl?.value||'').trim();
    const total=+((totalEl?.value||'').trim());
    const unit=(unitEl?.value||'p').trim();
    const startDate=(startEl?.value||'').trim() || null;
    const deadline=(deadlineEl?.value||'').trim() || null;
    const studyDays=getSelectedWeekdays();
    const daysPerWeek=studyDays.length ? studyDays.length : (dpwEl?.value ? Math.max(1, Math.min(7, +dpwEl.value)) : null);
    const totalPasses=passesEl?.value ? Math.max(1, +passesEl.value) : 1;
    const passTargetDays=passDaysEl?.value ? Math.max(1, +passDaysEl.value) : null;
    const minutesPerUnit=minPerUnitEl?.value ? Math.max(0, +minPerUnitEl.value) : null;
    if(!subject || !name || !total || total<=0){ showToast('과목·항목명·전체 분량을 입력해 주세요'); return; }

    if(editingProgressItemId){
        progressItems=progressItems.map(p=> p.id===editingProgressItemId
            ? {...p, subject:canonicalSubjectName(subject), name, total, unit, startDate, deadline, daysPerWeek, studyDays,
               totalPasses, passTargetDays, minutesPerUnit,
               currentPass: Math.min(p.currentPass||1, totalPasses),
               passStartDate: p.passStartDate || startDate || TODAY}
            : p);
        clearAutoScheduleFor(editingProgressItemId, `[${canonicalSubjectName(subject)}] ${name}`); // 요일/주간일수/시작일/마감일이 바뀌었을 수 있으니, 이미 깔아둔 미래 태스크까지 지우고 자동 배치를 다시 계산
        showToast('✓ 수정 완료');
    } else {
        progressItems=[...progressItems, {
            id:Date.now()+Math.random().toString(16).slice(2), subject:canonicalSubjectName(subject), name, total, unit, startDate, deadline, daysPerWeek, studyDays,
            totalPasses, passTargetDays, minutesPerUnit,
            currentPass:1, passStartDate: startDate || TODAY
        }];
        showToast('✓ 진도 항목 추가');
    }
    saveProgressItems();
    autoScheduleWeek();
    resetProgressForm();
    renderProgress();
}

function startNextPass(id){
    const item=progressItems.find(p=>p.id===id);
    if(!item) return;
    const totalPasses=item.totalPasses||1;
    if((item.currentPass||1)>=totalPasses) return;

    const nextPassNum=(item.currentPass||1)+1;
    const suggested=item.passTargetDays || '';
    const input=window.prompt(`${nextPassNum}회독 목표 일수는 며칠로 할까요? (직전 회독보다 줄이고 싶으면 더 작은 숫자를 입력)`, suggested);
    if(input===null) return; // 취소하면 회독 진행 자체를 안 함
    const trimmed=String(input).trim();
    const newTargetDays = trimmed ? Math.max(1, +trimmed) : null;

    progressItems=progressItems.map(p=> p.id===id
        ? {...p, currentPass:nextPassNum, passStartDate:TODAY, passTargetDays:newTargetDays}
        : p);
    saveProgressItems();
    renderProgress();
    showToast(`✓ ${nextPassNum}회독 시작! (목표 ${newTargetDays?newTargetDays+'일':'미설정'})`);
}

function deleteProgressItem(id){
    if(editingProgressItemId===id) resetProgressForm();
    const target=progressItems.find(p=>p.id===id);
    progressItems=progressItems.filter(p=>p.id!==id);
    saveProgressItems();
    clearAutoScheduleFor(id, target ? `[${target.subject}] ${target.name}` : null);
    renderProgress();
    showToast('삭제했어요');
}

// 과목별 항목 목록 접기/펼치기 (기본은 접힘 — 진도율만 보임)
function toggleProgressSection(subName){
    const collapsedNow = (progressCollapsedSubjects[subName] !== false);
    progressCollapsedSubjects={...progressCollapsedSubjects, [subName]: collapsedNow ? false : true};
    localStorage.setItem('young_progress_collapsed', JSON.stringify(progressCollapsedSubjects));
    renderProgress();
}

// 진도 항목 숨기기/숨김 해제 — 숨기면 진도 탭 목록과 달력(연간 계획표) 모두에서 안 보임
function toggleProgressItemHidden(id){
    const before=progressItems.find(p=>p.id===id);
    const willHide=before && !before.hidden;
    progressItems=progressItems.map(p=>p.id===id ? {...p, hidden:!p.hidden} : p);
    saveProgressItems();
    // 숨기는 경우: 이미 자동으로 깔아둔 "오늘 이후" 태스크도 함께 지워서 플래너/달력에서 완전히 사라지게 한다.
    // 숨김 해제하는 경우엔 지우지 않고, 다음 자동 배치 때 새로 계산되게만 기록을 비워둔다.
    if(before) clearAutoScheduleFor(id, willHide ? `[${before.subject}] ${before.name}` : null);
    renderProgress();
    showToast(progressItems.find(p=>p.id===id)?.hidden ? '항목을 숨겼어요' : '숨김을 해제했어요');
}

function toggleHiddenItemsPanel(){
    hiddenItemsPanelOpen=!hiddenItemsPanelOpen;
    renderProgress();
}

function togglePiFormPanel(){
    piFormOpen=!piFormOpen;
    renderProgress();
}

// 진도 탭 항목을 선택해서 플래너(선택한 날)에 오늘 목표를 자동으로 채워 넣기
function addItemGoalToPlanner(id){
    const item=progressItems.find(p=>p.id===id);
    if(!item) return;
    const targetDate = (currentTab==='planner' && currentView==='day' && selectedDate) ? selectedDate : TODAY;
    const prog=computeItemProgress(item, targetDate);
    if(prog.remaining<=0){ showToast('이미 완료된 항목이에요'); return; }
    const amount = Math.max(1, Math.min(prog.remaining, prog.todayTarget || Math.min(prog.remaining, 10)));
    const start = prog.current+1;
    const end = Math.min(item.total, prog.current+amount);
    const taskText = `[${item.subject}] ${item.name} ${start}~${end}${item.unit}`;

    let day=scheduleData.find(d=>d.date===targetDate);
    if(!day){ day={date:targetDate, tasks:[]}; scheduleData.push(day); }
    if(day.tasks.includes(taskText)){
        showToast('이미 추가된 목표예요');
    } else {
        day.tasks.push(taskText);
        saveAll();
        showToast(`✓ ${targetDate} 플래너에 목표 추가됨`);
    }
    goToDay(targetDate);
}

/* ═══════════════════════════════════════════════
   자동 배치: 요일을 직접 고르지 않고 "주 N일"만 정한 항목을
   이번 주(월~일, 오늘 포함) 안에서 이미 할 일이 적게 잡혀 있는 날 순으로
   골라 플래너 태스크를 자동으로 만들어 준다.
   - 한 번 이번 주 배치를 끝낸 항목은 다시 건드리지 않아서, 사용자가 태스크를
     수정하거나 지워도 자동으로 덮어쓰지 않는다(수동 수정 존중).
   - 항목을 수정(요일/주간 일수 변경)하면 그 항목의 배치 기록만 지워서
     다음 자동 배치 때 새로 계산되게 한다.
═══════════════════════════════════════════════ */
function getAutoScheduleStore(){ return lsGet('young_auto_schedule') || {}; }
function saveAutoScheduleStore(store){ try{ localStorage.setItem('young_auto_schedule', JSON.stringify(store)); }catch{} }
// itemPrefix를 넘기면(항목이 숨김/삭제/기간 변경 등으로 더 이상 유효하지 않을 때),
// 자동 배치 기록에 남아있는 "오늘 이후" 날짜에서 이 항목이 자동으로 넣어둔 태스크까지 함께 지운다.
// 이미 지난 날짜(과거 기록)는 실제 학습 이력일 수 있으므로 건드리지 않는다.
function clearAutoScheduleFor(itemId, itemPrefix){
    const store=getAutoScheduleStore();
    const rec=store[itemId];
    if(rec && itemPrefix){
        const prefix=itemPrefix+' ';
        let dataChanged=false;
        (rec.dates||[]).forEach(dateStr=>{
            if(dateStr<TODAY) return; // 과거 날짜는 보존
            const day=scheduleData.find(d=>d.date===dateStr);
            if(!day) return;
            const before=day.tasks.length;
            day.tasks=day.tasks.filter(t=>!t.startsWith(prefix));
            if(day.tasks.length!==before) dataChanged=true;
        });
        if(dataChanged) localStorage.setItem('young_study_v4', JSON.stringify(scheduleData));
    }
    if(store[itemId]){ delete store[itemId]; saveAutoScheduleStore(store); }
}
// 하루에 이미 잡혀 있는 학습량(전 과목 통틀어 그 날짜에 등록된 태스크 개수)을 "부담"의 대략적인 지표로 삼는다
function getDayLoad(dateStr){
    const day=scheduleData.find(d=>d.date===dateStr);
    return day ? day.tasks.length : 0;
}
// ★ 매일 자동 배치 + 최소 3주(21일)치 선(先) 계획:
//   앱을 여는 날마다, 오늘부터 20일 뒤까지의 구간 중 아직 안 채워진 학습일에는
//   태스크를 미리 만들어 둔다. 이미 만들어둔 날짜는 절대 다시 덮어쓰지 않아서
//   사용자가 직접 수정/삭제한 내용은 그대로 존중된다.
//   각 항목의 목표 범위는 "지금까지 실제로 입력한 진도(prog.current)"부터 이어서
//   순서대로 계산하므로, 실제로 더/덜 했으면 그 뒤로 이어지는 계획 전체가 자연스럽게 당겨지거나 밀린다.
const AUTO_SCHEDULE_HORIZON_DAYS=21; // 최소 3주치
function autoScheduleWeek(){
    if(typeof progressItems==='undefined' || !progressItems.length) return;
    const store=getAutoScheduleStore(); // { [itemId]: { dates:[이미 자동배치한 날짜들, 전체 기간] } }
    let changed=false;

    function ourDowOf(dateStr){
        const jsDow=new Date(`${dateStr}T00:00:00`).getDay(); // 0=일 ... 6=토
        return (jsDow+6)%7; // 0=월 ... 6=일
    }
    function addDays(dateStr,n){
        const d=new Date(`${dateStr}T00:00:00`);
        d.setDate(d.getDate()+n);
        return toKey(d);
    }
    const horizonDates=[];
    for(let i=0;i<AUTO_SCHEDULE_HORIZON_DAYS;i++) horizonDates.push(addDays(TODAY,i));

    progressItems.forEach(item=>{
        if(item.hidden) return;

        const prog=computeItemProgress(item, TODAY);
        if(prog.remaining<=0) return; // 이미 끝난 항목은 배치하지 않음

        const rec=store[item.id] || (store[item.id]={dates:[]});
        if(!rec.dates) rec.dates=[];

        const hasWeekdays=item.studyDays && item.studyDays.length>0;
        const hasDaysPerWeek=item.daysPerWeek && item.daysPerWeek>0;
        if(!hasWeekdays && !hasDaysPerWeek) return; // 요일도, 주N일도 지정 안 된 항목은 자동 배치 대상 아님

        const prefix=`[${item.subject}] ${item.name}`;
        // 오늘 목표량 크기: 지금 페이스(마감일/1회독 목표일 기준, 없으면 대략 한 달치 페이스)로 계산해서
        // 이 배치 구간 전체에 동일하게 적용한다(하루하루 실제 입력에 따라 다음 날 시작점만 계속 이어 붙음)
        const sessionsPerWeek = hasWeekdays ? item.studyDays.length : item.daysPerWeek;
        const baseTarget = prog.dailyTarget!==null ? prog.dailyTarget
            : (prog.dailyPace!==null ? prog.dailyPace
                : Math.max(1, Math.ceil(prog.remaining/(sessionsPerWeek*4))));

        let cursor=prog.current; // 오늘 기준 실제 진행 지점부터 이어서 계획을 짠다
        const weekPlacedCount={}; // 이번 배치 실행 중 주(월요일 기준 키)별로 새로 넣은 횟수

        horizonDates.forEach(dateStr=>{
            if(cursor>=item.total) return;
            if(item.startDate && dateStr<item.startDate) return;
            if(item.deadline && dateStr>item.deadline) return; // 마감일이 지난 날짜에는 배치하지 않음(기간 밖 제외)

            if(rec.dates.includes(dateStr)){
                // 이미 배치된 날짜 — 실제로 그 날 잡혀 있는 태스크의 목표 끝 값을 읽어 커서만 이어 붙임
                const existingDay=scheduleData.find(s=>s.date===dateStr);
                const existingTask=existingDay?.tasks.find(t=>t.startsWith(prefix+' '));
                const p=existingTask ? parseTaskPages(existingTask) : null;
                if(p) cursor=Math.max(cursor,p.end);
                return;
            }

            if(hasWeekdays){
                if(!item.studyDays.includes(ourDowOf(dateStr))) return; // 이 항목의 학습 요일이 아님
            } else {
                // 요일 미지정 + "주 N일" 항목 — 그 주에 이미 배치한 횟수(기존+이번 실행분)가 목표를 채우면 건너뜀
                const wKey=getWeekMemoKey(new Date(`${dateStr}T00:00:00`));
                const already=rec.dates.filter(d=>getWeekMemoKey(new Date(`${d}T00:00:00`))===wKey).length
                    + (weekPlacedCount[wKey]||0);
                if(already>=item.daysPerWeek) return;
                weekPlacedCount[wKey]=(weekPlacedCount[wKey]||0)+1;
            }

            const end=Math.min(item.total, cursor+Math.max(1,baseTarget));
            if(end<=cursor) return;

            let day=scheduleData.find(s=>s.date===dateStr);
            if(!day){ day={date:dateStr, tasks:[]}; scheduleData.push(day); }
            const already2=day.tasks.some(t=>t.startsWith(prefix+' '));
            if(!already2){
                day.tasks.push(`${prefix} ${cursor+1}~${end}${item.unit}`);
                changed=true;
            }
            rec.dates.push(dateStr);
            cursor=end;
        });

        // 저장 공간이 계속 불어나지 않도록 최근 60일 ~ 앞으로 배치 구간까지만 남김
        rec.dates=rec.dates.filter(d=>d>=addDays(TODAY,-60));
    });

    saveAutoScheduleStore(store);
    if(changed){
        localStorage.setItem('young_study_v4', JSON.stringify(scheduleData));
    }
}

// ★ 두 날짜 사이(포함)에 이 항목의 학습 세션이 며칠(또는 몇 회)인지 정확히 셈
//   요일을 직접 지정했으면 그 요일 개수를 그대로 세고, 지정 안 했으면 daysPerWeek 비율로 근사한다
function countStudySessionsBetween(item, fromDateStr, toDateStrInclusive){
    if(fromDateStr>toDateStrInclusive) return 0;
    if(item.studyDays && item.studyDays.length>0){
        let count=0;
        let d=new Date(`${fromDateStr}T00:00:00`);
        const end=new Date(`${toDateStrInclusive}T00:00:00`);
        while(d<=end){
            const jsDow=d.getDay();
            const ourDow=(jsDow+6)%7;
            if(item.studyDays.includes(ourDow)) count++;
            d.setDate(d.getDate()+1);
        }
        return count;
    }
    const totalDays=Math.round((new Date(`${toDateStrInclusive}T00:00:00`)-new Date(`${fromDateStr}T00:00:00`))/86400000)+1;
    return totalDays*((item.daysPerWeek||6)/7);
}

// 등록된 항목 하나가 플래너 기록에서 "지금 어디까지 왔는지" + "하루 평균 진도" 계산
function computeItemProgress(item, asOf){
    asOf = asOf || TODAY;
    let current=0;
    let currentBeforeAsOf=0;
    let lastDate=null;
    const workedDates=new Set();
    const passStart = item.passStartDate || item.startDate || null;
    scheduleData.forEach(day=>{
        if(passStart && day.date < passStart) return; // 지금 회독 시작 이전 기록은 지금 회독 진도로 안 침
        (day.tasks||[]).forEach((t,idx)=>{
            const sub=canonicalSubjectName(getTaskSubject(t));
            if(sub!==item.subject) return;
            const txt=t.replace(/^\[.*?\]\s*/,'');
            if(!txt.includes(item.name)) return;

            workedDates.add(day.date);
            const pages=parseTaskPages(t);
            const actualKey=`${day.date}-${idx}`;
            const isDone=!!completedTasks[actualKey];
            let reached=0;
            if(pages && pages.unit===item.unit){
                const actual=pageActuals[actualKey];
                reached=(actual!==undefined && actual!=='') ? +actual : (isDone ? pages.end : 0);
            } else if(isDone){
                reached=item.total; // 페이지 표기가 없는 항목은 체크 완료 시 그 항목 전체 완료로 간주
            }
            if(reached>current){
                current=reached;
                lastDate=day.date;
            }
            if(day.date<asOf && reached>currentBeforeAsOf){
                currentBeforeAsOf=reached;
            }
        });
    });
    current=Math.min(current,item.total);
    currentBeforeAsOf=Math.min(currentBeforeAsOf,item.total);
    let todayDone=Math.max(0, current-currentBeforeAsOf);
    const remaining=Math.max(0,item.total-current);
    const pct=item.total>0 ? Math.max(0, Math.min(100, Math.round(current/item.total*100))) : 0;

    // 하루 평균 진도 (그동안 이 항목을 공부한 날 기준)
    const workedDays=workedDates.size;
    const avgPace = workedDays>0 ? current/workedDays : null;

    // 마감일 + 주간 학습일수 → 하루에 끝내야 하는 양
    // 남은 일수 = 마감일 - 시작일. 단, 기준일이 시작일보다 늦었으면 마감일 - 기준일로 계산
    // 주간 학습일수를 안 정했으면 매일(7일) 기준으로 자동 계산
    let dailyTarget=null, daysUntilDeadline=null, studySessionsLeft=null;
    const effectiveDaysPerWeek = item.daysPerWeek || 6;
    if(item.deadline){
        const asOfDate=new Date(`${asOf}T00:00:00`);
        const start=item.startDate ? new Date(`${item.startDate}T00:00:00`) : asOfDate;
        const refDate = asOfDate > start ? asOfDate : start;
        const dl=new Date(`${item.deadline}T00:00:00`);
        daysUntilDeadline=Math.ceil((dl-refDate)/86400000);
        if(remaining<=0){ dailyTarget=0; studySessionsLeft=0; }
        else{
            // refDate(오늘 또는 시작일)부터 마감일까지, 둘 다 포함해서 실제 학습 세션 수를 정확히 셈
            studySessionsLeft=Math.max(1, Math.round(countStudySessionsBetween(item, toKey(refDate), toKey(dl))));
            dailyTarget=Math.ceil(remaining/studySessionsLeft);
        }
    }
    // 마감일이 없어도 "1회독 목표일"이 있으면 그걸로 전체 페이스(하루 권장량)를 추정
    let dailyPace = dailyTarget;
    if(dailyPace===null && item.passTargetDays && remaining>0){
        dailyPace = Math.max(1, Math.ceil(remaining/item.passTargetDays));
    }
    const minutesDivisor = item.unit==='p' ? 10 : 1;
    const dailyMinutes = (dailyTarget!==null && item.minutesPerUnit) ? Math.round((dailyTarget/minutesDivisor)*item.minutesPerUnit) : null;

    // 그 날의 컨디션(상=120%/중=100%/하=50%)에 맞춰 그 날 목표만 조정 (남은 총량은 그대로라 부족한 만큼 다음날로 자동 이월됨)
    const conditionRatio = CONDITION_RATIO[getConditionForDate(asOf)] ?? 1;
    const baseTarget = dailyTarget!==null ? dailyTarget : dailyPace;
    let todayTarget = (baseTarget!==null && remaining>0)
        ? Math.max(1, Math.min(remaining, Math.round(baseTarget*conditionRatio)))
        : baseTarget;
    // 시작일 이전 조회 시점(asOf)에는 "오늘 목표/완료"를 보여주지 않음.
    // 전체 페이스·잔여량·마감 계산(daysUntilDeadline 등)은 이미 위에서 (마감-시작일) 또는
    // (마감-오늘, 오늘이 시작일 이후일 때) 기준으로 계산돼 있으므로 그대로 유지한다.
    if(item.startDate && asOf < item.startDate){
        todayTarget = null;
        todayDone = 0;
    }
    const todayMinutes = (todayTarget!==null && item.minutesPerUnit) ? Math.round((todayTarget/minutesDivisor)*item.minutesPerUnit) : null;

    // 기준일이 이 항목의 학습 요일인지 (요일을 직접 골랐을 때만 판단 가능)
    let isRestDayToday=null;
    if(item.studyDays && item.studyDays.length>0){
        const jsDow=new Date(`${asOf}T00:00:00`).getDay(); // 0=일 ... 6=토
        const ourDow=(jsDow+6)%7; // 0=월 ... 6=일
        isRestDayToday = !item.studyDays.includes(ourDow);
    }

    // 회독(반복 학습) 진행 상황: 지금 회독이 이 페이스면 며칠 만에 끝날지 예측
    const totalPasses=item.totalPasses||1;
    const currentPass=Math.min(item.currentPass||1, totalPasses);
    let estimatedPassDays=null;
    if(passStart){
        const daysElapsedInPass=Math.max(1, Math.ceil((new Date(`${asOf}T00:00:00`)-new Date(`${passStart}T00:00:00`))/86400000)+1);
        if(current>0) estimatedPassDays=Math.round(daysElapsedInPass/(current/item.total));
    }

    return {current, remaining, pct, lastDate, workedDays, avgPace, dailyTarget, dailyPace, dailyMinutes, daysUntilDeadline, studySessionsLeft, isRestDayToday, totalPasses, currentPass, estimatedPassDays, effectiveDaysPerWeek, todayDone, todayTarget, todayMinutes};
}

function renderProgress(){
    const el=document.getElementById('progress-container');
    if(!el) return;

    const isRestToday = restDays.includes(TODAY); // 오늘 컨디션/쉬는날 설정은 플래너(일간) 탭으로 이동됨

    const subjectOptions=['국어','영어','행정학','행정법','단어','모의고사','한국사','헌법','경제']
        .map(s=>`<option value="${s}">`).join('');

    const formHtml=`<div class="card p-5 mb-5" id="pi-form-card">
        <div class="flex items-center justify-between gap-4 mb-1 cursor-pointer" onclick="togglePiFormPanel()">
            <h3 class="text-[19px] font-black" style="color:var(--pc)">진도 항목 등록</h3>
            <span id="pi-form-toggle-arrow" class="text-slate-300 text-[12px] font-black shrink-0" style="display:inline-block;transform:rotate(${piFormOpen?90:0}deg);transition:transform .15s;">▶</span>
        </div>
        <div id="pi-form-body" class="${piFormOpen?'':'hidden'}">
        <p class="text-[13px] text-slate-400 mb-4">과목·항목명·전체 분량을 등록해두면, 플래너에 <b>[과목] 항목명 ... 숫자~숫자p(또는 회/강)</b> 형식으로 기록할 때마다 진도가 자동으로 계산돼요. 마감일·학습 요일까지 넣으면 하루에 얼마나 해야 하는지, 오늘이 쉬는 날인지도 알려줘요.</p>
        <div class="grid grid-cols-2 md:grid-cols-[1fr_1.2fr_0.7fr_0.7fr_auto] gap-2 mb-2">
            <input id="pi-subject-input" list="pi-subject-list" type="text" placeholder="과목 (예: 행정법)"
                class="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-[14px] font-medium outline-none focus:border-pc col-span-2 md:col-span-1">
            <datalist id="pi-subject-list">${subjectOptions}</datalist>
            <input id="pi-name-input" type="text" placeholder="항목명 (예: 기출)"
                class="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-[14px] font-medium outline-none focus:border-pc col-span-2 md:col-span-1">
            <input id="pi-total-input" type="number" placeholder="전체 분량"
                class="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-[14px] font-medium outline-none focus:border-pc">
            <select id="pi-unit-input" onchange="updateMinutesLabel()" class="bg-slate-50 border border-slate-200 rounded-xl px-2 py-2.5 text-[14px] font-medium outline-none focus:border-pc">
                <option value="p">p (페이지)</option>
                <option value="회">회</option>
                <option value="강">강</option>
            </select>
            <div class="flex gap-2">
                <button id="pi-submit-btn" onclick="addProgressItem()" class="flex-1 bg-pc text-white px-5 py-2.5 rounded-xl text-[14px] font-black hover:opacity-85 transition-all whitespace-nowrap">추가</button>
                <button id="pi-cancel-btn" onclick="cancelEditProgressItem()" class="hidden px-4 py-2.5 rounded-xl text-[14px] font-black bg-slate-100 text-slate-500 whitespace-nowrap">취소</button>
            </div>
        </div>
        <div class="grid grid-cols-2 gap-2 mb-2">
            <div>
                <label class="text-[11px] text-slate-400 font-bold ml-1">시작 날짜 (선택)</label>
                <input id="pi-start-input" type="date"
                    class="pi-date-input w-full bg-slate-50 border border-slate-200 rounded-xl px-2 py-2 text-[13px] font-medium outline-none focus:border-pc mt-1">
            </div>
            <div>
                <label class="text-[11px] text-slate-400 font-bold ml-1">끝내야 하는 날 (선택)</label>
                <input id="pi-deadline-input" type="date"
                    class="pi-date-input w-full bg-slate-50 border border-slate-200 rounded-xl px-2 py-2 text-[13px] font-medium outline-none focus:border-pc mt-1">
            </div>
        </div>
        <div>
            <label class="text-[11px] text-slate-400 font-bold ml-1">학습 요일 (선택) — 요일을 고르거나, 안 고르면 아래 "주 N회"로 계산</label>
            <div class="flex gap-1.5 flex-wrap mt-1.5" id="pi-weekday-group">
                ${['월','화','수','목','금','토','일'].map((d,i)=>`<button type="button" data-day="${i}" onclick="toggleWeekdayBtn(this)" class="weekday-btn w-9 h-9 rounded-full text-[12px] font-bold border border-slate-200 text-slate-500 transition-all">${d}</button>`).join('')}
            </div>
        </div>
        <div class="mt-2">
            <label class="text-[11px] text-slate-400 font-bold ml-1">또는 주간 학습일수 (요일 안 골랐을 때, 1~7)</label>
            <input id="pi-dpw-input" type="number" min="1" max="7" placeholder="예: 5"
                class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-[13px] font-medium outline-none focus:border-pc mt-1">
        </div>
        <div class="grid grid-cols-3 gap-2 mt-2">
            <div>
                <label class="text-[11px] text-slate-400 font-bold ml-1">회독 목표 (선택)</label>
                <input id="pi-passes-input" type="number" min="1" placeholder="예: 2"
                    class="w-full bg-slate-50 border border-slate-200 rounded-xl px-2 py-2 text-[13px] font-medium outline-none focus:border-pc mt-1">
            </div>
            <div>
                <label class="text-[11px] text-slate-400 font-bold ml-1">1회독 목표일 (선택)</label>
                <input id="pi-passdays-input" type="number" min="1" placeholder="예: 12"
                    class="w-full bg-slate-50 border border-slate-200 rounded-xl px-2 py-2 text-[13px] font-medium outline-none focus:border-pc mt-1">
            </div>
            <div>
                <label id="pi-minperunit-label" class="text-[11px] text-slate-400 font-bold ml-1">10p당 분 (선택)</label>
                <input id="pi-minperunit-input" type="number" min="1" placeholder="예: 50"
                    class="w-full bg-slate-50 border border-slate-200 rounded-xl px-2 py-2 text-[13px] font-medium outline-none focus:border-pc mt-1">
            </div>
        </div>
        </div>
    </div>`;

    if(progressItems.length===0){
        el.innerHTML = formHtml + `<div class="card p-10 text-center">
            <p class="text-slate-300 font-black text-lg italic uppercase tracking-widest">No Goals Yet</p>
            <p class="text-slate-400 text-sm mt-2">위에서 항목을 등록하면, 플래너에 기록할 때마다 여기 진도가 자동으로 채워져요.</p>
        </div>`;
        return;
    }

    const allComputed = progressItems.map(item=>({item, ...computeItemProgress(item)}));
    const hiddenComputed = allComputed.filter(c=>c.item.hidden);
    const computed = allComputed.filter(c=>!c.item.hidden); // 숨긴 항목은 목록·집계·달력에서 모두 제외

    const totalItems = computed.length;
    const doneItems = computed.filter(c=>c.pct>=100).length;
    const inProgressItems = computed.filter(c=>c.pct>0 && c.pct<100).length;
    const waitItems = totalItems-doneItems-inProgressItems;
    const overallPct = totalItems>0 ? Math.round(computed.reduce((s,c)=>s+c.pct,0)/totalItems) : 0;

    const hiddenPanelHtml = hiddenComputed.length===0 ? '' : `<div class="card p-4 mb-5">
        <div class="flex items-center justify-between mb-2 cursor-pointer" onclick="toggleHiddenItemsPanel()">
            <span class="text-[13px] font-black text-slate-400">🙈 숨긴 항목 (${hiddenComputed.length}개)</span>
            <span class="text-slate-300 text-[12px] font-black shrink-0" style="display:inline-block;transform:rotate(${hiddenItemsPanelOpen?90:0}deg);transition:transform .15s;">▶</span>
        </div>
        <div class="${hiddenItemsPanelOpen?'':'hidden'} space-y-1.5 mt-2">
            ${hiddenComputed.map(c=>`<div class="flex items-center justify-between gap-2 text-[12px] py-1 border-t border-slate-50 pt-2">
                <span class="text-slate-400 truncate flex-1">[${c.item.subject}] ${c.item.name}</span>
                <button onclick="toggleProgressItemHidden('${c.item.id}')" class="text-[11px] font-black text-pc shrink-0">숨김 해제</button>
            </div>`).join('')}
        </div>
    </div>`;

    // 같은 과목+같은 항목명으로 여러 개를 등록하면, 시작일 순서대로 자동으로 N회독째인지 계산
    const seriesGroups={};
    computed.forEach(c=>{
        const key=`${c.item.subject}|||${c.item.name}|||${c.item.unit==='강'?'강':'비강'}`;
        if(!seriesGroups[key]) seriesGroups[key]=[];
        seriesGroups[key].push(c);
    });
    Object.values(seriesGroups).forEach(group=>{
        group.sort((a,b)=>(a.item.startDate||'9999-99-99').localeCompare(b.item.startDate||'9999-99-99'));
        group.forEach((c,i)=>{ c.seriesIndex=i+1; c.seriesTotal=group.length; });
    });

    const summaryHtml=`
        <div class="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
            <div class="card p-4">
                <div class="metric-eyebrow">전체 진도율</div>
                <div class="metric-value">${overallPct}%</div>
                <div class="metric-sub">${totalItems}개 항목 기준</div>
            </div>
            <div class="card p-4">
                <div class="metric-eyebrow">완료</div>
                <div class="metric-value">${doneItems}</div>
                <div class="metric-sub">완료된 항목</div>
            </div>
            <div class="card p-4">
                <div class="metric-eyebrow">진행중</div>
                <div class="metric-value">${inProgressItems}</div>
                <div class="metric-sub">진행 중인 항목</div>
            </div>
            <div class="card p-4">
                <div class="metric-eyebrow">대기</div>
                <div class="metric-value">${waitItems}</div>
                <div class="metric-sub">아직 시작 전</div>
            </div>
        </div>
        <div class="card p-4 mb-5">
            <div class="flex items-center justify-between mb-2">
                <span class="text-xs font-black text-slate-400 uppercase tracking-wider">전체 진행률</span>
                <span class="text-sm font-black" style="color:var(--pc)">${overallPct}%</span>
            </div>
            <div class="prog-bg" style="height:12px;"><div class="prog-fill" style="width:${overallPct}%;height:100%"></div></div>
        </div>`;

    const statusInfo=(pct)=> pct>=100
        ? {label:'완료', bg:'rgba(34,197,94,.14)', color:'#16a34a'}
        : pct>0
            ? {label:'진행중', bg:'rgba(59,130,246,.14)', color:'#2563eb'}
            : {label:'대기', bg:'#f1f5f9', color:'#80899c'};

    const bySubject={};
    computed.forEach(c=>{
        const sub=c.item.subject;
        if(!bySubject[sub]) bySubject[sub]=[];
        bySubject[sub].push(c);
    });

    const subjectKeys=Object.keys(bySubject).sort((a,b)=>{
        const r=getProgressSubjectRank(a)-getProgressSubjectRank(b);
        return r!==0 ? r : a.localeCompare(b,'ko');
    });

    const sectionsHtml=subjectKeys.map(subName=>{
        const groupInfo={};
        bySubject[subName].forEach(c=>{
            const key=`${c.item.subject}|||${c.item.name}|||${c.item.unit==='강'?'강':'비강'}`;
            if(!groupInfo[key]) groupInfo[key]={done:true, minDeadline:null};
            if(c.pct<100) groupInfo[key].done=false;
            const dl=c.item.deadline;
            if(dl && (c.pct<100)){
                if(!groupInfo[key].minDeadline || dl<groupInfo[key].minDeadline) groupInfo[key].minDeadline=dl;
            }
        });
        const list=[...bySubject[subName]].sort((a,b)=>{
            const ka=`${a.item.subject}|||${a.item.name}|||${a.item.unit==='강'?'강':'비강'}`, kb=`${b.item.subject}|||${b.item.name}|||${b.item.unit==='강'?'강':'비강'}`;
            const ga=groupInfo[ka], gb=groupInfo[kb];
            if(ga.done!==gb.done) return ga.done ? 1 : -1;          // 시리즈 전체 완료된 건 맨 아래로

            if(a.item.startDate && a.item.startDate===b.item.startDate){
                const aLec=a.item.unit==='강', bLec=b.item.unit==='강';
                if(aLec!==bLec) return aLec ? -1 : 1;               // 시작일 같으면 강의(📺)가 위로 — 마감일 비교보다 우선
            }

            // 시작일을 최우선으로 정렬 (마감일 기준으로 정렬하면 시작이 빠른 항목이 뒤로 밀리는 문제가 있었음)
            // 시작일이 없는 항목만 마감일로 대신 비교
            const da=a.item.startDate || ga.minDeadline || null;
            const db=b.item.startDate || gb.minDeadline || null;
            if(da && db && da!==db) return da.localeCompare(db);    // 날짜 빠른 시리즈 먼저
            if(da && !db) return -1;
            if(!da && db) return 1;
            if(ka!==kb) return ka.localeCompare(kb,'ko');           // 다른 시리즈끼리는 이름순
            return (a.seriesIndex||1)-(b.seriesIndex||1);           // 같은 시리즈 안에서는 회차순
        });
        const subjPct=Math.round(list.reduce((s,c)=>s+c.pct,0)/list.length);
        const badgeStyle=getSubjBadgeStyle(subName,false);
        const itemsHtml=list.map(c=>{
            const {item, current, remaining, pct, lastDate, avgPace, dailyTarget, dailyPace, dailyMinutes, daysUntilDeadline, isRestDayToday, totalPasses, currentPass, estimatedPassDays, seriesIndex, seriesTotal, effectiveDaysPerWeek, todayDone, todayTarget, todayMinutes}=c;
            const st=statusInfo(pct);
            const dateLabel = lastDate ? lastDate.slice(5).replace('-','/')+' 기준' : '기록 없음';

            // 회독 배지 — 항목 이름 바로 옆에 붙여서 표시
            const isAutoSeries = seriesTotal>1;
            let passBadge='';
            if(isAutoSeries){
                passBadge=`<span class="text-[10px] font-bold text-slate-400 shrink-0">${seriesIndex}/${seriesTotal}회독</span>`;
            } else if(totalPasses>1 || item.passTargetDays){
                passBadge=`<span class="text-[10px] font-bold text-slate-400 shrink-0">${currentPass}/${totalPasses}회독</span>`;
            }

            // 전체 페이스(하루 권장량) — 오늘 컨디션·쉬는 날과 무관하게 항상 표시
            let paceLineHtml='';
            if(dailyPace!==null && remaining>0){
                const isBehind = avgPace!==null && dailyPace > avgPace;
                const dDayLabel = daysUntilDeadline===null ? '' : (daysUntilDeadline>=0 ? ` · 마감 D-${daysUntilDeadline}` : ` · 기한 지남`);
                const avgLabel = avgPace!==null ? ` · 최근 평균 하루 ${Math.round(avgPace)}${item.unit}` : '';
                paceLineHtml = `<div class="text-[10px] font-bold mt-1 text-slate-400">🎯 전체 페이스: 하루 ${dailyPace}${item.unit}씩${dDayLabel}${avgLabel}${isBehind?' — 페이스업 필요!':''}</div>`;
            }

            // 오늘(혹은 조회 중인 날) 목표 — 컨디션·쉬는 날에 따라 달라짐
            let targetLineHtml='';
            if(remaining<=0){
                targetLineHtml = `<div class="text-[11px] font-bold mt-1" style="color:#16a34a">✓ 목표 분량 완료</div>`;
            } else if(isRestToday){
                targetLineHtml = `<div class="text-[11px] font-bold mt-1 text-slate-400">😴 오늘은 쉬는 날이에요 — 안 해도 진도 계산엔 반영돼 있어요</div>`;
            } else if(isRestDayToday===true){
                const weekdayLabel=['월','화','수','목','금','토','일'].filter((_,i)=>item.studyDays.includes(i)).join('·');
                targetLineHtml = `<div class="text-[11px] font-bold mt-1 text-slate-500">😴 오늘은 쉬는 과목이에요 (학습 요일: ${weekdayLabel})</div>`;
            } else if(todayTarget!==null){
                const todayMinutesLabel = todayMinutes!==null ? ` · ≈${todayMinutes}분` : '';
                targetLineHtml = `<div class="text-[12px] font-black mt-1" style="color:#16a34a">오늘 목표 ${todayTarget}${item.unit} · 한 것 ${todayDone}${item.unit}${todayMinutesLabel}</div>`;
            }

            // 회독(반복 학습) 예상 완료일
            let passLineHtml='';
            if((totalPasses>1 || item.passTargetDays) && estimatedPassDays!==null && remaining>0){
                const targetDaysLabel = item.passTargetDays ? ` (목표 ${item.passTargetDays}일)` : '';
                const overPace = item.passTargetDays && estimatedPassDays > item.passTargetDays;
                passLineHtml = `<div class="text-[11px] font-bold mt-1" style="color:${overPace?'#dc2626':'#475569'}">이 회독 ≈${estimatedPassDays}일이면 끝${targetDaysLabel}${overPace?' — 늦어지고 있어요':''}</div>`;
            }
            if(!isAutoSeries && (totalPasses>1 || item.passTargetDays) && remaining<=0 && currentPass<totalPasses){
                passLineHtml += `<button onclick="startNextPass('${item.id}')" class="mt-1.5 text-[11px] font-black px-3 py-1.5 rounded-full" style="background:${getSubjColor(subName)};color:${getSubjTextColor(subName)}">▶ 다음 회독(${currentPass+1}/${totalPasses}) 시작</button>`;
            }

            return `<div class="py-2.5 border-b border-slate-50 last:border-0">
                <div class="flex items-center justify-between gap-x-2 gap-y-1 mb-1.5 flex-wrap">
                    <div class="flex items-center gap-1.5 min-w-0 flex-1">
                        <span class="text-sm font-bold text-slate-700 truncate">${item.unit==='강'?'📺 ':''}${item.name}</span>
                        ${studyDaysLabel(item) ? `<span class="text-[10px] font-bold text-pc shrink-0">${studyDaysLabel(item)}</span>` : ''}
                        ${passBadge}
                    </div>
                    <span class="text-[10px] text-slate-400 font-bold shrink-0">${dateLabel}</span>
                    <span class="text-[10px] font-black px-2 py-0.5 rounded-full shrink-0" style="background:${st.bg};color:${st.color}">${st.label}</span>
                    <button onclick="addItemGoalToPlanner('${item.id}')" class="text-[10px] text-slate-400 hover:text-pc shrink-0">＋플래너</button>
                    <button onclick="startEditProgressItem('${item.id}')" class="text-[10px] text-slate-400 hover:text-pc shrink-0">수정</button>
                    <button onclick="toggleProgressItemHidden('${item.id}')" class="text-[10px] text-slate-400 hover:text-pc shrink-0">숨기기</button>
                    <button onclick="deleteProgressItem('${item.id}')" class="text-[10px] text-slate-400 hover:text-red-400 shrink-0">삭제</button>
                </div>
                <div class="flex items-center gap-2">
                    <div class="text-[11px] font-semibold text-slate-500 shrink-0" style="min-width:82px;">${current}/${item.total}${item.unit} · 남음 ${remaining}${item.unit}</div>
                    <div class="flex-1 prog-bg"><div class="prog-fill" style="width:${pct}%"></div></div>
                    <div class="text-xs font-black shrink-0" style="min-width:34px;text-align:right;color:${getSubjTextColor(subName)}">${pct}%</div>
                </div>
                ${paceLineHtml}
                ${targetLineHtml}
                ${passLineHtml}
                ${item.startDate && item.deadline ? `<div class="text-[10px] font-semibold text-slate-500 mt-1">${item.startDate.slice(5).replace('-','/')}~${item.deadline.slice(5).replace('-','/')} · 총 ${Math.round((new Date(item.deadline+'T00:00:00')-new Date(item.startDate+'T00:00:00'))/86400000)}일 · 주 ${effectiveDaysPerWeek}일${item.daysPerWeek?'':'(기본값)'}</div>` : ''}
            </div>`;
        }).join('');

        const sectionCollapsed = (progressCollapsedSubjects[subName] !== false); // 기본값: 접힘(진도율만 보임)
        const cardId = `progress-card-${subName.replace(/[^a-zA-Z0-9가-힣]/g,'')}`;

        return `<div class="card p-5 mb-4" id="${cardId}">
            <div class="flex items-center justify-between mb-3 cursor-pointer select-none" onclick="toggleProgressSection('${subName}')">
                <div class="flex items-center gap-2 min-w-0">
                    <span class="px-3 py-1.5 rounded-full text-sm font-black shrink-0" style="${badgeStyle}">${subName}</span>
                    <span class="text-[11px] text-slate-300 font-bold shrink-0">${list.length}개 항목</span>
                </div>
                <div class="flex items-center gap-2 shrink-0">
                    <span class="text-sm font-black" style="color:${getSubjTextColor(subName)}">${subjPct}%</span>
                    <span class="text-slate-300 text-[11px] font-black" style="display:inline-block;transition:transform .15s;transform:rotate(${sectionCollapsed?0:90}deg)">▶</span>
                </div>
            </div>
            <div class="prog-bg mb-4"><div class="prog-fill" style="width:${subjPct}%"></div></div>
            <div class="${sectionCollapsed?'hidden':''}">${itemsHtml}</div>
        </div>`;
    }).join('');

    el.innerHTML = formHtml + summaryHtml + sectionsHtml + hiddenPanelHtml;
    updateMinutesLabel();
}

/* ═══════════════════════════════════════════════
   달력 탭: 진도 탭에서 등록한 항목(시작일~마감일)을 그대로
   가져와서 연간 타임라인(Gantt)으로 자동 표시
═══════════════════════════════════════════════ */
function ymKey(dateStr){ return String(dateStr).slice(0,7); }
function ymAdd(ym, n){
    let [y,m]=ym.split('-').map(Number);
    m+=n;
    while(m>12){ m-=12; y++; }
    while(m<1){ m+=12; y--; }
    return `${y}-${String(m).padStart(2,'0')}`;
}
function ymDiff(a,b){
    const [ay,am]=a.split('-').map(Number), [by,bm]=b.split('-').map(Number);
    return (by-ay)*12+(bm-am);
}
function ymLabel(ym){
    const [y,m]=ym.split('-');
    return {y, m:`${+m}월`};
}

function renderProgressCalendar(){
    const el=document.getElementById('calendar-container');
    if(!el) return;

    const timed=progressItems.filter(it=>it.startDate && it.deadline && !it.hidden);

    if(timed.length===0){
        el.innerHTML=`<div class="card p-10 text-center">
            <p class="text-slate-300 font-black text-lg italic uppercase tracking-widest">No Timeline Yet</p>
            <p class="text-slate-400 text-sm mt-2">진도 탭에서 항목을 등록할 때 <b>시작 날짜</b>와 <b>끝내야 하는 날</b>을 같이 입력하면, 여기에 연간 계획표로 자동으로 그려져요.</p>
        </div>`;
        return;
    }

    // 실제 날짜(일 단위) 기준으로 전체 범위 계산 → 달 단위가 아니라 날짜 비례로 막대를 그려서 겹침 방지
    let rangeStart=timed[0].startDate, rangeEnd=timed[0].deadline;
    timed.forEach(it=>{
        if(it.startDate<rangeStart) rangeStart=it.startDate;
        if(it.deadline>rangeEnd) rangeEnd=it.deadline;
    });
    const rangeStartDate=new Date(`${rangeStart}T00:00:00`);
    const rangeEndDate=new Date(`${rangeEnd}T00:00:00`);
    const totalDays=Math.round((rangeEndDate-rangeStartDate)/86400000)+1;
    const DAY_PX=4;
    const trackWidth=totalDays*DAY_PX;
    const LABEL_W=88;
    const MIN_BAR_W=48;
    const dayOffset=(dateStr)=>Math.round((new Date(`${dateStr}T00:00:00`)-rangeStartDate)/86400000);

    // 월별 헤더 세그먼트 (달마다 실제 일수만큼만 폭을 차지)
    const monthSegs=[];
    let cursor=new Date(rangeStartDate);
    while(cursor<=rangeEndDate){
        const y=cursor.getFullYear(), m=cursor.getMonth();
        const monthLastDay=new Date(y,m+1,0);
        const segEnd = monthLastDay<rangeEndDate ? monthLastDay : rangeEndDate;
        const days=Math.round((segEnd-cursor)/86400000)+1;
        monthSegs.push({y, m:m+1, widthPx:days*DAY_PX});
        cursor=new Date(y,m+1,1);
    }

    const todayDate=new Date(`${TODAY}T00:00:00`);
    const todayInRange = TODAY>=rangeStart && TODAY<=rangeEnd;
    const todayLeftPx = todayInRange ? dayOffset(TODAY)*DAY_PX : null;

    // 월이 바뀌는 지점의 누적 x좌표 (첫 번째 달의 시작 지점은 제외 — 라벨 열과 겹치므로)
    const monthBoundaryPx=[];
    { let acc=0; monthSegs.forEach((seg,i)=>{ if(i>0) monthBoundaryPx.push(acc); acc+=seg.widthPx; }); }

    const headerHtml=`<div class="flex items-end mb-1">
        <div style="width:${LABEL_W}px;flex-shrink:0;align-self:stretch;position:sticky;left:0;z-index:5;background:#fff;padding-left:16px;box-sizing:content-box;" class="flex items-end pr-2 pb-2 text-[11px] font-black text-slate-400">과목</div>
        <div class="flex" style="min-width:${trackWidth}px;">
            ${monthSegs.map((seg,i)=>{
                const isTodayMonth = todayInRange && seg.y===todayDate.getFullYear() && seg.m===todayDate.getMonth()+1;
                const bgStyle = isTodayMonth ? `background:var(--pc-solid);border-radius:10px;` : '';
                return `<div style="width:${seg.widthPx}px;flex-shrink:0;${bgStyle}" class="text-center py-2">
                    <div class="text-[10px] font-bold ${isTodayMonth?'text-white':'text-slate-300'}" style="${isTodayMonth?'opacity:.85':''}">${seg.y}</div>
                    <div class="text-[13px] font-black ${isTodayMonth?'text-white':'text-slate-500'}">${seg.m}월</div>
                </div>`;
            }).join('')}
        </div>
    </div>`;

    const bySubject={};
    timed.forEach(it=>{
        if(!bySubject[it.subject]) bySubject[it.subject]=[];
        bySubject[it.subject].push(it);
    });
    const subjectKeys=Object.keys(bySubject).sort((a,b)=>{
        const r=getProgressSubjectRank(a)-getProgressSubjectRank(b);
        return r!==0 ? r : a.localeCompare(b,'ko');
    });

    const ROW_H=25;

    // 겹치지 않는 기간의 항목들은 같은 줄에 배치 (안 겹치면 굳이 아래로 안 내림)
    // ※ 날짜만으로 비교하면, 기간이 짧아 최소폭(MIN_BAR_W)만큼 늘어나 그려지는 막대끼리는
    //   날짜상 안 겹쳐도 화면(px)에서는 겹쳐 보일 수 있어서, 실제 렌더링될 픽셀 범위 기준으로 비교
    function packIntoRows(items){
        const rowEnds=[]; // 각 줄에 마지막으로 배치된 항목의 오른쪽 끝 좌표(px)
        const GAP_PX=4; // 막대 사이 최소 여유 간격
        const packed=items.map(it=>{
            const left=dayOffset(it.startDate)*DAY_PX;
            const spanDays=Math.max(1, Math.round((new Date(`${it.deadline}T00:00:00`)-new Date(`${it.startDate}T00:00:00`))/86400000)+1);
            const width=Math.max(MIN_BAR_W, spanDays*DAY_PX)-2;
            const right=left+width;
            let row=-1;
            for(let r=0;r<rowEnds.length;r++){
                if(left>rowEnds[r]+GAP_PX){ row=r; break; }
            }
            if(row===-1){ row=rowEnds.length; rowEnds.push(right); }
            else{ rowEnds[row]=right; }
            return {...it, _row:row};
        });
        return {packed, rowCount:rowEnds.length};
    }

    const bodyHtml=subjectKeys.map(subName=>{
        const sortFn=(a,b)=> a.startDate!==b.startDate ? a.startDate.localeCompare(b.startDate) : 0;
        const lectureItems=bySubject[subName].filter(it=>it.unit==='강').sort(sortFn);
        const thinItems=bySubject[subName].filter(it=>it.unit!=='강').sort(sortFn);

        const {packed:packedLecture, rowCount:lectureRowCount}=packIntoRows(lectureItems);
        const {packed:packedThin, rowCount:thinRowCount}=packIntoRows(thinItems);
        // 형광펜(강) 줄들을 위에, 밑줄(p·회) 줄들을 그 아래로 이어붙임 (같은 줄에 섞이지 않게)
        const items=[
            ...packedLecture,
            ...packedThin.map(it=>({...it, _row: it._row+lectureRowCount}))
        ];
        const rowCount=lectureRowCount+thinRowCount;

        const bg=getSubjColor(subName);
        const txt=getSubjTextColor(subName);
        // 하이라이트(형광펜)/밑줄/이름 색은 더 투명하게 (전체 배경·라벨은 기존처럼 또렷하게 유지)
        const bgSoft=hexToRgba(bg,.55);
        const txtSoft=hexToRgba(txt,.72);
        const rowsHeight=rowCount*ROW_H;

        const barsHtml=items.map((it)=>{
            const left=dayOffset(it.startDate)*DAY_PX;
            const spanDays=Math.max(1, Math.round((new Date(`${it.deadline}T00:00:00`)-new Date(`${it.startDate}T00:00:00`))/86400000)+1);
            const width=Math.max(MIN_BAR_W, spanDays*DAY_PX)-2; // 옆 항목과 살짝 띄워서 구분
            const top=it._row*ROW_H;
            const isLecture=it.unit==='강';
            const dowLabel=(ganttShowWeekday && studyDaysLabel(it)) || '';
            const FONT_PX=9;
            const DOW_FONT_PX=7;
            // 요일 표기(dowLabel)는 항상 작게+연하게 보이도록, 그 폭을 먼저 확보해두고
            // 나머지 공간에서만 이름(baseLabel)을 자름 — 이러면 좁은 막대에서도 요일 스타일이 유지됨
            const dowReserve = dowLabel ? estTextWidth(dowLabel, DOW_FONT_PX)+5 : 0;
            const renderLabelWithDow=(truncatedBase)=> dowLabel
                ? `${truncatedBase} <span style="font-size:${DOW_FONT_PX}px;opacity:.6;">${dowLabel}</span>`
                : truncatedBase;
            if(isLecture){
                const ICON_W=18; // 📺 아이콘 + 좌우 padding 대략치
                const baseLabel=`${it.name}(${it.total})`;
                const truncatedBase=truncateForWidth(baseLabel, width-ICON_W-dowReserve, FONT_PX);
                // html2canvas(특히 iOS Safari)는 position:absolute 박스 안의 flex나 line-height 기반
                // 세로중앙정렬을 텍스트가 아래로 밀리게 잘못 그리는 경우가 있어서, 더 오래되었지만
                // html2canvas 호환성이 가장 좋다고 알려진 display:table / table-cell + vertical-align:middle 방식으로 교체
                return `<div class="absolute rounded-md text-[9px] font-black" style="left:${left}px;top:${top}px;width:${width}px;height:16px;background:${bgSoft};color:${txtSoft};overflow:hidden;white-space:nowrap;display:table;">
                    <span style="display:table-cell;vertical-align:middle;padding-left:4px;">📺 ${renderLabelWithDow(truncatedBase)}</span>
                </div>`;
            }else{
                const baseLabel=`${it.name}(${it.total}${it.unit})`;
                const truncatedBase=truncateForWidth(baseLabel, width-4-dowReserve, FONT_PX);
                return `<div class="absolute" style="left:${left}px;top:${top}px;width:${width}px;height:${ROW_H}px;overflow:hidden;">
                        <div class="text-[9px] font-bold" style="color:${txtSoft};line-height:1;padding-top:1px;white-space:nowrap;">${renderLabelWithDow(truncatedBase)}</div>
                        <div style="height:3px;border-radius:2px;background:${bgSoft};margin-top:2px;"></div>
                   </div>`;
            }
        }).join('');

        return `<div class="flex border-t border-slate-50">
            <div class="shrink-0 flex" style="width:${LABEL_W}px;position:sticky;left:0;z-index:5;background:#fff;padding-left:16px;box-sizing:content-box;">
                <div class="flex-1 flex items-center justify-center text-center px-1 text-[12px] font-black rounded-lg my-0.5" style="background:${bg};color:${txt};line-height:1;">${subName}</div>
            </div>
            <div class="relative" style="width:${trackWidth}px;height:${rowsHeight}px;">
                ${barsHtml}
            </div>
        </div>`;
    }).join('');

    el.innerHTML = `<div class="card pt-4 pb-4 pr-4 overflow-x-auto" id="calendar-gantt-capture">
        <div class="flex items-center justify-between mb-1 gap-2 flex-wrap pl-4">
            <h3 class="text-[19px] font-black" style="color:var(--pc)">연간 진도 계획표</h3>
            <div class="flex gap-2 flex-wrap">
                <button onclick="toggleGanttWeekday(event)" class="month-toggle-btn" style="min-width:auto;">${ganttShowWeekday?'요일 숨기기':'요일 보기'}</button>
            </div>
        </div>
        <p class="text-[12px] text-slate-400 mb-4 pl-4">진도 탭에 등록한 항목의 시작~마감 기간이 자동으로 표시돼요. 굵은 형광펜 막대(📺)는 강의(강), 얇은 줄은 페이지·회차(p·회) 항목이에요.</p>
        <div style="min-width:${LABEL_W+trackWidth}px;position:relative;">
            ${monthBoundaryPx.map(px=>`<div class="absolute top-0 bottom-0" style="left:${LABEL_W+16+px}px;width:1px;background:rgba(203,213,225,.5);"></div>`).join('')}
            ${headerHtml}
            ${bodyHtml}
        </div>
    </div>`;
}

function ls(k)    { try{return localStorage.getItem(k);}catch{return null;} }
function lsGet(k) { try{const v=ls(k);return v?JSON.parse(v):null;}catch{return null;} }

// ★ 예전 자동 배치 버그로 남아있던 태스크 정리:
//   숨긴 항목이거나, 아직 시작일이 안 된 항목이거나, 마감일이 지난 항목인데도
//   과거에 깔아둔 "오늘 이후" 태스크가 scheduleData에 그대로 남아있던 문제를 한 번에 청소한다.
//   자동배치 기록(young_auto_schedule)에 잡혀있는지 여부와 상관없이, 오늘~미래 날짜의 태스크를
//   전부 훑어서 그 태스크가 어느 진도 항목의 것인지 찾아 유효하지 않으면 지운다.
//   (지난 날짜=이미 지나간 학습 기록은 절대 건드리지 않음)
function cleanupStaleAutoPlacedTasks(){
    if(!progressItems || !progressItems.length) return;
    try{
        let changed=false;
        scheduleData.forEach(day=>{
            if(day.date<TODAY || !day.tasks?.length) return;
            const before=day.tasks.length;
            day.tasks=day.tasks.filter(t=>{
                const sub=getTaskSubject(t);
                const txt=t.replace(/^\[.*?\]\s*/,'');
                const item=findMatchingProgressItem(sub, txt);
                if(!item) return true; // 등록된 진도 항목과 매칭 안 되는 자유 입력 태스크는 그대로 둠
                if(item.hidden) return false;
                if(item.startDate && day.date<item.startDate) return false;
                if(item.deadline && day.date>item.deadline) return false;
                return true;
            });
            if(day.tasks.length!==before) changed=true;
        });
        if(changed) localStorage.setItem('young_study_v4', JSON.stringify(scheduleData));

        // 자동배치 기록도 같은 기준으로 정리해서, 다음 자동배치 때 다시 잘못 채워지지 않게 한다
        const store=getAutoScheduleStore();
        let storeChanged=false;
        progressItems.forEach(item=>{
            const rec=store[item.id];
            if(!rec || !rec.dates || !rec.dates.length) return;
            const invalid = dateStr =>
                dateStr>=TODAY && (
                    item.hidden ||
                    (item.startDate && dateStr<item.startDate) ||
                    (item.deadline && dateStr>item.deadline)
                );
            const filtered=rec.dates.filter(d=>!invalid(d));
            if(filtered.length!==rec.dates.length){ rec.dates=filtered; storeChanged=true; }
        });
        if(storeChanged) saveAutoScheduleStore(store);
    }catch{}
}

function cleanupDemoFlowData(){
    const demoDate = '2026-04-02';
    try{
        localStorage.removeItem(`yst4_${demoDate}`);
        localStorage.removeItem(`yst4_log_${demoDate}`);
        timerDates = timerDates.filter(d=>d!==demoDate);
        localStorage.setItem('yst4_dates', JSON.stringify(timerDates));
        scheduleData = scheduleData.filter(d=>d.date!==demoDate);
        localStorage.setItem('young_study_v4', JSON.stringify(scheduleData));
    }catch{}
}

function cleanupMarchPlannerData(){
    const marchPrefix='2026-03-';
    try{
        scheduleData=scheduleData.filter(d=>!(d.date||'').startsWith(marchPrefix));
        completedTasks=Object.fromEntries(
            Object.entries(completedTasks).filter(([key])=>!key.startsWith(marchPrefix))
        );
        studyTimes=Object.fromEntries(
            Object.entries(studyTimes).filter(([key])=>!key.startsWith(marchPrefix))
        );
        pageActuals=Object.fromEntries(
            Object.entries(pageActuals).filter(([key])=>!key.startsWith(marchPrefix))
        );
        timerDates=timerDates.filter(d=>!d.startsWith(marchPrefix));

        localStorage.setItem('young_study_v4', JSON.stringify(scheduleData));
        localStorage.setItem('young_completed', JSON.stringify(completedTasks));
        localStorage.setItem('young_study_times', JSON.stringify(studyTimes));
        localStorage.setItem('young_page_actuals', JSON.stringify(pageActuals));
        localStorage.setItem('yst4_dates', JSON.stringify(timerDates));

        const keysToDelete=[];
        for(let i=0;i<localStorage.length;i++){
            const key=localStorage.key(i);
            if(key?.startsWith(`yst4_${marchPrefix}`) || key?.startsWith(`yst4_log_${marchPrefix}`)){
                keysToDelete.push(key);
            }
        }
        keysToDelete.forEach(key=>localStorage.removeItem(key));
    }catch{}
}

/* ═══════════════════════════════════════════════
   TOAST
═══════════════════════════════════════════════ */
let _toastT = null;
function showToast(msg){
    const el=document.getElementById('toast');
    el.textContent=msg; el.classList.add('show');
    clearTimeout(_toastT); _toastT=setTimeout(()=>el.classList.remove('show'),2200);
}

/* ═══════════════════════════════════════════════
   이미지로 저장 (html2canvas)
   버튼이 눌린 카드/컨테이너 자체를 캡처해 PNG로 다운로드.
   캡처 중에는 저장 버튼 자체를 잠깐 숨겨서 버튼이 이미지에 안 찍히게 함.
═══════════════════════════════════════════════ */
async function saveElementAsImage(elementId, filenamePrefix, btnEl){
    const el=document.getElementById(elementId);
    if(!el){ showToast('저장할 화면을 찾을 수 없어요'); return; }
    if(typeof html2canvas==='undefined'){ showToast('이미지 저장 기능을 불러오지 못했어요'); return; }

    const hideEls=el.querySelectorAll('.save-img-btn');
    hideEls.forEach(b=>b.style.visibility='hidden');
    if(btnEl){ btnEl.disabled=true; var _origTxt=btnEl.textContent; btnEl.textContent='저장 중...'; }

    // 요소 자체가 가로 스크롤(overflow-x-auto)이면, html2canvas에 width만 넘겨줘도
    // 내부적으로 여전히 스크롤 영역만큼만 잘라서 찍는 경우가 있어서
    // 캡처 직전에 잠깐 overflow를 풀고 실제 전체 너비로 넓혀둔 다음 캡처하고 원래대로 되돌림
    const prevOverflow=el.style.overflow;
    const prevWidth=el.style.width;
    const fullWidth=el.scrollWidth;
    const fullHeight=el.scrollHeight;
    el.style.overflow='visible';
    el.style.width=fullWidth+'px';

    // 웹폰트(Pretendard)가 완전히 로드되기 전에 캡처하면 대체 폰트 기준으로 줄 높이가
    // 계산되어 텍스트가 형광펜/밑줄과 어긋나 보일 수 있어서, 캡처 직전에 폰트 로딩을 기다림
    try{ if(document.fonts && document.fonts.ready){ await document.fonts.ready; } }catch(e){}

    let nudgeStyleEl=null;

    try{
        const canvas=await html2canvas(el, {
            backgroundColor:'#ffffff',
            scale:2,
            useCORS:true,
            scrollX:0,
            scrollY:0,
            windowWidth:fullWidth,
            windowHeight:fullHeight,
            width:fullWidth,
            height:fullHeight
        });
        const dataUrl=canvas.toDataURL('image/png');
        const fileName=`${filenamePrefix}_${TODAY}.png`;

        // 1) 아이폰/아이패드는 공유 시트로 바로 "이미지 저장"을 띄우는 게 가장 확실함 (팝업 차단과 무관)
        let handled=false;
        try{
            const blob=await (await fetch(dataUrl)).blob();
            const file=new File([blob], fileName, {type:'image/png'});
            if(navigator.canShare && navigator.canShare({files:[file]})){
                await navigator.share({files:[file], title:fileName});
                handled=true;
                showToast('📸 공유 시트에서 "이미지 저장"을 눌러주세요');
            }
        }catch(shareErr){
            // 사용자가 공유창에서 취소한 경우(AbortError)는 실패가 아니라 정상 취소로 처리
            if(shareErr && shareErr.name==='AbortError'){ handled=true; }
        }

        // 2) 공유 API가 없거나 실패하면, 새 창 없이 현재 화면 위에 이미지를 바로 띄워서
        //    길게 눌러 저장하게 함 — 팝업이 아니라 페이지 안 요소라 팝업 차단의 영향을 받지 않음
        if(!handled){
            const overlay=document.createElement('div');
            overlay.style.cssText='position:fixed;inset:0;background:rgba(15,23,42,.94);z-index:99999;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:24px;gap:14px;';
            overlay.innerHTML=`
                <div style="color:#fff;font-weight:900;font-size:14px;text-align:center;line-height:1.5;">이미지를 길게 눌러<br>"사진에 저장"을 눌러주세요</div>
                <img src="${dataUrl}" style="max-width:100%;max-height:70vh;border-radius:14px;box-shadow:0 12px 32px rgba(0,0,0,.5);" />
                <button type="button" style="margin-top:6px;background:#fff;color:#0f172a;border:none;border-radius:14px;padding:11px 26px;font-weight:900;font-size:14px;">닫기</button>
            `;
            overlay.querySelector('button').addEventListener('click',()=>overlay.remove());
            document.body.appendChild(overlay);
        }
    }catch(err){
        console.error(err);
        showToast('이미지 저장에 실패했어요');
    }finally{
        el.style.overflow=prevOverflow;
        el.style.width=prevWidth;
        if(nudgeStyleEl) nudgeStyleEl.remove();
        hideEls.forEach(b=>b.style.visibility='');
        if(btnEl){ btnEl.disabled=false; btnEl.textContent=_origTxt; }
    }
}

/* ═══════════════════════════════════════════════
   D-DAY BANNER (compact)
═══════════════════════════════════════════════ */
function renderDDay(){
    const today=new Date(`${TODAY}T00:00:00`);
    const banner=document.getElementById('dday-banner');
    const manager=document.getElementById('dday-manager');
    // 8. 배경색 테마 연동
    const rgb=THEMES[currentTheme]?.solidRgb||'138,152,174';
    banner.style.background=`linear-gradient(135deg, rgba(${rgb},0.95) 0%, rgba(${rgb},0.70) 100%)`;
    banner.style.borderBottomColor=`rgba(${rgb},1)`;
    const upcomingExams=examDates
        .map(ex=>{
            const examDate=new Date(`${ex.date}T00:00:00`);
            const diff=Math.round((examDate-today)/86400000);
            return { ...ex, diff };
        })
        .filter(ex=>ex.diff>=0);
    const ddayItems=upcomingExams.length
        ? upcomingExams.map(ex=>{
        const diff=ex.diff;
        const cls=diff===0?'text-yellow-300':diff>0&&diff<=30?'text-red-300':'text-white';
        const txt=diff===0?'D-Day':'D-'+diff;
        return `<div class="flex items-center gap-3">
            <span class="text-2xl text-white font-bold uppercase tracking-wider">${ex.name}</span>
            <span class="text-3xl font-black ${cls} tracking-tight">${txt}</span>
        </div>`;
    }).join('<div class="w-px h-8 bg-white/20 hidden sm:block"></div>')
        : `<div class="text-lg font-bold text-white/85">표시할 D-Day가 없어요</div>`;
    banner.innerHTML=`<div class="w-full flex items-center justify-between gap-4">
        <div class="flex flex-wrap items-center justify-center gap-6 flex-1">${ddayItems}</div>
        <button onclick="toggleDdayManager()" class="dday-manager-toggle shrink-0">D-Day 관리</button>
    </div>`;
    renderDdayManager();
    if(manager && manager.dataset.open==='true') manager.classList.remove('hidden');
}

function renderDdayManager(){
    const manager=document.getElementById('dday-manager');
    if(!manager) return;
    const rows=examDates
        .slice()
        .sort((a,b)=>a.date.localeCompare(b.date))
        .map((ex,idx)=>`<div class="flex items-center gap-3 py-3 border-b border-slate-100 last:border-b-0">
            <div class="flex-1 min-w-0">
                <div class="text-[19px] font-semibold text-slate-700 truncate">${ex.name}</div>
                <div class="text-[17px] text-slate-500 font-bold mt-1">${ex.date}</div>
            </div>
            <button onclick="deleteExamDate(${idx})" class="px-3 py-2 rounded-xl border border-slate-200 text-[16px] font-semibold text-slate-400 hover:text-red-400 hover:bg-slate-50 transition-colors">삭제</button>
        </div>`).join('');
    manager.innerHTML=`<div class="dday-manager-card p-5">
        <div class="flex items-center justify-between gap-4 mb-4">
            <div>
                <h3 class="text-[26px] font-black text-pc">D-Day 관리</h3>
                <p class="text-[17px] text-slate-400 mt-1">헤더에 보여줄 시험명을 직접 추가하고 삭제할 수 있어요.</p>
            </div>
            <button onclick="resetExamDates()" class="text-[16px] font-semibold text-slate-400 hover:text-pc transition-colors">기본값 복원</button>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-[1.4fr_1fr_auto] gap-3">
            <input id="dday-name-input" type="text" placeholder="예: 서울시 면접"
                class="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-[17px] font-medium outline-none focus:border-pc">
            <input id="dday-date-input" type="date"
                class="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-[17px] font-medium outline-none focus:border-pc">
            <button onclick="addExamDate()" class="bg-pc text-white px-5 rounded-xl text-[17px] font-black hover:opacity-85 transition-all">추가</button>
        </div>
        <div class="mt-5">${rows || '<div class="text-center text-slate-300 py-6 text-[17px] font-semibold">등록된 D-Day가 없습니다</div>'}</div>
    </div>`;
}

function toggleDdayManager(){
    const manager=document.getElementById('dday-manager');
    if(!manager) return;
    const willOpen=manager.classList.contains('hidden');
    manager.classList.toggle('hidden', !willOpen);
    manager.dataset.open=willOpen?'true':'false';
}

function saveExamDates(){
    localStorage.setItem('young_exam_dates', JSON.stringify(examDates));
}

function addExamDate(){
    const nameEl=document.getElementById('dday-name-input');
    const dateEl=document.getElementById('dday-date-input');
    const name=(nameEl?.value || '').trim();
    const date=(dateEl?.value || '').trim();
    if(!name || !date){ showToast('시험명과 날짜를 입력해 주세요'); return; }
    examDates=[...examDates,{name,date}].sort((a,b)=>a.date.localeCompare(b.date));
    saveExamDates();
    if(nameEl) nameEl.value='';
    if(dateEl) dateEl.value='';
    renderDDay();
    const manager=document.getElementById('dday-manager');
    if(manager){ manager.classList.remove('hidden'); manager.dataset.open='true'; }
    showToast('✓ D-Day 추가');
}

function deleteExamDate(idx){
    examDates=examDates
        .slice()
        .sort((a,b)=>a.date.localeCompare(b.date))
        .filter((_,i)=>i!==idx);
    saveExamDates();
    renderDDay();
    const manager=document.getElementById('dday-manager');
    if(manager){ manager.classList.remove('hidden'); manager.dataset.open='true'; }
    showToast('삭제했어요');
}

function resetExamDates(){
    examDates=[...DEFAULT_EXAM_DATES];
    saveExamDates();
    renderDDay();
    const manager=document.getElementById('dday-manager');
    if(manager){ manager.classList.remove('hidden'); manager.dataset.open='true'; }
    showToast('기본 D-Day로 복원했어요');
}

/* ═══════════════════════════════════════════════
   PLANNER — PROGRESS
═══════════════════════════════════════════════ */
function calculateProgress(){
    const grid=document.getElementById('subject-progress-grid');
    const stats={};let filtered=[];

    if(currentView==='month'){
        const ym=`${viewDate.getFullYear()}-${String(viewDate.getMonth()+1).padStart(2,'0')}`;
        filtered=scheduleData.filter(d=>d.date.startsWith(ym));
        document.getElementById('progress-title').innerText='';
    }else if(currentView==='week'){
        const s=weekStart(weekRefDate),e=new Date(s);e.setDate(s.getDate()+7);
        filtered=scheduleData.filter(d=>{const o=new Date(d.date);return o>=s&&o<e;});
        document.getElementById('progress-title').innerText='주간 달성도';
    }else{
        filtered=scheduleData.filter(d=>d.date===selectedDate);
        document.getElementById('progress-title').innerText='일간 달성도';
    }

    filtered.forEach(day=>{
        day.tasks.forEach((task,idx)=>{
            const cat=task.match(/\[(.*?)\]/)?.[1]||'기타';
            if(!stats[cat])stats[cat]={count:0, sum:0, pgCount:0};
            stats[cat].count++;
            const c=getTaskCompletion(day.date, idx, task);
            stats[cat].sum+=c;
            if(parseTaskPages(task)) stats[cat].pgCount++;
        });
    });

    // 전체 달성도 (각 태스크 달성비율 평균)
    const totalCount=Object.values(stats).reduce((a,b)=>a+b.count,0);
    const totalSum=Object.values(stats).reduce((a,b)=>a+b.sum,0);
    const pct=totalCount>0?Math.round(totalSum/totalCount*100):0;
    document.getElementById('total-percent').innerText=`${pct}%`;
    document.getElementById('task-count-label').innerText='';

    grid.innerHTML=Object.entries(stats).length
        ?Object.entries(stats)
            .sort((a,b)=>{
                const rankDiff = getProgressSubjectRank(a[0]) - getProgressSubjectRank(b[0]);
                if(rankDiff !== 0) return rankDiff;
                return a[0].localeCompare(b[0], 'ko');
            })
            .map(([n,s])=>{
                const p=Math.round(s.sum/s.count*100);
                return `<div class="subject-progress-card">
                    <div class="subject-progress-top">
                        <span class="subject-progress-name">${n}</span>
                        <span class="subject-progress-pct">${p}%</span>
                    </div>
                    <div class="prog-bg"><div class="prog-fill" style="width:${p}%"></div></div>
                </div>`;
            }).join('')
        :`<p class="col-span-full text-slate-300 text-center text-xs py-2">등록된 일정이 없습니다</p>`;
}

/* ═══════════════════════════════════════════════
   PLANNER — REVIEW COUNTER
═══════════════════════════════════════════════ */
function normalizeReviewSubject(name){
    const n=String(name||'');
    if(n.includes('전체모의') || n.includes('모의고사')) return '모의고사';
    if(n.includes('행정법')) return '행정법';
    if(n.includes('각론')) return '각론';
    if(n.includes('행정학')) return '행정학';
    if(n.includes('한국사')) return '한국사';
    if(n.includes('국어')) return '국어';
    if(n.includes('모의')) return '모의고사';
    if(n.includes('영어')) return '영어';
    if(n.includes('경제')) return '경제';
    if(n.includes('헌법')) return '헌법';
    return n;
}

function getReviewSubjectsForCurrentView(){
    let dates=[];
    if(currentView==='day'){
        dates=[selectedDate || TODAY];
    }else if(currentView==='week'){
        const start=weekStart(weekRefDate);
        dates=Array.from({length:7},(_,i)=>{
            const d=new Date(start);
            d.setDate(start.getDate()+i);
            return toKey(d);
        });
    }else{
        dates=getDatesInMonth(viewDate.getFullYear(), viewDate.getMonth());
    }

    const taskSubjects=[...new Set(
        dates.flatMap(ds=>{
            const day=scheduleData.find(d=>d.date===ds);
            return (day?.tasks || [])
                .map(task=>getTaskSubject(task))
                .filter(Boolean);
        })
    )];
    if(taskSubjects.length) return taskSubjects;

    return [];
}

function renderReviewCounter(){
    const subjects=getReviewSubjectsForCurrentView();
    const grid=document.getElementById('review-counter');
    if(!grid) return;
    if(!subjects.length){
        grid.style.gridTemplateColumns='1fr';
        grid.innerHTML=`<div class="text-center text-slate-300 py-5 text-base font-semibold">현재 범위에 등록된 과목이 없어요</div>`;
        return;
    }
    subjects.forEach(subject=>{
        if(reviewCounts[subject]===undefined) reviewCounts[subject]=0;
    });
    grid.style.gridTemplateColumns=`repeat(${subjects.length}, minmax(0, 1fr))`;
    grid.innerHTML=
        subjects.map(s=>`
            <div class="review-chip">
                <div class="review-chip-title">${s}</div>
                <div class="review-chip-controls">
                    <button onclick="updateReview('${s}',-1)" class="review-chip-btn hover:bg-slate-50 transition-colors flex items-center justify-center">-</button>
                    <span class="review-chip-count">${reviewCounts[s] ?? 0}</span>
                    <button onclick="updateReview('${s}',1)"  class="review-chip-btn hover:bg-slate-50 transition-colors flex items-center justify-center">+</button>
                </div>
            </div>`).join('');
}

/* ═══════════════════════════════════════════════
   PLANNER — STUDY TIME DISPLAY
═══════════════════════════════════════════════ */
function renderStudyTimeDisplay(){
    // 월간 합산
    const monthDates = getDatesInMonth(viewDate.getFullYear(), viewDate.getMonth());
    let monthTotalSec = 0;
    for(const ds of monthDates){ monthTotalSec += getTotalTrackerSecs(ds); }
    const el=document.getElementById('today-study-display');
    if(el) el.textContent = fmtHHMMSS(monthTotalSec);

    // week total
    const ws=weekStart(new Date());
    let wTotalSec=0;
    for(let i=0;i<7;i++){const d=new Date(ws);d.setDate(ws.getDate()+i);wTotalSec+=getTotalTrackerSecs(toKey(d));}
    const wEl=document.getElementById('week-total-display');
    if(wEl) wEl.textContent=fmtHHMMSS(wTotalSec);
}

function getTotalTrackerSecs(dateStr){
    const data=lsGet(`yst4_${dateStr}`);
    if(!data||!Array.isArray(data)) return 0;
    return data.reduce((a,s)=>a+(s.spent||0),0);
}

function ensureRecoveredTodayStudy(){
    if(TODAY!=='2026-04-05') return;
    const recoverySec=4380; // 01:13:00
    const recoveryStart=19*3600;
    const recoveryEnd=(20*3600)+(13*60);
    const recoverySubject=getDayTaskSubjects(TODAY)[0] || '모의고사';

    let payload=lsGet(`yst4_${TODAY}`);
    if(!Array.isArray(payload) || !payload.length){
        payload=[{n:recoverySubject,m:60,r:'',pg:false,done:false,act:'',spent:recoverySec,rem:0,on:false,free:true}];
    }else{
        let updated=false;
        payload=payload.map((entry,idx)=>{
            if(updated) return entry;
            if(entry.n===recoverySubject || idx===0){
                updated=true;
                return {
                    ...entry,
                    spent:Math.max(entry.spent||0,recoverySec),
                    rem:Math.max(0, entry.rem ?? 0),
                    on:false
                };
            }
            return entry;
        });
        if(!updated){
            payload.push({n:recoverySubject,m:60,r:'',pg:false,done:false,act:'',spent:recoverySec,rem:0,on:false,free:true});
        }
    }
    localStorage.setItem(`yst4_${TODAY}`, JSON.stringify(payload));

    const existingLogs=lsGet(`yst4_log_${TODAY}`) || [];
    const hasRecoveryLog=existingLogs.some(log=>log.startSec===recoveryStart && log.endSec===recoveryEnd);
    if(!hasRecoveryLog){
        const nextLogs=[...existingLogs,{n:recoverySubject,startSec:recoveryStart,endSec:recoveryEnd}]
            .sort((a,b)=>a.startSec-b.startSec);
        localStorage.setItem(`yst4_log_${TODAY}`, JSON.stringify(nextLogs));
    }

    if(!timerDates.includes(TODAY)){
        timerDates=[...timerDates,TODAY].sort();
        localStorage.setItem('yst4_dates', JSON.stringify(timerDates));
    }

    studyTimes[TODAY]=Math.max(studyTimes[TODAY]||0, Math.round(recoverySec/360)/10);
    localStorage.setItem('young_study_times', JSON.stringify(studyTimes));
}

/* ═══════════════════════════════════════════════
   PLANNER — MONTH VIEW
═══════════════════════════════════════════════ */
function getDayAchievement(key){
    const day=scheduleData.find(d=>d.date===key);
    if(!day||day.tasks.length===0) return null;
    const sum=day.tasks.reduce((acc,task,idx)=>acc+getTaskCompletion(key,idx,task),0);
    return sum/day.tasks.length; // 0 to 1, 페이지 달성도 반영
}

function toggleMonthTaskVisibility(evt){
    if(evt) evt.stopPropagation();
    monthShowAllTasks=!monthShowAllTasks;
    localStorage.setItem('young_month_show_all_tasks', JSON.stringify(monthShowAllTasks));
    render();
}

function toggleGanttWeekday(evt){
    if(evt) evt.stopPropagation();
    ganttShowWeekday=!ganttShowWeekday;
    localStorage.setItem('young_gantt_show_weekday', JSON.stringify(ganttShowWeekday));
    renderProgressCalendar();
}

function getSubjectCompletionState(dateKey, subjectName, fallbackDone=false){
    const match=timerSubjMatch(subjectName) || subjectName;
    const day=scheduleData.find(d=>d.date===dateKey);
    const taskIndices=day?.tasks
        ?.map((task,idx)=>(getTaskSubject(task)===match ? idx : -1))
        .filter(idx=>idx>=0) || [];
    if(!taskIndices.length) return fallbackDone;
    return taskIndices.every(idx=>getTaskCompletion(dateKey, idx, day.tasks[idx])>=1);
}

/* ═══════════════════════════════════════════════
   TIMER — LOAD / INIT
═══════════════════════════════════════════════ */
function loadTimerDay(ds){
    timerDate=ds;
    document.getElementById('timer-date-input').value=ds;
    stopAllTimers();
    loadTimerLogs(ds);

    const sc=getSched(ds);
    const saved=lsGet(`yst4_${ds}`);
    const dayTaskSubjects=getDayTaskSubjects(ds);

    if(sc?.type==='sun' && !dayTaskSubjects.length){
        timerSubjects=[];
        timerReady=true;
        renderTimer();
        return;
    }

    const iniS=(s)=>({...s,done:false,act:'',spent:0,rem:s.m*60,on:false});
    if(sc?.subs){
        const baseSubjects=sc.subs.map(s=>{
            const v=saved?.find(x=>x.n===s.n);
            if(v){
                return {
                    ...s,
                    done:getSubjectCompletionState(ds, s.n, v.done||false),
                    act:v.act||'',
                    spent:v.spent||0,
                    rem:v.rem??s.m*60,
                    on:false
                };
            }
            return {
                ...iniS(s),
                done:getSubjectCompletionState(ds, s.n, false)
            };
        });
        const freeSaved=(saved?.filter(x=>x.free)||[]).map(x=>({n:x.n,m:x.m,r:'',pg:false,done:x.done||false,act:x.act||'',spent:x.spent||0,rem:x.rem??x.m*60,on:false,free:true}));
        const knownNames=new Set([...baseSubjects, ...freeSaved].map(s=>s.n));
        const taskExtras=dayTaskSubjects
            .filter(name=>!knownNames.has(name))
            .map(name=>{
                const v=saved?.find(x=>x.n===name);
                return {
                    n:name,
                    m:v?.m||60,
                    r:v?.r||'',
                    pg:v?.pg||false,
                    done:getSubjectCompletionState(ds, name, v?.done||false),
                    act:v?.act||'',
                    spent:v?.spent||0,
                    rem:v?.rem??((v?.m||60)*60),
                    on:false,
                    free:true
                };
            });
        timerSubjects=[...baseSubjects, ...freeSaved, ...taskExtras];
    }else if(saved?.length){
        const savedSubjects=saved.map(x=>({n:x.n,m:x.m,r:x.r||'',pg:x.pg||false,done:x.done||false,act:x.act||'',spent:x.spent||0,rem:x.rem??x.m*60,on:false,free:true}));
        const knownNames=new Set(savedSubjects.map(s=>s.n));
        const taskExtras=dayTaskSubjects
            .filter(name=>!knownNames.has(name))
            .map(name=>({n:name,m:60,r:'',pg:false,done:getSubjectCompletionState(ds, name, false),act:'',spent:0,rem:3600,on:false,free:true}));
        timerSubjects=[...savedSubjects, ...taskExtras];
    }else{
    const dayTasks=scheduleData.find(d=>d.date===ds);
    if(dayTasks?.tasks?.length){
        const subjMap={};
        dayTasks.tasks.forEach(t=>{
            const subj=getTaskSubject(t)||'기타';
            if(!subjMap[subj]) subjMap[subj]={n:subj,m:60,r:'',pg:false,done:false,act:'',spent:0,rem:3600,on:false,free:true};
        });
        timerSubjects=Object.values(subjMap);
    }else{
        timerSubjects=[];
    }
}
timerReady=true;
renderTimer();
renderTimeline();
}

function stopAllTimers(){
    if(timerInterval){clearInterval(timerInterval);timerInterval=null;}
    timerSubjects=timerSubjects.map(s=>({...s,on:false}));
}

/* ═══════════════════════════════════════════════
   TIMER — TICK
═══════════════════════════════════════════════ */
function startTimerTick(){
    if(timerInterval) return;
    let tickCount=0;
    timerInterval=setInterval(()=>{
        let changed=false;
        timerSubjects=timerSubjects.map(s=>{
            if(!s.on) return s;
            changed=true;
            const newRem=Math.max(0,s.rem-1);
            if (s.rem === 1) playBeep();
            return {...s,rem:newRem,spent:s.spent+1,on:true};
        });
        if(!timerSubjects.some(s=>s.on)){clearInterval(timerInterval);timerInterval=null;}
        if(changed){
            renderTimer();
            tickCount++;
            updateLiveDayTimerDisplay();
            renderTimeline();
            scheduleTimerSave();
        }
    },1000);
}

function scheduleTimerSave(){
    clearTimeout(timerSaveT);
    timerSaveT=setTimeout(()=>saveTimer(),1200);
}

/* ═══════════════════════════════════════════════
   TIMER — SAVE (syncs to study_times)
═══════════════════════════════════════════════ */
function saveTimer(force){
    if(!timerReady||!timerSubjects.length) return;
    const hasAct=timerSubjects.some(s=>s.done||s.spent>0);
    if(!hasAct && !force) return;

    const payload=timerSubjects.map(({n,m,r,pg,done,act,spent,rem,free})=>({n,m,r,pg,done,act,spent,rem,free}));
    localStorage.setItem(`yst4_${timerDate}`,JSON.stringify(payload));

    if(!timerDates.includes(timerDate)){
        timerDates=[...timerDates,timerDate].sort();
        localStorage.setItem('yst4_dates',JSON.stringify(timerDates));
    }

    // ← KEY INTEGRATION: sync total hours to planner study_times
    const totalSec=timerSubjects.reduce((a,s)=>a+(s.spent||0),0);
    const totalH=Math.round(totalSec/360)/10; // 1 decimal
    studyTimes[timerDate]=totalH;
    localStorage.setItem('young_study_times',JSON.stringify(studyTimes));
}

/* ═══════════════════════════════════════════════
   TIMER — RENDER
═══════════════════════════════════════════════ */
function renderTimer(){
    const sc=getSched(timerDate);
    const container=[...document.querySelectorAll('#timer-subjects')].at(-1);
    const totalSec=timerSubjects.reduce((a,s)=>a+(s.spent||0),0);
    const targetSec=sc?.tot?sc.tot*60:timerSubjects.reduce((a,s)=>a+s.m*60,0);
    const pct=targetSec>0?Math.min(100,Math.round(totalSec/targetSec*100)):0;

    [...document.querySelectorAll('#timer-total-display')].forEach(el=>el.textContent=fmtSec(totalSec));
    [...document.querySelectorAll('#timer-prog-fill')].forEach(el=>el.style.width=pct+'%');

    if(!container) return;

    if(!timerSubjects.length){
        container.innerHTML=`<div class="card p-10 text-center">
            ${sc?.type==='sun'
                ?'<div class="text-4xl mb-3">☀️</div><p class="font-bold text-slate-400">일요일은 충전의 시간!</p>'
                :`<div class="text-3xl mb-3">📅</div><p class="text-slate-400 font-bold text-sm">이 날짜에는 스케줄이 없습니다</p>
                 <p class="text-xs text-slate-300 mt-1">아래에서 과목을 직접 추가하세요</p>`}
        </div>`;
        return;
    }

    container.innerHTML=timerSubjects.map((s,i)=>{
        const tgt=s.r?.match(/~(\d+)\s*(p|회|강)/);const tg=tgt?+tgt[1]:null;const tgUnit=tgt?tgt[2]:'p';
        const ac=s.act?+s.act:null;const df=(tg&&ac)?ac-tg:null;
        const spentSec=s.spent||0;
        const progressPct=s.m>0?Math.min(100,Math.round(spentSec/(s.m*60)*100)):0;
        const subjColor=getSubjColor(s.n);
        const subjTextColor=getSubjTextColor(s.n);
        const subjSoftBg=hexToRgba(subjColor,.16);
        const subjSoftBorder=hexToRgba(subjTextColor,.35);
        const displayName=getSubjectDisplayName(s.n, true);

        return `<div class="timer-card${s.on?' is-on':''}${s.done?' is-done':''}" style="border-color:${s.on?subjTextColor:subjSoftBorder};background:${s.on?hexToRgba(subjColor,.16):'#ffffff'}">
            <div class="flex items-center gap-2 mb-2">
                <div class="flex-1 min-w-0">
                    <span class="text-xs font-black ${s.done?'line-through':''}" style="color:${s.done?'var(--pc)':subjTextColor}">${displayName}</span>
                    ${s.r?`<span class="text-xs text-slate-400 ml-2">${s.r}</span>`:''}
                </div>
                ${s.pg?`<div class="flex items-center gap-1.5 shrink-0">
                    <input type="number" value="${s.act}" placeholder="${tg?'~'+tg+tgUnit:'p'}" onchange="setTimerAct(${i},this.value)"
                        class="w-14 text-center text-xs border rounded-lg p-1 outline-none font-bold"
                        style="border-color:${df===null?'#e2e8f0':df>=0?'rgba(var(--pc-rgb),.4)':'rgba(248,113,113,.4)'}">
                    ${df!==null?`<span class="text-[11px] font-black" style="color:${df>=0?'var(--pc)':'#ef4444'}">${df>=0?'+'+df:df}</span>`:''}
                </div>`:''}
                <button onclick="toggleTimerDone(${i})" class="shrink-0 text-[11px] font-black px-3 py-1 rounded-lg border transition-colors"
                    style="background:${s.done?pcAlpha(.12):'transparent'};border-color:${pcAlpha(.3)};color:var(--pc)">
                    ${s.done?'✓완료':'완료'}
                </button>
                ${s.free?`<button onclick="delFreeSubject(${i})" class="text-slate-200 hover:text-red-400 text-sm transition-colors">✕</button>`:''}
            </div>
            <div class="flex items-center gap-3">
                <span class="font-mono text-base font-black min-w-[52px]" style="color:${s.done?'var(--pc)':s.on?'var(--pc)':'#94a3b8'}">
                    ${fmtTimerSec(spentSec)}
                </span>
                ${!s.done?`
                    <button onclick="toggleTimerStart(${i})" class="text-[11px] font-bold px-3 py-1.5 rounded-lg transition-colors"
                        style="background:${s.on?pcAlpha(.12):'#f1f5f9'};color:${s.on?'var(--pc)':'#94a3b8'}">
                        ${s.on?'정지':'시작'}
                    </button>
                    <button onclick="resetTimer(${i})" class="text-[11px] text-slate-300 hover:text-slate-500 border border-slate-200 rounded-lg px-2 py-1.5 transition-colors">↺</button>`:''}
                <div class="flex-1 prog-bg ml-1"><div class="prog-fill" style="width:${progressPct}%"></div></div>
                <span class="text-[10px] font-black shrink-0" style="color:var(--pc)">목표 ${fmtHHMM(s.m*60)}</span>
            </div>
        </div>`;
    }).join('');
    // 타임라인 갱신
    setTimeout(renderTimeline, 0);
}

/* ═══════════════════════════════════════════════
   TIMER LOG HELPERS
═══════════════════════════════════════════════ */
const TIMELINE_SUBJECT_TINTS = {
    '영어':0.84,
    '한국사':0.74,
    '국어':0.64,
    '행정학':0.54,
    '행정법':0.44,
    '헌법':0.32,
    '경제':0.18,
    '각론':0.26,
    '기타':0.68,
};

function normalizeTimelineSubject(name){
    const n=String(name||'');
    if(n.includes('한국사')) return '한국사';
    if(n.includes('영어')) return '영어';
    if(n.includes('국어') || n.includes('모의')) return '국어';
    if(n.includes('행정학') || n.includes('행학')) return '행정학';
    if(n.includes('행정법') || n.includes('행법')) return '행정법';
    if(n.includes('헌법')) return '헌법';
    if(n.includes('경제')) return '경제';
    if(n.includes('각론')) return '각론';
    return '기타';
}

function getSubjectDisplayName(name, compact=false){
    const raw=String(name||'').trim();
    if(!raw) return '기타';
    const matched=timerSubjMatch(raw);
    if(matched) return matched;
    const reviewed=normalizeReviewSubject(raw);
    if(reviewed && reviewed!==raw) return reviewed;
    const normalized=normalizeTimelineSubject(raw);
    if(compact && normalized!=='기타') return normalized;
    return compact ? raw : raw;
}

// 글자 폭을 대략 추정해서(한글은 넓게, 영문/숫자는 좁게) 주어진 픽셀 폭에 맞춰 자르고 말줄임표(…) 붙임.
// CSS text-overflow:ellipsis는 html2canvas로 캡처할 때 잘리지 않는 경우가 있어서, 아예 문자열 자체를 미리 잘라 넣음.
function estTextWidth(text, fontSizePx){
    let w=0;
    for(const ch of text){ w += /[\u3131-\u3163\uac00-\ud7a3]/.test(ch) ? fontSizePx*1.05 : fontSizePx*0.62; }
    return w;
}
function truncateForWidth(text, maxWidthPx, fontSizePx){
    if(estTextWidth(text, fontSizePx) <= maxWidthPx) return text;
    let result='';
    for(const ch of text){
        if(estTextWidth(result+ch+'…', fontSizePx) > maxWidthPx) break;
        result+=ch;
    }
    return (result||text.slice(0,1))+'…';
}
function studyDaysLabel(item){
    if(!item || !item.studyDays || item.studyDays.length===0) return '';
    const names=['월','화','수','목','금','토','일'];
    return item.studyDays.slice().sort((a,b)=>a-b).map(i=>names[i]).join('');
}

function hexToRgba(hex, alpha){
    const v=String(hex||'').replace('#','').trim();
    if(v.length!==6) return `rgba(148,163,184,${alpha})`;
    const r=parseInt(v.slice(0,2),16);
    const g=parseInt(v.slice(2,4),16);
    const b=parseInt(v.slice(4,6),16);
    return `rgba(${r},${g},${b},${alpha})`;
}

function mixHexWithWhite(hex, whiteRatio){
    const v=String(hex||'').replace('#','').trim();
    if(v.length!==6) return '#cbd5e1';
    const ratio=Math.max(0,Math.min(1,whiteRatio));
    const r=parseInt(v.slice(0,2),16);
    const g=parseInt(v.slice(2,4),16);
    const b=parseInt(v.slice(4,6),16);
    const mix=(channel)=>Math.round(channel*(1-ratio)+255*ratio);
    return `#${[mix(r),mix(g),mix(b)].map(n=>n.toString(16).padStart(2,'0')).join('')}`;
}

function hexToHsl(hex){
    const v=String(hex||'').replace('#','').trim();
    if(v.length!==6) return [210,0.5,0.5];
    let r=parseInt(v.slice(0,2),16)/255, g=parseInt(v.slice(2,4),16)/255, b=parseInt(v.slice(4,6),16)/255;
    const max=Math.max(r,g,b), min=Math.min(r,g,b);
    let h,s; const l=(max+min)/2;
    if(max===min){ h=0; s=0; }
    else{
        const d=max-min;
        s=l>0.5 ? d/(2-max-min) : d/(max+min);
        switch(max){
            case r: h=(g-b)/d+(g<b?6:0); break;
            case g: h=(b-r)/d+2; break;
            default: h=(r-g)/d+4;
        }
        h*=60;
    }
    return [h,s,l];
}

function hslToHex(h,s,l){
    h=((h%360)+360)%360; s=Math.max(0,Math.min(1,s)); l=Math.max(0,Math.min(1,l));
    const c=(1-Math.abs(2*l-1))*s;
    const x=c*(1-Math.abs((h/60)%2-1));
    const m=l-c/2;
    let r,g,b;
    if(h<60){r=c;g=x;b=0;} else if(h<120){r=x;g=c;b=0;} else if(h<180){r=0;g=c;b=x;}
    else if(h<240){r=0;g=x;b=c;} else if(h<300){r=x;g=0;b=c;} else {r=c;g=0;b=x;}
    const to255=v=>Math.round((v+m)*255);
    return `#${[to255(r),to255(g),to255(b)].map(n=>Math.max(0,Math.min(255,n)).toString(16).padStart(2,'0')).join('')}`;
}

/* 과목색이 서로 비슷해 보이지 않도록 채도(彩度)는 최소치를 보장하고,
   밝기(명도)는 용도별로 일정한 범위 안으로 고정해 항상 또렷하게 구분되게 만든다. */
function paletteColor(rawHex, minS, lo, hi, maxS=1){
    let [h,s,l]=hexToHsl(rawHex);
    s=Math.max(minS, Math.min(maxS, s));
    l=Math.min(hi, Math.max(lo, l));
    return hslToHex(h,s,l);
}

function getSubjColor(name){
    // 미리 계산해 둔 파스텔 표(SUBJECT_BG)를 사용: 테마마다 6과목이 항상 파스텔톤이면서 서로 구분되게 맞춰둔 값
    const paletteKey = normalizeSubjectForPalette(name);
    const bgTable = SUBJECT_BG[currentTheme] || SUBJECT_BG.clearsky;
    if(paletteKey && bgTable[paletteKey]){
        return bgTable[paletteKey];
    }
    const key = normalizeTimelineSubject(name);
    const baseHex = THEMES[currentTheme]?.solid || THEMES[currentTheme]?.color || THEMES.clearsky.color;
    const tint = TIMELINE_SUBJECT_TINTS[key] ?? TIMELINE_SUBJECT_TINTS['기타'];
    return paletteColor(mixHexWithWhite(baseHex, tint), .28, .72, .88, .50);
}

function getSubjBadgeStyle(name, filled=false){
    const bg=getSubjColor(name);       // 사진 원본에 가까운 파스텔 (배경용)
    const txt=getSubjTextColor(name);  // 같은 색상(Hue)에서 읽기 좋게 어둡힌 색
    return filled
        ? `background:${txt};color:#fff;border-color:${hexToRgba(txt,.25)}`
        : `background:${bg};color:${txt};border-color:${hexToRgba(txt,.35)}`;
}

function getSubjTextColor(name){
    // 글자용: SUBJECT_BG와 같은 색상(Hue)을 유지한 채 채도를 더 올리고 명도를 더 낮춰 또렷하게
    const paletteKey = normalizeSubjectForPalette(name);
    const bgTable = SUBJECT_BG[currentTheme] || SUBJECT_BG.clearsky;
    if(paletteKey && bgTable[paletteKey]){
        return paletteColor(bgTable[paletteKey], .55, .20, .32, .78);
    }
    const key = normalizeTimelineSubject(name);
    const baseHex = THEMES[currentTheme]?.solid || THEMES[currentTheme]?.color || THEMES.clearsky.color;
    const tint = TIMELINE_SUBJECT_TINTS[key] ?? TIMELINE_SUBJECT_TINTS['기타'];
    return paletteColor(mixHexWithWhite(baseHex, tint), .45, .20, .32);
}
function getNowDaySec(){
    const now=new Date();
    return now.getHours()*3600+now.getMinutes()*60+now.getSeconds();
}
function saveTimerLogs(){
    localStorage.setItem(`yst4_log_${timerDate}`,JSON.stringify(timerLogs));
}
function loadTimerLogs(ds){
    timerLogs=JSON.parse(localStorage.getItem(`yst4_log_${ds}`))||[];
}

/* ═══════════════════════════════════════════════
   TIMELINE CHART RENDER
═══════════════════════════════════════════════ */
function renderTimeline(){
    const el=document.querySelector('#planner-container #timeline-chart') || [...document.querySelectorAll('#timeline-chart')].at(-1);
    if(!el) return;
    const isDayTimeline = el.dataset.mode==='day';
    const allLogs=[...timerLogs];
    // 현재 켜진 타이머도 실시간으로 표시
    const nowSec=getNowDaySec();
    timerSubjects.forEach(s=>{
        if(s.on && s._startSec!==undefined){
            allLogs.push({n:s.n,startSec:s._startSec,endSec:nowSec});
        }
    });

    if(!allLogs.length){
        el.innerHTML=`<div class="text-center text-slate-300 ${isDayTimeline?'text-sm py-20':'text-xs py-12'}">공부를 시작하면 타임라인이 나타나요</div>`;
        return;
    }

    const HOUR=3600, CELL=600; // 1시간, 10분(초)
    const legendDot = isDayTimeline ? 19 : 13;
    const legendGap = isDayTimeline ? 20 : 13;
    const legendFont = isDayTimeline ? 18 : 13;
    const headerLeft = isDayTimeline ? 56 : 40;
    const headerFont = isDayTimeline ? 15 : 11;
    const rowHeight = isDayTimeline ? 42 : 26;
    const rowMargin = isDayTimeline ? 2 : 1;
    const rowRadius = isDayTimeline ? 7 : 3;
    const hourLabelW = isDayTimeline ? 56 : 40;
    const hourLabelFont = isDayTimeline ? 17 : 13;
    const blockInset = isDayTimeline ? 2 : 1;
    const cellFlex = isDayTimeline ? 0.76 : 0.9;

    // 컬러 맵
    const colorMap={};
    allLogs.forEach(l=>{
        const label=getSubjectDisplayName(l.n, isDayTimeline);
        if(!colorMap[label]) colorMap[label]=getSubjColor(label);
    });

    // 시간 범위 — 1시간 단위로 내림/올림
    const minHour=Math.floor(Math.min(...allLogs.map(l=>l.startSec))/HOUR);
    const maxHour=Math.ceil(Math.max(...allLogs.map(l=>l.endSec))/HOUR);

    // 범례
    const legend=Object.entries(colorMap).map(([n,c])=>
        `<span style="display:inline-flex;align-items:center;gap:${isDayTimeline?6:4}px;margin-right:${legendGap}px;margin-bottom:${isDayTimeline?8:4}px;">
            <span style="background:${c};width:${legendDot}px;height:${legendDot}px;display:inline-block;border-radius:${isDayTimeline?4:2}px;flex-shrink:0;"></span>
            <span style="font-size:${legendFont}px;font-weight:800;color:#475569;">${n}</span>
        </span>`
    ).join('');

    // 분(가로) 헤더: :00 :10 :20 :30 :40 :50
    const minHeader=`<div style="display:flex;margin-left:${headerLeft}px;margin-bottom:${isDayTimeline?8:3}px;">
        ${[':00',':10',':20',':30',':40',':50'].map(m=>
            `<div style="flex:${cellFlex};text-align:center;font-size:${headerFont}px;font-weight:800;color:#94a3b8;">${m}</div>`
        ).join('')}
    </div>`;

    // 시간(세로) 행
    const rows=[];
    for(let h=minHour;h<maxHour;h++){
        const hSec=h*HOUR;
        const hourLabel=`${String(h).padStart(2,'0')}`;
        // 6개 셀 (각 10분)
        const cells=[0,1,2,3,4,5].map(ci=>{
            const cStart=hSec+ci*CELL;
            const cEnd=cStart+CELL;
            const overlaps=allLogs.filter(l=>l.startSec<cEnd && l.endSec>cStart);
            if(!overlaps.length){
                return `<div style="flex:${cellFlex};height:${rowHeight}px;background:#f8fafc;border:1px solid #eef2f6;margin:${rowMargin}px;border-radius:${rowRadius}px;"></div>`;
            }
            // 셀 안에서 각 로그를 비율로 렌더 (여러 과목 겹침 지원)
            const blocks=overlaps.map(l=>{
                const oStart=Math.max(l.startSec,cStart);
                const oEnd=Math.min(l.endSec,cEnd);
                const leftPct=((oStart-cStart)/CELL)*100;
                const widthPct=Math.max(((oEnd-oStart)/CELL)*100, 3);
                const dur=oEnd-oStart;
                const durLabel=dur>=60?`${Math.floor(dur/60)}분${dur%60?` ${dur%60}초`:''}`:`${dur}초`;
                const label=getSubjectDisplayName(l.n, isDayTimeline);
                return `<div style="position:absolute;left:${leftPct}%;width:${widthPct}%;top:${blockInset}px;bottom:${blockInset}px;background:${colorMap[label]};opacity:0.92;border-radius:${isDayTimeline?4:2}px;" title="${label} (${durLabel})"></div>`;
            }).join('');
            return `<div style="flex:${cellFlex};height:${rowHeight}px;background:#f8fafc;border:1px solid #eef2f6;margin:${rowMargin}px;border-radius:${rowRadius}px;position:relative;overflow:hidden;">${blocks}</div>`;
        }).join('');

        rows.push(`<div style="display:flex;align-items:center;margin-bottom:1px;">
            <div style="width:${hourLabelW}px;text-align:right;padding-right:${isDayTimeline?10:7}px;font-size:${hourLabelFont}px;font-weight:800;color:#475569;flex-shrink:0;">${hourLabel}</div>
            <div style="display:flex;flex:1;">${cells}</div>
        </div>`);
    }

    el.innerHTML=`<div style="display:flex;flex-wrap:wrap;margin-bottom:${isDayTimeline?14:8}px;">${legend}</div>${minHeader}${rows.join('')}`;
}

function refreshEmbeddedDayView(){
    if(currentTab==='planner' && currentView==='day'){
        renderPlanner();
    }
}

function updateLiveDayTimerDisplay(){
    const trackedEl=document.getElementById('day-tracked-display');
    if(trackedEl){
        const liveTotal=timerDate===selectedDate
            ? timerSubjects.reduce((acc,s)=>acc+(s.spent||0),0)
            : getTotalTrackerSecs(selectedDate);
        trackedEl.textContent=fmtHHMMSS(liveTotal);
    }

    timerSubjects.forEach((s,idx)=>{
        const el=document.getElementById(`day-timer-clock-${idx}`);
        if(el) el.textContent=fmtHHMMSS(s.spent||0);
    });
}

/* ═══════════════════════════════════════════════
   TIMER — ACTIONS
═══════════════════════════════════════════════ */
function toggleTimerStart(i){
    const nowSec=getNowDaySec();
    // 기존에 켜진 과목 종료 로그
    timerSubjects.forEach((s,j)=>{
        if(s.on && s._startSec!==undefined){
            timerLogs.push({n:s.n,startSec:s._startSec,endSec:nowSec});
            saveTimerLogs();
        }
    });
    const willBeOn = !timerSubjects[i].on;
    timerSubjects=timerSubjects.map((s,j)=>{
        if(j===i) return {...s,on:willBeOn,_startSec:willBeOn?nowSec:undefined};
        return s.on?{...s,on:false,_startSec:undefined}:s;
    });
    if(timerSubjects.some(s=>s.on)) startTimerTick();
    renderTimer();
    renderTimeline();
    refreshEmbeddedDayView();
}
function resetTimer(i){
    timerSubjects=timerSubjects.map((s,j)=>j===i?{...s,rem:s.m*60,on:false}:s);
    renderTimer();
    renderTimeline();
    refreshEmbeddedDayView();
}
// ★ 측정 누르는 걸 깜빡했을 때, 실제 공부한 시작~종료 구간을 직접 입력해서 수정
//   (타임라인에 찍히는 구간 자체를 편집하며, 과목 합계 시간은 구간 합으로 자동 재계산됨)
let timeEditTimerIdx=-1;
let timeEditBlocks=[];

function secToHM(sec){
    sec=Math.max(0, Math.min(86399, Math.round(sec||0)));
    const h=Math.floor(sec/3600), m=Math.floor((sec%3600)/60);
    return `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}`;
}
function hmToSec(hm){
    if(!hm) return null;
    const parts=String(hm).split(':').map(Number);
    if(parts.length<2 || parts.some(isNaN)) return null;
    return parts[0]*3600+parts[1]*60;
}

function openTimeEditModal(i){
    const s=timerSubjects[i];
    if(!s) return;
    timeEditTimerIdx=i;
    const logs=timerLogs.filter(l=>l.n===s.n);
    if(logs.length){
        timeEditBlocks=logs.map(l=>({start:secToHM(l.startSec), end:secToHM(l.endSec)}));
    }else if(s.spent>0){
        // 로그는 없지만 합계 시간만 있는 경우, 지금 시각을 기준으로 구간 하나를 만들어서 시작점으로 제공
        const nowSec=getNowDaySec();
        timeEditBlocks=[{start:secToHM(nowSec-s.spent), end:secToHM(nowSec)}];
    }else{
        timeEditBlocks=[{start:'',end:''}];
    }
    document.getElementById('time-edit-modal-title').textContent=`⏱ ${s.n} 시간 수정`;
    renderTimeEditBlocks();
    document.getElementById('time-edit-modal').style.display='flex';
}

function closeTimeEditModal(){
    document.getElementById('time-edit-modal').style.display='none';
    timeEditTimerIdx=-1;
}

function renderTimeEditBlocks(){
    const wrap=document.getElementById('time-edit-blocks');
    wrap.innerHTML=timeEditBlocks.map((b,i)=>`
        <div class="time-edit-block-row">
            <input type="time" value="${b.start}" onchange="updateTimeEditBlock(${i},'start',this.value)">
            <span class="text-slate-300 font-black">~</span>
            <input type="time" value="${b.end}" onchange="updateTimeEditBlock(${i},'end',this.value)">
            <button onclick="removeTimeEditBlock(${i})" class="time-edit-remove-btn">삭제</button>
        </div>
    `).join('');
    let totalSec=0;
    timeEditBlocks.forEach(b=>{
        const st=hmToSec(b.start), en=hmToSec(b.end);
        if(st!==null && en!==null && en>st) totalSec+=(en-st);
    });
    document.getElementById('time-edit-total').textContent=fmtHHMMSS(totalSec);
}

function updateTimeEditBlock(i,field,val){
    if(!timeEditBlocks[i]) return;
    timeEditBlocks[i]={...timeEditBlocks[i],[field]:val};
    renderTimeEditBlocks();
}

function addTimeEditBlock(){
    timeEditBlocks=[...timeEditBlocks,{start:'',end:''}];
    renderTimeEditBlocks();
}

function removeTimeEditBlock(i){
    timeEditBlocks=timeEditBlocks.filter((_,j)=>j!==i);
    if(!timeEditBlocks.length) timeEditBlocks=[{start:'',end:''}];
    renderTimeEditBlocks();
}

function saveTimeEditModal(){
    const s=timerSubjects[timeEditTimerIdx];
    if(!s) return;
    const validBlocks=timeEditBlocks
        .map(b=>({startSec:hmToSec(b.start), endSec:hmToSec(b.end)}))
        .filter(b=>b.startSec!==null && b.endSec!==null && b.endSec>b.startSec);

    // 이 과목의 기존 로그를 지우고, 새로 입력한 구간들로 교체
    timerLogs=timerLogs.filter(l=>l.n!==s.n);
    validBlocks.forEach(b=>{ timerLogs.push({n:s.n, startSec:b.startSec, endSec:b.endSec}); });
    saveTimerLogs();

    const totalSec=validBlocks.reduce((a,b)=>a+(b.endSec-b.startSec),0);
    timerSubjects=timerSubjects.map((x,j)=>j===timeEditTimerIdx?{...x,spent:totalSec,on:false,_startSec:undefined}:x);
    saveTimer(true); // 구간을 모두 지워 합계가 0이 되는 경우에도 반드시 저장

    closeTimeEditModal();
    renderTimer();
    renderTimeline();
    refreshEmbeddedDayView();
    if(typeof render==='function') render();
}

// ★ 타이머 과목명 → 플래너 과목명 매핑
function timerSubjMatch(timerName){
    const subjects=['행정법','행정학','한국사','국어','영어','경제','헌법','완충'];
    return subjects.find(s=>timerName.startsWith(s))||null;
}

// ★ 타이머 완료 → 플래너 completedTasks 동기화
function toggleTimerDone(i){
    const newDone=!timerSubjects[i].done;
    // 완료 시 켜진 타이머면 로그 종료
    if(newDone && timerSubjects[i].on && timerSubjects[i]._startSec!==undefined){
        timerLogs.push({n:timerSubjects[i].n,startSec:timerSubjects[i]._startSec,endSec:getNowDaySec()});
        saveTimerLogs();
    }
    timerSubjects=timerSubjects.map((s,j)=>j===i?{...s,done:newDone,on:false,_startSec:undefined}:s);
    const match=timerSubjMatch(timerSubjects[i].n);
    if(match){
        const day=scheduleData.find(d=>d.date===timerDate);
        if(day){
            day.tasks.forEach((t,tidx)=>{
                if((t.match(/\[(.*?)\]/)?.[1]||'')===match)
                    completedTasks[`${timerDate}-${tidx}`]=newDone;
            });
            localStorage.setItem('young_completed',JSON.stringify(completedTasks));
        }
    }
    saveTimer();renderTimer();renderTimeline();refreshEmbeddedDayView();
}

function setTimerAct(i,v){timerSubjects=timerSubjects.map((s,j)=>j===i?{...s,act:v}:s);scheduleTimerSave();refreshEmbeddedDayView();}
function addFreeSubject(){
    const nameInput=document.getElementById('free-name') || document.getElementById('inline-free-name');
    const minInput=document.getElementById('free-min') || document.getElementById('inline-free-min');
    const n=nameInput?.value.trim();
    const m=+minInput?.value;
    if(!n||!m||m<=0)return;
    timerSubjects=[...timerSubjects,{n,m,r:'',pg:false,done:false,act:'',spent:0,rem:m*60,on:false,free:true}];
    if(nameInput) nameInput.value='';
    if(minInput) minInput.value='';
    renderTimer();
    renderTimeline();
    refreshEmbeddedDayView();
}
function delFreeSubject(i){timerSubjects=timerSubjects.filter((_,j)=>j!==i);renderTimer();renderTimeline();refreshEmbeddedDayView();}
function goTimerToday(){loadTimerDay(TODAY);}

/* ═══════════════════════════════════════════════
   RECORDS — DATA HELPERS
═══════════════════════════════════════════════ */
function getSubjectSecsForDates(dates){
    // Returns {subjectName: totalSeconds}
    const map={};
    for(const ds of dates){
        const data=lsGet(`yst4_${ds}`);
        if(!data||!Array.isArray(data)) continue;
        for(const s of data){
            if(s.spent>0){
                const displayName=getSubjectDisplayName(s.n, true);
                map[displayName]=(map[displayName]||0)+s.spent;
            }
        }
    }
    return map;
}

function getDatesInWeek(refDate){
    const s=weekStart(refDate);
    return Array.from({length:7},(_,i)=>{const d=new Date(s);d.setDate(s.getDate()+i);return toKey(d);});
}

function getDatesInMonth(year,month){
    const days=new Date(year,month+1,0).getDate();
    return Array.from({length:days},(_,i)=>`${year}-${String(month+1).padStart(2,'0')}-${String(i+1).padStart(2,'0')}`);
}

/* ═══════════════════════════════════════════════
   RECORDS — WEEK VIEW
═══════════════════════════════════════════════ */
function renderRecordsWeek(container){
    const dates=getDatesInWeek(recordsWeekRef);
    const subjectMap=getSubjectSecsForDates(dates);
    const dayNames=['일','월','화','수','목','금','토'];

    // Day bars
    let dayRows='';
    let totalSecs=0;
    for(const ds of dates){
        const d=new Date(ds+'T00:00:00');
        const secs=getTotalTrackerSecs(ds);
        totalSecs+=secs;
        const h=fmtHHMM(secs);
        const isToday=ds===TODAY;
        const maxH=8*3600;
        const barPct=Math.min(100,Math.round(secs/(maxH)*100));
        dayRows+=`<div class="flex items-center gap-3 mb-2.5">
            <div class="text-[15px] w-6 text-center ${isToday?'text-pc':'text-slate-400'}">${dayNames[d.getDay()]}</div>
            <div class="text-[15px] text-slate-400 w-14">${ds.slice(5)}</div>
            <div class="flex-1 prog-bg h-5" style="height:10px;border-radius:4px">
                <div class="prog-fill" style="width:${barPct}%;height:100%;border-radius:4px"></div>
            </div>
            <div class="text-[13px] font-black text-pc w-12 text-right">${secs>0?h:'-'}</div>
        </div>`;
    }

    // Subject breakdown
    const sorted=Object.entries(subjectMap).sort((a,b)=>b[1]-a[1]);
    const maxSec=sorted[0]?.[1]||1;
    let subRows='';
    for(const[n,sec] of sorted){
        const h=fmtHHMM(sec);
        const barPct=Math.round(sec/maxSec*100);
        subRows+=`<div class="flex items-center gap-3 mb-2.5">
            <div class="text-xs font-bold text-slate-600 w-20 shrink-0 truncate">${n}</div>
            <div class="flex-1 prog-bg" style="height:10px;border-radius:4px">
                <div class="prog-fill" style="width:${barPct}%;height:100%;border-radius:4px"></div>
            </div>
            <div class="text-[15px] text-pc w-14 text-right">${h}</div>
        </div>`;
    }

    const ws=weekStart(recordsWeekRef);
    const we=new Date(ws);we.setDate(ws.getDate()+6);

    container.innerHTML=`
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="card p-6">
                <div class="flex justify-between items-center mb-5">
                    <h3 class="text-base text-pc">일별 공부시간</h3>
                    <div class="text-[15px] text-slate-400">${toKey(ws).slice(5)} ~ ${toKey(we).slice(5)}</div>
                </div>
                ${dayRows}
                <div class="border-t border-slate-100 pt-3 mt-3 flex justify-between">
                    <span class="text-xs font-black text-slate-400">주간 합계</span>
                    <span class="text-sm font-black text-pc">${fmtHHMMSS(totalSecs)}</span>
                </div>
            </div>
            <div class="card p-6">
                <h3 class="text-base text-pc mb-5">과목별 공부시간</h3>
                ${sorted.length?subRows:`<p class="text-base text-slate-300 text-center py-8">이번 주 타이머 기록이 없습니다</p>`}
            </div>
        </div>`;
}

/* ═══════════════════════════════════════════════
   RECORDS — MONTH VIEW
═══════════════════════════════════════════════ */
function renderRecordsMonth(container){
    const dates=getDatesInMonth(recordsYear,recordsMonth);
    const subjectMap=getSubjectSecsForDates(dates);
    const sorted=Object.entries(subjectMap).sort((a,b)=>b[1]-a[1]);
    const maxSec=sorted[0]?.[1]||1;

    // Heatmap calendar
    const first=new Date(recordsYear,recordsMonth,1).getDay();
    const offset=first===0?6:first-1;
    const days=new Date(recordsYear,recordsMonth+1,0).getDate();
    const dayLabels=['월','화','수','목','금','토','일'];

    // max hours for color scale
    const allSecs=dates.map(ds=>getTotalTrackerSecs(ds));
    const maxDaySec=Math.max(...allSecs,1);

    let calHtml=`<div class="grid grid-cols-7 mb-1">`;
    dayLabels.forEach((d,i)=>{calHtml+=`<div class="text-center text-[10px] font-black py-1 ${i===6?'text-red-400':'text-slate-400'}">${d}</div>`;});
    calHtml+=`</div><div style="display:grid;grid-template-columns:repeat(7,1fr);gap:3px">`;
    for(let i=0;i<offset;i++) calHtml+=`<div></div>`;
    for(let d=1;d<=days;d++){
        const key=`${recordsYear}-${String(recordsMonth+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
        const secs=getTotalTrackerSecs(key);
        const isToday=key===TODAY;
        const alpha=secs>0?0.12+Math.pow(secs/maxDaySec,0.6)*0.6:0;
        const bg=secs>0?pcAlpha(alpha):'#f8fafc';
        const hText=secs>0?fmtHHMM(secs):'';
        const dow=(offset+d-1)%7;
        calHtml+=`<div class="heat-cell" style="background:${bg};${isToday?`outline:2px solid var(--pc);outline-offset:-2px;`:''}">
            <span style="font-size:11px;font-weight:${isToday?800:500};color:${dow===6?'#ef4444':secs>0?'var(--pc)':'#94a3b8'}">${d}</span>
            ${hText?`<span style="font-size:10px;font-weight:700;color:${secs>0?'var(--pc)':'#94a3b8'}">${hText}</span>`:''}
        </div>`;
    }
    calHtml+=`</div>`;

    // Legend
    calHtml+=`<div class="flex items-center gap-2 mt-3 justify-end">
        <span class="text-[10px] text-slate-400">낮음</span>
        ${[.2,.4,.6,.8,1].map(a=>`<div style="width:14px;height:14px;border-radius:3px;background:${pcAlpha(.12+a*.55)}"></div>`).join('')}
        <span class="text-[10px] text-slate-400">높음</span>
    </div>`;

    // Subject bars
    let subRows='';
    for(const[n,sec] of sorted){
        const h=fmtHHMM(sec);
        const barPct=Math.round(sec/maxSec*100);
        subRows+=`<div class="flex items-center gap-3 mb-2.5">
            <div class="text-xs font-bold text-slate-600 w-20 shrink-0 truncate">${n}</div>
            <div class="flex-1 prog-bg" style="height:10px;border-radius:4px">
                <div class="prog-fill" style="width:${barPct}%;height:100%;border-radius:4px"></div>
            </div>
            <div class="text-[11px] font-black text-pc w-14 text-right">${h}</div>
        </div>`;
    }

    const monthTotalSec=allSecs.reduce((a,b)=>a+b,0);
    const monthNames=['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'];

    container.innerHTML=`
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="card p-6">
                <div class="flex justify-between items-center mb-4">
                    <h3 class="font-black text-base text-pc">${recordsYear}년 ${monthNames[recordsMonth]}</h3>
                    <div class="text-[11px] font-black text-slate-400">월간 합계 <span class="text-pc">${fmtHHMMSS(monthTotalSec)}</span></div>
                </div>
                ${calHtml}
            </div>
            <div class="card p-6">
                <h3 class="font-black text-base text-pc mb-5">과목별 공부시간</h3>
                ${sorted.length?subRows:`<p class="text-xs text-slate-300 text-center py-8">이 달 타이머 기록이 없습니다</p>`}
            </div>
        </div>`;
}

function getMockEntryStats(entry){
    const values=MOCK_SUBJECTS
        .map(s=>Number(entry?.scores?.[s]))
        .filter(v=>Number.isFinite(v) && v>=0);
    const total=values.reduce((a,b)=>a+b,0);
    const average=values.length? +(total/values.length).toFixed(1) : 0;
    return { total, average, count: values.length };
}

function getMockLineChartMarkup(points){
    if(!points.length) return '';
    const width=220, height=76, padX=10, padY=10;
    const maxX=Math.max(points.length-1,1);
    const coords=points.map((p,idx)=>{
        const x=padX + ((width-padX*2) * (idx/maxX));
        const y=(height-padY) - ((height-padY*2) * (p/100));
        return {x,y,p};
    });
    const polyline=coords.map(c=>`${c.x},${c.y}`).join(' ');
    const dots=coords.map((c,idx)=>`<circle cx="${c.x}" cy="${c.y}" r="${idx===coords.length-1?4:3}" fill="${idx===coords.length-1?'#0f766e':'var(--pc)'}"></circle>`).join('');
    return `<svg viewBox="0 0 ${width} ${height}" width="100%" height="76" aria-hidden="true">
        <line x1="${padX}" y1="${height-padY}" x2="${width-padX}" y2="${height-padY}" stroke="#e2e8f0" stroke-width="1.5"></line>
        <polyline fill="none" stroke="var(--pc)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" points="${polyline}"></polyline>
        ${dots}
    </svg>`;
}

function getMockSubjectSeriesChartMarkup(entries){
    if(!entries.length) return '';
    const palette=['#056E00','#1d4ed8','#dc2626','#d97706','#7c3aed','#0f766e'];
    const visibleSubjects=MOCK_SUBJECTS.filter(sub=>
        entries.some(entry=>Number.isFinite(Number(entry.scores?.[sub])))
    );
    if(!visibleSubjects.length){
        return `<div class="rounded-2xl border border-slate-100 bg-white p-8 text-center text-slate-300 font-bold">표시할 과목 점수 데이터가 없습니다</div>`;
    }
    const width=800, height=300;
    const pad={top:18,right:42,bottom:72,left:56};
    const chartW=width-pad.left-pad.right;
    const chartH=height-pad.top-pad.bottom;
    const xStep=visibleSubjects.length>1 ? chartW/(visibleSubjects.length-1) : 0;
    const yForScore=(score)=>pad.top + chartH - (Math.max(0, Math.min(100, score))/100)*chartH;
    const xForIndex=(idx)=>pad.left + idx*xStep;
    const yTicks=[0,20,40,60,80,100];

    const gridLines=yTicks.map(score=>{
        const y=yForScore(score);
        return `<g>
            <line x1="${pad.left}" y1="${y}" x2="${width-pad.right}" y2="${y}" stroke="rgba(148,163,184,0.22)" stroke-width="1"/>
            <text x="${pad.left-12}" y="${y+6}" text-anchor="end" font-size="17" font-weight="600" fill="#94a3b8">${score}</text>
        </g>`;
    }).join('');

    const xLabels=visibleSubjects.map((sub,idx)=>`<text x="${xForIndex(idx)}" y="${height-24}" text-anchor="middle" font-size="20" font-weight="600" fill="#475569">${sub}</text>`).join('');

    const series=entries.map((entry,seriesIdx)=>{
        const color=palette[seriesIdx % palette.length];
        const coords=visibleSubjects.map((sub,idx)=>{
            const score=Number(entry.scores?.[sub]);
            if(!Number.isFinite(score)) return null;
            return { x:xForIndex(idx), y:yForScore(score), score };
        }).filter(Boolean);
        if(!coords.length) return '';
        const polyline=coords.map(p=>`${p.x},${p.y}`).join(' ');
        const points=coords.map(p=>`<circle cx="${p.x}" cy="${p.y}" r="5.5" fill="${color}" stroke="#ffffff" stroke-width="2.5"></circle>`).join('');
        return `<g>
            <polyline fill="none" stroke="${color}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" points="${polyline}"></polyline>
            ${points}
        </g>`;
    }).join('');

    const legend=entries.map((entry,idx)=>{
        const color=palette[idx % palette.length];
        const label=entry.label || entry.date;
        return `<div class="flex items-center gap-2 min-w-0">
            <span class="w-4 h-4 rounded-full shrink-0" style="background:${color}"></span>
            <span class="text-[15px] font-semibold text-slate-600 truncate">${label}</span>
        </div>`;
    }).join('');

    return `
        <div class="rounded-2xl border border-slate-100 bg-white p-4">
            <svg viewBox="0 0 ${width} ${height}" width="100%" height="300" aria-label="과목별 점수 흐름 그래프">
                ${gridLines}
                ${series}
                ${xLabels}
            </svg>
            <div class="mt-3 grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-2">${legend}</div>
        </div>`;
}

function saveMockScoreFromForm(){
    const date=document.getElementById('mock-date-input')?.value;
    if(!date){ showToast('날짜를 입력해 주세요'); return; }
    const label=(document.getElementById('mock-label-input')?.value || '').trim() || `${date} 모의고사`;
    const scores={};
    MOCK_SUBJECTS.forEach(sub=>{
        const el=document.getElementById(`mock-score-${sub}`);
        const raw=el?.value?.trim?.() ?? '';
        if(raw!==''){
            const num=Number(raw);
            if(Number.isFinite(num)) scores[sub]=num;
        }
    });
    const idx=mockScores.findIndex(x=>x.date===date);
    const entry={ date, label, scores, updatedAt: Date.now() };
    if(idx>=0) mockScores[idx]=entry;
    else mockScores.push(entry);
    mockScores.sort((a,b)=>a.date.localeCompare(b.date));
    saveMockScores();
}

function loadMockScoreToForm(date){
    const entry=mockScores.find(x=>x.date===date);
    if(!entry) return;
    const dateEl=document.getElementById('mock-date-input');
    const labelEl=document.getElementById('mock-label-input');
    if(dateEl) dateEl.value=entry.date;
    if(labelEl) labelEl.value=entry.label || '';
    MOCK_SUBJECTS.forEach(sub=>{
        const el=document.getElementById(`mock-score-${sub}`);
        if(el) el.value=entry.scores?.[sub] ?? '';
    });
    showToast('불러왔어요');
}

function deleteMockScore(date){
    mockScores=mockScores.filter(x=>x.date!==date);
    saveMockScores();
}

function renderMockRecords(container){
    const latest=mockScores.at(-1) || null;
    const latestStats=getMockEntryStats(latest);
    const averages=mockScores.map(entry=>({date:entry.date, average:getMockEntryStats(entry).average}));
    const maxAvg=Math.max(...averages.map(x=>x.average), 1);

    const summaryCards=`
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="card p-5">
                <div class="text-[18px] text-slate-400 font-semibold">최근 시험</div>
                <div class="text-[42px] font-black text-pc mt-1 leading-none">${latest?latest.date.slice(5).replace('-','.'):'-'}</div>
                <div class="text-[18px] text-slate-400 font-semibold mt-1 leading-snug">${latest?latest.label:'아직 기록 없음'}</div>
            </div>
            <div class="card p-5">
                <div class="text-[18px] text-slate-400 font-semibold">전체 평균</div>
                <div class="text-[42px] font-black text-pc mt-1 leading-none">${latest?latestStats.average:'-'}</div>
                <div class="text-[18px] text-slate-400 font-semibold mt-1 leading-snug">${latest?`${latestStats.count}과목 기준`:'점수를 입력하면 계산됩니다'}</div>
            </div>
            <div class="card p-5">
                <div class="text-[18px] text-slate-400 font-semibold">총점</div>
                <div class="text-[42px] font-black text-pc mt-1 leading-none">${latest?latestStats.total:'-'}</div>
                <div class="text-[18px] text-slate-400 font-semibold mt-1 leading-snug">누적 시험 ${mockScores.length}회</div>
            </div>
        </div>`;

    const scoreInputs=MOCK_SUBJECTS.map(sub=>`
        <label class="flex flex-col gap-2">
            <span class="text-sm font-black text-slate-500">${sub}</span>
            <input id="mock-score-${sub}" type="number" min="0" max="100" step="1"
                class="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-base font-black outline-none focus:border-pc"
                placeholder="점수">
        </label>`).join('');

    const trendRows=averages.length
        ? averages.map(x=>{
            const barPct=Math.round((x.average/maxAvg)*100);
            return `<div class="flex items-center gap-3 mb-3">
                <div class="text-[17px] font-medium text-slate-400 w-20">${x.date.slice(5)}</div>
                <div class="flex-1 prog-bg" style="height:12px;border-radius:6px;">
                    <div class="prog-fill" style="width:${barPct}%;height:100%;border-radius:6px;"></div>
                </div>
                <div class="text-[18px] font-medium text-pc w-16 text-right">${x.average}</div>
            </div>`;
        }).join('')
        : `<div class="text-center text-slate-300 py-10 font-bold">모의고사 기록을 추가하면 평균 추이가 보여요</div>`;

    const subjectTrendRows=mockScores.length
        ? getMockSubjectSeriesChartMarkup([...mockScores].slice(-6))
        : `<div class="text-center text-slate-300 py-10 font-bold">과목별 추이는 기록 후 보여요</div>`;

    const historyRows=mockScores.length
        ? [...mockScores].reverse().map(entry=>{
            const stats=getMockEntryStats(entry);
            return `<div class="rounded-2xl border border-slate-100 p-4 mb-3 bg-white">
                <div class="flex items-start justify-between gap-3">
                    <div>
                        <div class="text-base font-black text-slate-700">${entry.label}</div>
                        <div class="text-sm text-slate-400 font-bold mt-1">${entry.date}</div>
                    </div>
                    <div class="text-right shrink-0">
                        <div class="text-sm font-black text-pc">평균 ${stats.average}</div>
                        <div class="text-xs text-slate-400 font-bold mt-1">총점 ${stats.total}</div>
                    </div>
                </div>
                <div class="flex flex-wrap gap-2 mt-3">
                    ${MOCK_SUBJECTS.map(sub=>entry.scores?.[sub]!==undefined
                        ? `<span class="px-2.5 py-1 rounded-xl text-xs font-black" style="background:${pcAlpha(0.10)};color:var(--pc)">${sub} ${entry.scores[sub]}</span>`
                        : '').join('')}
                </div>
                <div class="flex gap-2 mt-4">
                    <button onclick="loadMockScoreToForm('${entry.date}')" class="px-3 py-2 rounded-xl text-xs font-black border border-slate-200 text-slate-500 hover:bg-slate-50 transition-colors">불러오기</button>
                    <button onclick="deleteMockScore('${entry.date}')" class="px-3 py-2 rounded-xl text-xs font-black border border-slate-200 text-slate-300 hover:text-red-400 hover:bg-slate-50 transition-colors">삭제</button>
                </div>
            </div>`;
        }).join('')
        : `<div class="card p-8 text-center text-slate-300 font-bold">아직 저장된 모의고사 기록이 없습니다</div>`;

    container.innerHTML=`
        ${summaryCards}
        <div class="grid grid-cols-1 xl:grid-cols-3 gap-4 mt-4">
            <div class="card p-6">
                <h3 class="panel-title text-[28px]">전체 평균 추이</h3>
                <div class="mt-5">${trendRows}</div>
            </div>
            <div class="card p-6">
                <h3 class="panel-title text-[28px]">과목별 점수 흐름</h3>
                <div class="mt-5">${subjectTrendRows}</div>
            </div>
            <div class="card p-6">
                <div class="flex items-center justify-between mb-5">
                    <div>
                        <h3 class="panel-title text-[28px]">모의고사 점수 기록</h3>
                    </div>
                    <button onclick="document.getElementById('mock-date-input').value='${getUpcomingSunday()}';document.getElementById('mock-label-input').value='';Array.from(document.querySelectorAll('[id^=mock-score-]')).forEach(el=>el.value='');" class="text-xs font-black text-slate-400 hover:text-pc transition-colors">초기화</button>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <label class="flex flex-col gap-2">
                        <span class="text-sm font-black text-slate-500">시험 날짜</span>
                        <input id="mock-date-input" type="date" value="${latest?.date || getUpcomingSunday()}"
                            class="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-base font-black outline-none focus:border-pc">
                    </label>
                    <label class="flex flex-col gap-2">
                        <span class="text-sm font-black text-slate-500">회차 이름</span>
                        <input id="mock-label-input" type="text" value="${latest?.label || ''}"
                            class="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-base font-black outline-none focus:border-pc"
                            placeholder="예: 4월 2주차 일요 모의고사">
                    </label>
                </div>
                <div class="grid grid-cols-2 md:grid-cols-3 gap-3 mt-4">
                    ${scoreInputs}
                </div>
                <button onclick="saveMockScoreFromForm()" class="mt-5 w-full bg-pc text-white rounded-2xl py-3 font-black hover:opacity-85 transition-all">모의고사 기록 저장</button>
            </div>
        </div>
        <div class="mt-4">
            <div class="section-kicker mb-2">히스토리</div>
            ${historyRows}
        </div>`;

    const fillEntry=latest || null;
    if(fillEntry){
        MOCK_SUBJECTS.forEach(sub=>{
            const el=document.getElementById(`mock-score-${sub}`);
            if(el) el.value=fillEntry.scores?.[sub] ?? '';
        });
    }
}

/* ═══════════════════════════════════════════════
   RECORDS — RENDER
═══════════════════════════════════════════════ */
function renderRecords(){
    ['study','mock'].forEach(v=>{
        const el=document.getElementById(`rmode-${v}`);
        if(el){el.className='rec-tab'+(currentRecordMode===v?' active':'');}
    });
    ['week','month'].forEach(v=>{
        const el=document.getElementById(`rtab-${v}`);
        if(el){el.className='rec-tab'+(currentRecords===v?' active':'');}
    });

    // Nav buttons
    const navBtns=document.getElementById('records-nav-btns');
    const periodTabs=document.getElementById('records-period-tabs');
    if(periodTabs) periodTabs.classList.toggle('hidden', currentRecordMode!=='study');

    if(currentRecordMode==='mock'){
        navBtns.innerHTML='';
        renderMockRecords(document.getElementById('records-container'));
        return;
    }

    if(currentRecords==='week'){
        navBtns.innerHTML=`
            <button onclick="recordsWeekRef.setDate(recordsWeekRef.getDate()-7);renderRecords()" class="text-xs font-black text-pc px-3 py-1.5 rounded-lg hover:bg-slate-50 border border-slate-200 transition-colors">◀</button>
            <button onclick="recordsWeekRef=new Date();renderRecords()" class="text-xs font-bold text-slate-400 px-3 py-1.5 rounded-lg hover:bg-slate-50 border border-slate-200 transition-colors">이번 주</button>
            <button onclick="recordsWeekRef.setDate(recordsWeekRef.getDate()+7);renderRecords()" class="text-xs font-black text-pc px-3 py-1.5 rounded-lg hover:bg-slate-50 border border-slate-200 transition-colors">▶</button>`;
        renderRecordsWeek(document.getElementById('records-container'));
    }else{
        navBtns.innerHTML=`
            <button onclick="if(recordsMonth===0){recordsMonth=11;recordsYear--;}else recordsMonth--;renderRecords()" class="text-xs font-black text-pc px-3 py-1.5 rounded-lg hover:bg-slate-50 border border-slate-200 transition-colors">◀</button>
            <button onclick="recordsYear=new Date().getFullYear();recordsMonth=new Date().getMonth();renderRecords()" class="text-xs font-bold text-slate-400 px-3 py-1.5 rounded-lg hover:bg-slate-50 border border-slate-200 transition-colors">이번 달</button>
            <button onclick="if(recordsMonth===11){recordsMonth=0;recordsYear++;}else recordsMonth++;renderRecords()" class="text-xs font-black text-pc px-3 py-1.5 rounded-lg hover:bg-slate-50 border border-slate-200 transition-colors">▶</button>`;
        renderRecordsMonth(document.getElementById('records-container'));
    }
}

function renderTimetable(){
    const container=document.getElementById('timetable-container');
    if(!container) return;
    const t=getTimetableTheme();
    const phase=TIMETABLE_PHASES[currentTimetablePhase] || TIMETABLE_PHASES.phase1;
    const slotStyle=(subject)=> subject ? `background:${t.subjects[subject]};` : '';

    container.innerHTML=`
        <div class="fade-up">
            <div class="tt-phase-tabs">
                ${Object.entries(TIMETABLE_PHASES).map(([key,info])=>`
                    <div onclick="switchTimetablePhase('${key}')" class="tt-phase-tab${currentTimetablePhase===key?' active':''}">
                        ${info.label}
                    </div>
                `).join('')}
            </div>
            <div class="tt-frame" style="
                --tt-title:${t.title};
                --tt-header:${t.header};
                --tt-header-dark:${t.headerDark};
                --tt-grid:${t.grid};
                --tt-ink:${t.ink};
                --tt-hour-bg:${t.hourBg};
                --tt-hour-text:${t.hourText};
                --tt-empty:${t.empty};
            ">
                <div class="flex items-center justify-between mb-4">
                    <div>
                        <div class="text-[13px] font-black tracking-[.2em] uppercase text-slate-400">${phase.label}</div>
                        <div class="text-[24px] font-black text-pc mt-1">${phase.sub}</div>
                    </div>
                </div>
                <div class="tt-body">
                    <div class="tt-table-shell">
                        <table class="tt-table">
                            <thead>
                                <tr>
                                    <th class="tt-corner"></th>
                                    ${TIMETABLE_COLS.map(m=>`<th class="tt-minute">${m}</th>`).join('')}
                                </tr>
                            </thead>
                            <tbody>
                                ${phase.schedule.map(([hour, slots])=>{
                                    if(slots==='LUNCH'){
                                        return `<tr><td class="tt-hour">${hour}</td><td class="tt-merge" colspan="6" style="background:${t.subjects['점심']}; color:${t.title};">점심</td></tr>`;
                                    }
                                    if(slots==='EXERCISE'){
                                        return `<tr><td class="tt-hour">${hour}</td><td class="tt-merge" colspan="6" style="background:${t.subjects['운동']}; color:${t.ink};">운동</td></tr>`;
                                    }
                                    if(slots==='SPLIT'){
                                        return `<tr>
                                            <td class="tt-hour">${hour}</td>
                                            <td class="tt-merge" colspan="3" style="background:${t.subjects['샤워']}; color:${t.ink}; letter-spacing:.12em;">샤워</td>
                                            <td class="tt-merge" colspan="3" style="background:${t.subjects['낮잠']}; color:${t.ink}; letter-spacing:.12em;">낮잠</td>
                                        </tr>`;
                                    }
                                    return `<tr>
                                        <td class="tt-hour">${hour}</td>
                                        ${slots.map(subj=>`<td class="tt-slot" style="${slotStyle(subj)}"></td>`).join('')}
                                    </tr>`;
                                }).join('')}
                            </tbody>
                        </table>
                    </div>
                    <div class="tt-legend">
                        <div class="tt-legend-title">SUBJECT</div>
                        ${phase.legend.map(subj=>`
                            <div class="tt-legend-item">
                                <div class="tt-swatch" style="background:${t.subjects[subj]};"></div>
                                <span class="tt-legend-label">${subj}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        </div>`;
}

/* ═══════════════════════════════════════════════
   MAIN RENDER
═══════════════════════════════════════════════ */
function render(){
    autoScheduleWeek();
    renderDDay();
    if(currentTab==='records') renderRecords();
    else renderPlanner();
}

/* ═══════════════════════════════════════════════
   TAB / VIEW SWITCHING
═══════════════════════════════════════════════ */
function switchTab(tab){
    if(tab==='timer') tab='planner';
    if(tab==='timetable') tab='planner';
    currentTab=tab;
    ['planner','records','progress','calendar'].forEach(t=>{
        const section=document.getElementById(`section-${t}`);
        const button=document.getElementById(`btab-${t}`);
        if(section) section.classList.toggle('hidden',t!==tab);
        if(button) button.classList.toggle('active',t===tab);
    });
    const timerSection=document.getElementById('section-timer');
    if(timerSection) timerSection.classList.add('hidden');
    document.getElementById('planner-view-tabs').classList.toggle('hidden',tab!=='planner');
    document.getElementById('timer-nav-info').classList.add('hidden');
    document.getElementById('records-nav-info').classList.toggle('hidden',tab!=='records');

    if(tab==='records') renderRecords();
    else if(tab==='progress') renderProgress();
    else if(tab==='calendar') renderProgressCalendar();
    else renderPlanner();
}

function switchView(v){currentView=v;renderPlanner();}
function switchRecords(v){currentRecords=v;renderRecords();}
function switchRecordMode(v){currentRecordMode=v;renderRecords();}
function switchTimetablePhase(v){currentTimetablePhase=v;renderTimetable();}

/* ═══════════════════════════════════════════════
   PLANNER ACTIONS
═══════════════════════════════════════════════ */
function goToDay(key){
    selectedDate=key;
    weekRefDate=new Date(key);
    currentView='day';
    loadTimerDay(key);
    switchTab('planner');
}
function updateReview(s,d){reviewCounts[s]=Math.max(0,reviewCounts[s]+d);saveAll();}
function resetReviews(){Object.keys(reviewCounts).forEach(k=>reviewCounts[k]=0);saveAll();showToast('🔄 복습 횟수 초기화');}
function updateWeekMemo(value){ weekMemos[getWeekMemoKey(weekRefDate)] = value; saveAll(); }
function toggleTask(date,idx){
    completedTasks[`${date}-${idx}`]=!completedTasks[`${date}-${idx}`];
    // ★ 플래너 체크 → 타이머 done 동기화 (같은 날짜일 때만)
    if(date===timerDate && timerReady && timerSubjects.length){
        const day=scheduleData.find(d=>d.date===date);
        if(day && day.tasks[idx]){
            const taskSubj=getTaskSubject(day.tasks[idx]);
            if(taskSubj){
                // 해당 과목 전체 태스크 다 완료됐는지 확인
                const subjIndices=day.tasks.map((t,i)=>(getTaskSubject(t)===taskSubj?i:-1)).filter(i=>i>=0);
                const allDone=subjIndices.every(i=>completedTasks[`${date}-${i}`]);
                // 매칭 타이머 과목 done 업데이트
                timerSubjects=timerSubjects.map(s=>{
                    const m=timerSubjMatch(s.n);
                    if(m===taskSubj) return {...s,done:allDone,on:allDone?false:s.on};
                    return s;
                });
                saveTimer();
            }
        }
    }
    saveAll();
}

// ★ 실제 도달 페이지 저장
function setPageActual(key, val){
    if(val===''||val===null){delete pageActuals[key];}
    else{pageActuals[key]=+val;}
    saveAll();
}

// ★ 목표(범위) 시작/끝 페이지 숫자를 직접 수정 — 예: 41~51p → 41~61p로 늘리기
function editTaskPageTarget(idx, field, val){
    const d=scheduleData.find(d=>d.date===selectedDate);
    if(!d || !d.tasks[idx]) return;
    const t=d.tasks[idx];
    const pages=parseTaskPages(t);
    if(!pages) return;
    const num=parseInt(val,10);
    if(isNaN(num) || num<0){ saveAll(); return; } // 잘못된 값이면 원래 값으로 되돌려 다시 그림
    let start=pages.start, end=pages.end;
    if(field==='start') start=num; else end=num;
    if(end<start){ if(field==='start') end=start; else start=end; } // 역전 방지
    d.tasks[idx]=t.replace(/(\d+)~(\d+)\s*(p|회|강)/, `${start}~${end}$3`);
    saveAll();
}
function addTask(){
    const inp=document.getElementById('new-task-input');
    if(!inp.value.trim())return;
    let d=scheduleData.find(d=>d.date===selectedDate);
    if(!d){d={date:selectedDate,tasks:[]};scheduleData.push(d);}
    d.tasks.push(inp.value.trim());
    inp.value='';
    saveAll();
    if(!timerInterval && timerDate===selectedDate){
        timerReady=false;
        loadTimerDay(selectedDate);
        refreshEmbeddedDayView();
    }
}
function deleteTask(idx){
    const d=scheduleData.find(d=>d.date===selectedDate);if(!d)return;
    d.tasks.splice(idx,1);
    const newC={};
    Object.entries(completedTasks).forEach(([k,v])=>{
        if(!k.startsWith(selectedDate+'-')){newC[k]=v;}
        else{const ti=parseInt(k.split('-').pop());if(ti<idx)newC[k]=v;else if(ti>idx)newC[`${selectedDate}-${ti-1}`]=v;}
    });
    completedTasks=newC;
    saveAll();
    if(!timerInterval && timerDate===selectedDate){
        timerReady=false;
        loadTimerDay(selectedDate);
        refreshEmbeddedDayView();
    }
}

/* ═══════════════════════════════════════════════
   SAVE ALL (planner)
═══════════════════════════════════════════════ */
function saveAll(){
    localStorage.setItem('young_study_v4',   JSON.stringify(scheduleData));
    localStorage.setItem('young_completed',  JSON.stringify(completedTasks));
    localStorage.setItem('young_reviews',    JSON.stringify(reviewCounts));
    localStorage.setItem('young_study_times',JSON.stringify(studyTimes));
    localStorage.setItem('young_page_actuals',JSON.stringify(pageActuals)); // ★
    localStorage.setItem('young_week_memos', JSON.stringify(weekMemos));
    if(currentTab==='planner') renderPlanner();
    showToast('✓ 저장됨');
}

function saveMockScores(){
    localStorage.setItem('young_mock_scores', JSON.stringify(mockScores));
    if(currentTab==='records') renderRecords();
    showToast('✓ 모의고사 기록 저장');
}

/* ═══════════════════════════════════════════════
   BULK MODAL
═══════════════════════════════════════════════ */
function openBulkModal() { document.getElementById('bulk-modal').style.display='flex'; }
function closeBulkModal(){ document.getElementById('bulk-modal').style.display='none'; }
function processBulkInput(){
    const raw=document.getElementById('bulk-input').value;
    const ns=[...scheduleData];let cur=null;
    raw.split('\n').forEach(line=>{
        const dm=line.trim().match(/^(\d{2})\/(\d{2})/);
        if(dm){const ds=`2026-${dm[1]}-${dm[2]}`;cur=ns.find(s=>s.date===ds);if(!cur){cur={date:ds,tasks:[]};ns.push(cur);}else cur.tasks=[];}
        else if(line.trim().startsWith('-')&&cur){const t=line.trim().replace(/^-\s*/,'');if(t)cur.tasks.push(t);}
    });
    scheduleData=ns;saveAll();closeBulkModal();showToast('✓ 일정 저장됨');
    // 타이머가 돌아가지 않는 경우에만 타이머 데이터 리로드
    if(!timerInterval){ timerReady=false; loadTimerDay(timerDate); }
}
function exportData(){
    const data={scheduleData,completedTasks,reviewCounts,studyTimes,pageActuals};
    const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([JSON.stringify(data,null,2)],{type:'application/json'}));a.download=`young_planner_${TODAY}.json`;a.click();URL.revokeObjectURL(a.href);
    showToast('📤 내보내기 완료');
}
function importData(e){
    const reader=new FileReader();
    reader.onload=ev=>{
        try{
            const d=JSON.parse(ev.target.result);
            if(d.scheduleData)scheduleData=d.scheduleData;
            if(d.completedTasks)completedTasks=d.completedTasks;
            if(d.reviewCounts)reviewCounts=d.reviewCounts;
            if(d.studyTimes)studyTimes=d.studyTimes;
            if(d.pageActuals)pageActuals=d.pageActuals; // ★
            saveAll();showToast('📥 불러오기 완료');
        }catch{showToast('❌ 파일 오류');}
    };
    reader.readAsText(e.target.files[0]);e.target.value='';
}

/* VISUAL OVERRIDES */
function getTaskSummaryForDate(dateStr){
    const day=scheduleData.find(d=>d.date===dateStr)||{tasks:[]};
    const total=day.tasks.length;
    const completion=day.tasks.reduce((acc,task,idx)=>acc+getTaskCompletion(dateStr,idx,task),0);
    return {
        day,
        total,
        completed: Math.floor(completion),
        ratio: total ? Math.round((completion/total)*100) : 0
    };
}

function getWeekTotalSecs(refDate){
    const start=weekStart(refDate);
    let total=0;
    for(let i=0;i<7;i++){
        const d=new Date(start);
        d.setDate(start.getDate()+i);
        total+=getTotalTrackerSecs(toKey(d));
    }
    return total;
}

function getMonthTotalSecs(refDate){
    const monthDates=getDatesInMonth(refDate.getFullYear(),refDate.getMonth());
    return monthDates.reduce((acc,ds)=>acc+getTotalTrackerSecs(ds),0);
}

function renderPlannerHero(){
    const hero=document.getElementById('planner-hero');
    if(!hero) return;

    const focusDate=currentView==='day' ? selectedDate : TODAY;
    const focusDateObj=new Date(`${focusDate}T00:00:00`);
    const summary=getTaskSummaryForDate(focusDate);
    const focusSecs=getTotalTrackerSecs(focusDate);
    const weekSecs=getWeekTotalSecs(currentView==='week' ? weekRefDate : focusDateObj);
    const monthRef=currentView==='month' ? viewDate : focusDateObj;
    const monthSecs=getMonthTotalSecs(monthRef);
    const schedule=getSched(focusDate);
    const phase=schedule?.phase || 'Custom plan';
    const targetText=schedule?.tot ? `${schedule.tot} min target` : 'Flexible day';
    const viewLabel={month:'MONTH SNAPSHOT',week:'WEEKLY FOCUS',day:'DAILY FOCUS'}[currentView] || 'STUDY SNAPSHOT';

    hero.innerHTML=`
        <div class="hero-panel">
            <div class="grid lg:grid-cols-[1.35fr,1fr] gap-4 items-stretch">
                <div class="rounded-[28px] p-6 md:p-7 text-white" style="background:linear-gradient(135deg, rgba(var(--pc-solid-rgb),0.96) 0%, rgba(var(--pc-solid-rgb),0.78) 58%, rgba(15,23,42,0.88) 100%); box-shadow:0 26px 60px rgba(var(--pc-solid-rgb),0.22);">
                    <div class="section-kicker text-white/75">${viewLabel}</div>
                    <div class="mt-2 flex flex-wrap items-end gap-x-4 gap-y-2">
                        <h2 class="text-3xl md:text-4xl font-black tracking-tight">Planner Highlight</h2>
                        <span class="px-3 py-1 rounded-full text-[11px] font-black tracking-[0.22em] bg-white/15 text-white/85">${focusDate}</span>
                    </div>
                    <p class="mt-4 text-sm md:text-[15px] leading-6 text-white/80">${phase}</p>
                    <div class="mt-5 flex flex-wrap gap-3 text-[12px] font-bold">
                        <div class="px-3 py-2 rounded-2xl bg-white/12 border border-white/10">Today done <span class="text-white text-base ml-1">${summary.ratio}%</span></div>
                        <div class="px-3 py-2 rounded-2xl bg-white/12 border border-white/10">Tasks <span class="text-white text-base ml-1">${summary.total}</span></div>
                        <div class="px-3 py-2 rounded-2xl bg-white/12 border border-white/10">${targetText}</div>
                    </div>
                </div>
                <div class="grid grid-cols-2 gap-3">
                    <div class="metric-card">
                        <div class="metric-eyebrow">TODAY</div>
                        <div class="metric-value">${fmtHHMM(focusSecs)}</div>
                        <div class="metric-sub">tracked study time</div>
                    </div>
                    <div class="metric-card">
                        <div class="metric-eyebrow">THIS WEEK</div>
                        <div class="metric-value">${fmtHHMMSS(weekSecs)}</div>
                        <div class="metric-sub">weekly accumulation</div>
                    </div>
                    <div class="metric-card">
                        <div class="metric-eyebrow">THIS MONTH</div>
                        <div class="metric-value">${fmtHHMMSS(monthSecs)}</div>
                        <div class="metric-sub">monthly stack</div>
                    </div>
                    <div class="metric-card">
                        <div class="metric-eyebrow">COMPLETION</div>
                        <div class="metric-value">${summary.completed}<span class="text-lg text-slate-400">/${summary.total}</span></div>
                        <div class="metric-sub">finished task count</div>
                    </div>
                </div>
            </div>
        </div>`;
}

/* ═══════════════════════════════════════════════
   INIT
═══════════════════════════════════════════════ */
renderMonth=function(container){
    const year=viewDate.getFullYear(),month=viewDate.getMonth();
    const first=new Date(year,month,1).getDay();
    const offset=first===0?6:first-1;
    const days=new Date(year,month+1,0).getDate();
    const dayLabels=['월','화','수','목','금','토','일'];
    const monthSecs=getMonthTotalSecs(viewDate);
    const MONTH_GOAL_HOURS=200;
    const monthGoalPct=Math.round(monthSecs/(MONTH_GOAL_HOURS*3600)*100);

   let html=`<div class="nav-box mb-5">
    <div class="nav-box-inner">
        <button onclick="viewDate.setMonth(viewDate.getMonth()-1);render()" class="nav-box-btn">◀ 이전 달</button>

        <div class="nav-box-center">
            <div class="nav-box-title">${getThemeAccent()} ${year}.${String(month+1).padStart(2,'0')}</div>
            <div class="nav-box-sub">누적 공부시간 <span class="nav-box-time">${fmtHHMMSS(monthSecs)}</span> / ${MONTH_GOAL_HOURS}H (${monthGoalPct}%)</div>
        </div>

        <div class="flex flex-col sm:flex-row gap-2">
            <button onclick="toggleMonthTaskVisibility(event)" class="month-toggle-btn">${monthShowAllTasks?'태스크 숨기기':'전체 태스크 보기'}</button>
            <button onclick="viewDate.setMonth(viewDate.getMonth()+1);render()" class="nav-box-btn">다음 달 ▶</button>
        </div>
    </div>
</div>
<div id="month-calendar-capture" style="background:#fff;padding:12px;">
<div class="text-center font-black mb-3" style="color:var(--pc);font-size:18px;">${getThemeAccent()} ${year}.${String(month+1).padStart(2,'0')}</div>`;

    html+=`<div class="grid grid-cols-7 mb-1">`;
    dayLabels.forEach((d,i)=>{html+=`<div class="text-center font-black py-1.5 ${i===6?'text-red-400':'text-slate-400'}">${d}</div>`;});
    html+=`</div>`;
    html+=`<div class="cal-grid">`;

    for(let i=0;i<offset;i++) html+=`<div class="cal-cell"></div>`;
    for(let d=1;d<=days;d++){
        const key=`${year}-${String(month+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
        const dow=new Date(year,month,d).getDay();
        const isToday=key===TODAY;
        const isOff=restDays.includes(key);
        const pct=getDayAchievement(key);
        const timeSec=getTotalTrackerSecs(key);
        const dayData=scheduleData.find(s=>s.date===key)||{tasks:[]};
        const progressPct=pct!==null?Math.round(pct*100):0;
        const hourLevel=Math.min(6, Math.floor((timeSec/3600)/2));
        const cellBg=hourLevel>0?pcAlpha(0.08 + hourLevel*0.11):'#ffffff';
        // 계획도 공부시간도 없는 완전 휴식일 — 셀에 채울 내용이 "Day off" 뿐이므로 글자를 크게
        const isBareOff = isOff && timeSec<=0 && dayData.tasks.length===0;
        const taskList = monthShowAllTasks
            ? `<div class="cal-cell-tasks">${dayData.tasks.length
                ? dayData.tasks.map((t,idx)=>{
                    const isDone=getTaskCompletion(key,idx,t)>=1;
                    const sub=t.match(/\[(.*?)\]/)?.[1]||'';
                    const txt=t.replace(/^\[.*?\]\s*/,'');
                    return `<div class="task-line ${isDone?'opacity-35 line-through':''}"><span class="subj" style="color:${sub?getSubjTextColor(sub):'var(--pc)'}">${sub?`[${sub}] `:''}</span>${txt||t}</div>`;
                }).join('')
                : '<div class="task-line text-slate-300 italic">일정 없음</div>'}</div>`
            : '';
        html+=`<div class="cal-cell${isToday?' is-today':''}${monthShowAllTasks?' cal-cell-expanded':''}" style="background:${cellBg};" onclick="goToDay('${key}')">
            <div class="cal-cell-summary">
                <span class="block text-[20px] leading-none font-black ${isToday?'text-pc':dow===0?'text-red-400':'text-slate-500'}">${d}</span>
                ${isOff?`<span class="block ${isBareOff?'mt-3 text-[16px]':'mt-1 text-[9px]'} leading-none font-black tracking-wide" style="color:#94a3b8;">Day off</span>`:''}
                ${(!isOff || timeSec>0) ? `
                <span class="block mt-3 text-[15px] leading-none font-black ${timeSec>0?'text-pc':'text-slate-300'}">${timeSec>0?fmtHHMM(timeSec):'00:00'}</span>
                <span class="text-[18px] font-black ${progressPct>0?'text-pc':'text-slate-300'}">${progressPct}%</span>` : ''}
            </div>${taskList}
        </div>`;
    }
    html+=`</div></div>`;
    container.innerHTML=html;
};

renderWeek=function(container){
    const start=weekStart(weekRefDate);
    const dayNames=['월','화','수','목','금','토','일'];
    const memoKey=getWeekMemoKey(weekRefDate);
    const memoValue=weekMemos[memoKey]||'';
    let weekH=0;
    for(let i=0;i<7;i++){
        const d=new Date(start);
        d.setDate(start.getDate()+i);
        weekH+=getTotalTrackerSecs(toKey(d));
    }

    const renderWeekSlot=(i)=>{
        const d=new Date(start);
        d.setDate(start.getDate()+i);
        const key=toKey(d);
        const dayData=scheduleData.find(s=>s.date===key)||{tasks:[]};
        const isToday=key===TODAY;
        const pct=getDayAchievement(key);
        const isWeekend=i>=4;
        const slotBg=pct!==null && !isToday ? `background:${pcAlpha(0.05 + pct*0.22)};` : '';
        const trackedText=getTotalTrackerSecs(key) ? fmtHHMM(getTotalTrackerSecs(key)) : '-';

        return `<div class="week-slot${isToday ? ' is-today' : ''}" style="${slotBg}" onclick="goToDay('${key}')">
            <div class="week-slot-head">
                <div class="week-slot-head-main">
                    <span class="text-[20px] font-black ${i===6 ? 'text-red-500' : 'text-pc'}">${dayNames[i]}</span>
                    <span class="text-[20px] font-bold text-slate-400">${key.slice(5)}</span>
                </div>
                <span class="text-[18px] font-black text-pc">${trackedText}</span>
            </div>
            <div class="week-slot-body space-y-1.5">
                ${dayData.tasks.length>0
                    ? dayData.tasks.map((t,idx)=>{
                        const isDone=getTaskCompletion(key,idx,t)>=1;
                        const sub=t.match(/\[(.*?)\]/)?.[1]||'';
                        const txt=t.replace(/^\[.*?\]\s*/,'');
                        const disp=`${sub ? `[${sub}] ` : ''}${txt}`;
                        return `<div class="leading-snug break-words ${isDone ? 'opacity-30 line-through' : ''}" style="font-size:${isWeekend?18:18}px;color:#0f172a;">• ${disp}</div>`;
                    }).join('')
                    : '<div class="text-xs text-slate-300 italic">일정 없음</div>'}
            </div>
        </div>`;
    };

    const renderWeekMemoSlot=()=>`<div class="week-slot week-slot-memo">
        <div class="week-slot-head">
            <span class="text-base font-bold text-slate-400">이번 주</span>
            <span class="text-base font-black text-slate-500">메모</span>
        </div>
        <textarea onchange="updateWeekMemo(this.value)" placeholder="이번 주 메모를 적어두세요"
            class="week-memo-textarea w-full bg-white/80 border border-slate-200 rounded-xl px-3 py-2 text-[15px] leading-relaxed text-slate-700 font-medium outline-none resize-none focus:border-pc">${memoValue}</textarea>
    </div>`;

    const WEEK_GOAL_HOURS=50;
    const weekGoalPct=Math.round(weekH/(WEEK_GOAL_HOURS*3600)*100);

    let html=`<div class="nav-box mb-5">
    <div class="nav-box-inner">
        <button onclick="weekRefDate.setDate(weekRefDate.getDate()-7);render()" class="nav-box-btn">◀ 이전 주</button>

        <div class="nav-box-center">
            <div class="nav-box-title">${getThemeAccent()} 주간 플래너</div>
            <div class="nav-box-sub">이번 주 합계 <span class="nav-box-time">${fmtHHMMSS(weekH)}</span> / ${WEEK_GOAL_HOURS}H (${weekGoalPct}%)</div>
        </div>

        <div class="flex flex-col sm:flex-row gap-2">
            <button onclick="weekRefDate.setDate(weekRefDate.getDate()+7);render()" class="nav-box-btn">다음 주 ▶</button>
        </div>
    </div>
    </div>
    <div id="week-planner-capture" style="background:#fff;padding:12px;">
    <div class="text-center font-black mb-3" style="color:var(--pc);font-size:18px;">${getThemeAccent()} 주간 플래너</div>
    <div class="week-grid">
        <div class="week-row">${[0,1,2].map(renderWeekSlot).join('')}</div>
        <div class="week-row">${[3,4,5].map(renderWeekSlot).join('')}</div>
        <div class="week-row week-row-bottom">${renderWeekSlot(6)}${renderWeekMemoSlot()}</div>
    </div>
    </div>`;
    container.innerHTML=html;
};

renderDay=function(container){
    const day=scheduleData.find(d=>d.date===selectedDate)||{date:selectedDate,tasks:[]};
    const dayNames=['일','월','화','수','목','금','토'];
    const dow=new Date(selectedDate+'T00:00:00').getDay();
    const done=day.tasks.filter((_,idx)=>completedTasks[`${day.date}-${idx}`]).length;
    const tracked=getTotalTrackerSecs(selectedDate);
    if(timerDate!==selectedDate) loadTimerDay(selectedDate);
    const prevDate=toKey(new Date(new Date(selectedDate+'T00:00:00').getTime()-86400000));
    const nextDate=toKey(new Date(new Date(selectedDate+'T00:00:00').getTime()+86400000));
    const isViewingToday = selectedDate===TODAY;
    const isRestToday = restDays.includes(selectedDate); // "오늘"이 아니라 지금 보고 있는 날짜 기준
    const viewingDayCondition = getConditionForDate(selectedDate);
    const dayLabelForCard = isViewingToday ? '오늘' : `${selectedDate.slice(5).replace('-','/')}(${dayNames[dow]})`;
    const conditionCardHtml = `<div class="card p-4 mb-4">
        <h3 class="text-[14px] font-black text-slate-500 mb-2">${dayLabelForCard} 컨디션 — 이 날 목표 추천이 이만큼 바뀌어요</h3>
        <div class="grid grid-cols-3 gap-2 mb-2">
            ${[['상','🔥'],['중','⛅'],['하','🌧️']].map(([lv,emoji])=>`
                <button onclick="setTodayCondition('${lv}','${selectedDate}')" class="py-2 rounded-xl text-[13px] font-black transition-all"
                    style="${viewingDayCondition===lv?`background:var(--pc-solid);color:#fff;`:`background:#f8fafc;color:#94a3b8;border:1px solid #eef2f6;`}">${emoji} ${lv}</button>
            `).join('')}
        </div>
        ${isRestToday
            ? `<div class="flex items-center justify-between gap-2 rounded-xl px-3 py-2.5" style="background:#f8fafc;">
                    <span class="text-[12px] font-bold text-slate-400">😴 ${isViewingToday?'오늘은':'이 날은'} 쉬는 날이에요 — 추천 목표엔 이미 반영돼 있어요</span>
                    <button onclick="toggleTodayRestDay('${selectedDate}')" class="text-[11px] font-black px-3 py-1.5 rounded-full bg-white border border-slate-200 text-slate-500 shrink-0">쉬는 날 취소</button>
               </div>`
            : `<button onclick="toggleTodayRestDay('${selectedDate}')" class="w-full text-[12px] font-bold py-2 rounded-xl text-slate-400" style="background:#f8fafc;border:1px solid #eef2f6;">🛌 ${isViewingToday?'오늘 하루':'이 날'} 쉬기로 표시</button>`
        }
    </div>`;

  let html=`${conditionCardHtml}<div class="nav-box mb-5">
    <div class="nav-box-inner">
        <button onclick="goToDay('${prevDate}')" class="nav-box-btn">◀ 전날</button>

        <div class="nav-box-center">
            <div class="nav-box-title">${getThemeAccent()} ${selectedDate} <span class="text-[22px] font-bold text-slate-400">${dayNames[dow]}</span></div>
        <div class="nav-box-sub">오늘 공부 시간 <span id="day-tracked-display" class="nav-box-time">${fmtHHMMSS(tracked)}</span></div>
        </div>

        <div class="flex flex-col sm:flex-row gap-2">
            <button onclick="goToDay('${nextDate}')" class="nav-box-btn">다음날 ▶</button>
        </div>
    </div>
</div>
<div id="day-planner-capture" style="background:#fff;padding:12px;">
<div class="text-center font-black mb-3" style="color:var(--pc);font-size:18px;">${getThemeAccent()} ${selectedDate} (${dayNames[dow]})</div>
<div class="day-main-grid">
    <div class="space-y-4">
        <div class="card day-task-card">
            <div class="flex gap-3 mb-4">
                <input id="new-task-input" type="text" placeholder="[과목] 할 일을 입력"
                    class="flex-1 bg-slate-50 border-2 border-slate-100 rounded-2xl px-5 py-3 outline-none focus:border-pc font-semibold text-2xl transition-colors"
                    onkeydown="if(event.key==='Enter')addTask()">
                <button onclick="addTask()" class="bg-pc text-white px-6 rounded-2xl font-black hover:opacity-80 transition-all text-base">추가</button>
            </div>
            <div>`;

    if(day.tasks.length===0){
        html+=`<div class="text-center py-16">
            <p class="text-slate-300 font-black text-lg italic uppercase tracking-widest">No Plans Yet</p>
        </div>`;
    }

    // 과목별로 묶어서 표시 (국어 → 영어 → 행정학 → 행정법 → 기타 순)
    const dayGroupsMap={};
    const dayGroupOrderSeen=[];
    day.tasks.forEach((t,idx)=>{
        const isDone=completedTasks[`${day.date}-${idx}`];
        const sub=getTaskSubject(t);
        const txt=t.replace(/^\[.*?\]\s*/,'');
        const pages=parseTaskPages(t);
        const actualKey=`${day.date}-${idx}`;
        const actualVal=pageActuals[actualKey]??'';
        const completion=getTaskCompletion(day.date,idx,t);
        const pct=Math.round(completion*100);
        const subjectColor=sub ? getSubjColor(sub) : null;
        const subjectTextColor=sub ? getSubjTextColor(sub) : null;
        const matchedProgressItem = findMatchingProgressItem(sub, txt);
        let suggestionHtml='';
        if(matchedProgressItem){
            const prog=computeItemProgress(matchedProgressItem, selectedDate);
            const suggestColor = subjectTextColor ? hexToRgba(subjectTextColor,.55) : '#94a3b8';
            const dayWord = isViewingToday ? '오늘' : '이 날';
            if(prog.remaining<=0){
                suggestionHtml='';
            } else if(isRestToday){
                suggestionHtml=`<div class="text-[11px] font-medium mt-0.5" style="color:${suggestColor}">😴 ${dayWord}은 쉬는 날이에요</div>`;
            } else if(prog.isRestDayToday===true){
                suggestionHtml=`<div class="text-[11px] font-medium mt-0.5" style="color:${suggestColor}">😴 ${dayWord}은 쉬는 과목이에요</div>`;
            } else if(prog.todayTarget!==null){
                const minutesLabel = prog.todayMinutes!==null ? ` · ≈${prog.todayMinutes}분` : '';
                suggestionHtml=`<div class="text-[11px] font-medium mt-0.5" style="color:${suggestColor}">💡 추천 ${dayWord} 목표 ${prog.todayTarget}${matchedProgressItem.unit} · 한 것 ${prog.todayDone}${matchedProgressItem.unit}${minutesLabel}</div>`;
            }
        }
        const checkPctUI=!pages
            ? `<span class="day-task-page-meta">
                <span class="day-task-meta day-task-placeholder">목표 999p /</span>
                <span class="day-task-actual day-task-placeholder">999</span>
                <span class="day-task-percent">${isDone?100:0}%</span>
            </span>`
            : '';
        const pgUI=pages
            ? `<span class="day-task-page-meta"><span class="day-task-meta">목표
                <input type="number" value="${pages.start}" title="목표 시작"
                    onchange="editTaskPageTarget(${idx},'start',this.value)"
                    class="day-task-goal">~<input type="number" value="${pages.end}" title="목표 끝"
                    onchange="editTaskPageTarget(${idx},'end',this.value)"
                    class="day-task-goal">${pages.unit} /</span>
                <input type="number" value="${actualVal}" placeholder="실제"
                    onchange="setPageActual('${actualKey}',this.value)"
                    class="day-task-actual">
                <span class="day-task-percent">${pct}%</span></span>`
            : '';
        const rowHtml=`<div class="day-task-row day-task-row-grouped ${isDone?'is-done':''}">
            ${!pages?`<input type="checkbox" ${isDone?'checked':''} onchange="toggleTask('${day.date}',${idx})" class="w-5 h-5 cursor-pointer shrink-0" style="accent-color:var(--pc)">`
                    :`<div class="w-5 h-5 shrink-0 flex items-center justify-center rounded-full text-[9px] font-black" style="background:${subjectColor?hexToRgba(subjectColor,.14):pcAlpha(0.12)};color:${subjectTextColor||'var(--pc)'}">${pct>0?pct+'%':'?'}</div>`}
            <div class="min-w-0">
                <span class="day-task-title ${isDone?'line-through text-slate-400':'text-slate-700'}">${txt||t}</span>
                ${suggestionHtml}
            </div>
            <div class="day-task-controls">
                ${checkPctUI}
                ${pgUI}
            </div>
            <button onclick="deleteTask(${idx})" class="day-task-delete hover:text-red-400 px-2 py-1 rounded transition-colors shrink-0">삭제</button>
        </div>`;

        const groupKey=sub||'기타';
        if(!dayGroupsMap[groupKey]){ dayGroupsMap[groupKey]={rows:[],pcts:[]}; dayGroupOrderSeen.push(groupKey); }
        dayGroupsMap[groupKey].rows.push(rowHtml);
        dayGroupsMap[groupKey].pcts.push(pct);
    });

    const dayGroupKeys=dayGroupOrderSeen.slice().sort((a,b)=>getProgressSubjectRank(a)-getProgressSubjectRank(b));
    dayGroupKeys.forEach(groupKey=>{
        const g=dayGroupsMap[groupKey];
        const avgPct = g.pcts.length ? Math.round(g.pcts.reduce((a,b)=>a+b,0)/g.pcts.length) : 0;
        const timerIdx=timerSubjects.findIndex(s=>timerSubjMatch(s.n)===groupKey || s.n===groupKey);
        const timerItem=timerIdx>=0 ? timerSubjects[timerIdx] : null;
        const subjectDone=getSubjectCompletionState(day.date, groupKey, timerItem?.done||false);
        const subjectColor=getSubjColor(groupKey);
        const subjectTextColor=getSubjTextColor(groupKey);
        const timerBtn=timerItem
            ? (!subjectDone
                ? `<button onclick="toggleTimerStart(${timerIdx})" class="day-task-btn transition-colors" style="background:${timerItem.on&&subjectColor?hexToRgba(subjectColor,.14):'#f1f5f9'};color:${timerItem.on&&subjectTextColor?subjectTextColor:'#64748b'}">${timerItem.on?'정지':'측정'}</button>`
                : `<span class="day-task-btn" style="${subjectColor?getSubjBadgeStyle(groupKey,false):`background:${pcAlpha(.10)};color:var(--pc)`}">완료</span>`)
            : '';
        const editBtn=`<button onclick="openTimeEditModal(${timerIdx})" class="day-subject-edit-btn"${timerIdx<0?' disabled':''}>⏱ 시간 수정</button>`;
        html+=`<div class="day-subject-group">
            <div class="day-subject-header">
                <span class="day-subject-name" style="${subjectColor?getSubjBadgeStyle(groupKey,true):`background:${pcAlpha(.12)};color:var(--pc)`}">${groupKey}</span>
                <span id="day-timer-clock-${timerIdx}" class="day-subject-time" style="color:${subjectTextColor||'var(--pc)'}">${fmtHHMMSS(timerItem?.spent||0)}</span>
                ${timerBtn}
                ${editBtn}
                <span class="day-subject-pct" style="color:${subjectTextColor||'var(--pc)'}">${avgPct}%</span>
            </div>
            <div class="day-subject-tasks">
                ${g.rows.join('')}
            </div>
        </div>`;
    });
    html+=`</div></div></div>
    <div class="space-y-4">
        <div class="card timeline-focus-card">
            <div class="section-kicker">오늘의 공부 타임라인</div>
            <h3 class="panel-title mt-2">오늘의 공부 흐름</h3>

            <div id="timeline-chart" data-mode="day" class="mt-6"></div>
        </div>
    </div>
</div>
</div>`;
    container.innerHTML=html;
    setTimeout(()=>{ renderTimeline(); },0);
};

renderPlanner=function(){
    renderDDay();
    calculateProgress();
    renderReviewCounter();
    renderStudyTimeDisplay();

    ['month','week','day'].forEach(v=>{
        const el=document.getElementById(`vtab-${v}`);
        if(el) el.className='view-tab'+(currentView===v?' active':'');
    });

    const c=document.getElementById('planner-container');
    c.innerHTML='';
    if(currentView==='month') renderMonth(c);
    else if(currentView==='week') renderWeek(c);
    else renderDay(c);
};

// Apply stored theme (including old theme names)
const _themeMap={
    'theme-blue':'clearsky','theme-green':'mojito','theme-purple':'dreamviolet','theme-orange':'summervibes',
    'marine':'mojito','navy':'clearsky','orange':'summervibes','teal':'clearsky','rose':'dreamysurf','gold':'morningdew','mint':'mintmojito','green':'mojito','blossom':'dreamysurf',
    'red':'watermelon','sky':'clearsky','blue':'clearsky','purple':'dreamviolet','pink':'dreamysurf','yeondu':'mojito','gray':'clearsky'
};
const _rawTheme=localStorage.getItem('young_theme')||'mintmojito';
currentTheme=THEMES[_rawTheme]?_rawTheme:(_themeMap[_rawTheme]||'mintmojito');

setTheme(currentTheme);  // applies CSS vars
cleanupDemoFlowData();
cleanupMarchPlannerData();
cleanupStaleAutoPlacedTasks();
ensureRecoveredTodayStudy();

// Init timer date input
document.getElementById('timer-date-input').value=TODAY;
document.getElementById('timer-date-input').addEventListener('change',e=>loadTimerDay(e.target.value));

// Initial render
selectedDate = TODAY;
viewDate = new Date(`${TODAY}T00:00:00`);
weekRefDate = new Date(`${TODAY}T00:00:00`);
autoScheduleWeek(); // 요일 미지정 + 주 N일 항목을 이번 주 플래너에 자동 배치
switchTab('planner');
loadTimerDay(TODAY);

function playBeep() {
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.frequency.value = 880;
    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 1);
}

