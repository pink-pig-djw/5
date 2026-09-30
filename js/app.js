
'use strict';
const ICONS={archive:'<path d="M4 5h6v14H4zM14 5h6v14h-6z"/><path d="m12 2 1 3-1 3-1-3z"/>',grid:'<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',layers:'<path d="m12 3 9 5-9 5-9-5 9-5zM3 12l9 5 9-5M3 16l9 5 9-5"/>',search:'<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/>',plus:'<path d="M12 5v14M5 12h14"/>',close:'<path d="m6 6 12 12M18 6 6 18"/>',download:'<path d="M12 3v12m-5-5 5 5 5-5M4 16v4h16v-4"/>',upload:'<path d="M12 16V4m-5 5 5-5 5 5M4 16v4h16v-4"/>',edit:'<path d="m15 4 5 5M4 15 15 4a2 2 0 0 1 5 5L9 20l-6 1 1-6z"/>',trash:'<path d="M3 6h18M8 6V3h8v3M5 6l1 15h12l1-15M10 10v7M14 10v7"/>',star:'<path d="m12 3 2.8 5.8 6.4.9-4.6 4.5 1.1 6.4L12 17.6l-5.7 3 1.1-6.4-4.6-4.5 6.4-.9z"/>',check:'<path d="m5 12 4 4L19 6"/>',image:'<rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="8" cy="8" r="1.5"/><path d="m3 17 5-5 4 4 4-6 5 7"/>',menu:'<path d="M4 6h16M4 12h16M4 18h16"/>','chevron-left':'<path d="m15 5-7 7 7 7"/>','chevron-right':'<path d="m9 5 7 7-7 7"/>','arrow-up':'<path d="M12 19V5m-6 6 6-6 6 6"/>',sort:'<path d="M7 4v16m0 0-3-3m3 3 3-3M17 20V4m0 0-3 3m3-3 3 3"/>',external:'<path d="M14 4h6v6M20 4 10 14M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/>',zoom:'<circle cx="11" cy="11" r="6.5"/><path d="m16 16 5 5M11 8.5v5M8.5 11h5"/>',ok:'<circle cx="12" cy="12" r="9"/><path d="m8 12.5 3 3 5-6"/>',palette:'<path d="M12 3a9 9 0 1 0 0 18c1.3 0 2-.9 2-1.9 0-.6-.3-1-.6-1.4-.3-.4-.4-.8-.4-1.2 0-1 .8-1.8 1.8-1.8H17a4 4 0 0 0 4-4c0-4.5-4-7.7-9-7.7z"/><circle cx="7.5" cy="11.2" r="1" fill="currentColor"/><circle cx="10.2" cy="7.2" r="1" fill="currentColor"/><circle cx="14.8" cy="7.2" r="1" fill="currentColor"/>'};
const $=id=>document.getElementById(id),icon=name=>'<svg class="icon" viewBox="0 0 24 24" aria-hidden="true">'+(ICONS[name]||ICONS.archive)+'</svg>';
document.querySelectorAll('[data-icon]').forEach(el=>el.innerHTML=icon(el.dataset.icon));
const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const SEED_ART=EIDOLON_DATA.assetData;
const KEY='eizou.character.archive.v1', PREF='eizou.character.preferences.v1',SEED=EIDOLON_DATA.seedData.map(c=>({...c,image:c.image||SEED_ART[c.imageAsset]||c.imageUrl,fullImage:c.fullImage||SEED_ART[c.fullImageAsset]||c.fullImageUrl||c.image||SEED_ART[c.imageAsset]||c.imageUrl})), ROLES=['主角','配角','反派','路人','其他'];
const CATALOG_VERSION=3, BASELINE=new Map(EIDOLON_DATA.catalogBaseline.map(c=>[c.id,c]));
const IMAGE_BASELINE=new Map(EIDOLON_DATA.catalogImageBaseline.map(c=>[c.id,{...c,image:c.image||SEED_ART[c.imageAsset]||c.imageUrl,fullImage:c.fullImage||SEED_ART[c.fullImageAsset]||c.fullImageUrl||c.image||SEED_ART[c.imageAsset]||c.imageUrl}]));
const WORK_ALIASES={'少女终末旅行':['终末少女的旅行','终末少女旅行',"Girls Last Tour"],'来自深渊':['Made in Abyss'],'心理测量者':['PSYCHO-PASS'],'来自新世界':['Shinsekai Yori'],'寒蝉鸣泣之时':['Higurashi'],'未来日记':['Mirai Nikki'],'声之形':['A Silent Voice'],'穿越时空的少女':['The Girl Who Leapt Through Time'],'莉可丽丝':['Lycoris Recoil'],'章鱼噼的原罪':['Takopi'],'命运石之门':['Steins;Gate','Steins Gate','石头门','SG'],'孤独摇滚':['Bocchi the Rock','ぼっち・ざ・ろっく','波奇'],'败犬女主太多了！':['败犬女主太多了','Makeine','Make Heroine ga Oosugiru'],'轻音少女':['K-ON','KON','けいおん'],'恶魔人':['Devilman','DEVILMAN crybaby'],'恶魔人 crybaby':['恶魔人','Devilman','DEVILMAN crybaby'],'Angel Beats!':['angelbeat','Angel Beats','天使的心跳'],'葬送的芙莉莲':['Frieren','Sousou no Frieren'],'进击的巨人':['Attack on Titan','Shingeki no Kyojin'],'魔法禁书目录':['とある魔術の禁書目録','A Certain Magical Index','Toaru Majutsu no Index','魔禁'],'紫罗兰永恒花园':['紫罗兰的永恒花园','ヴァイオレット・エヴァーガーデン','Violet Evergarden','京紫'],'吹响吧！上低音号':['吹响吧上低音号','吹响吧 上低音号','響け！ユーフォニアム','Hibike Euphonium','Sound Euphonium','京吹','莉兹与青鸟'],'青春猪头少年系列':['青春猪头少年','青春笨蛋少年','青春ブタ野郎','Rascal Does Not Dream','Bunny Girl Senpai','青猪']};
const DEFAULT_TAGS=['温柔','冷静','坚强','理性','乐观','内向','傲娇','天然呆','腹黑','勇敢','善良','敏锐','执着','神秘','活泼','独立'];
// Each series gets a stable accent hue (OKLCH degrees); unknown works fall back to a name hash.
const WORK_HUES=new Map(Object.entries({'孤独摇滚':352,'未来日记':8,'寒蝉鸣泣之时':22,'莉可丽丝':38,'命运石之门':54,'青春猪头少年系列':68,'来自深渊':80,'轻音少女':98,'章鱼噼的原罪':112,'进击的巨人':130,'葬送的芙莉莲':148,'来自新世界':165,'声之形':182,'心理测量者':198,'穿越时空的少女':214,'吹响吧！上低音号':230,'魔法禁书目录':246,'紫罗兰永恒花园':262,'败犬女主太多了！':278,'Angel Beats!':294,'少女终末旅行':310,'恶魔人 crybaby':326,'恶魔人':326,Another:342}));
function workHue(name){if(WORK_HUES.has(name))return WORK_HUES.get(name);let h=2166136261;for(const ch of name){h^=ch.codePointAt(0);h=Math.imul(h,16777619)}return (h>>>0)%360}
const ROLE_CLASS={'主角':'lead','反派':'villain','配角':'support','路人':'extra'};
let lastStoredValue=null,editorGeneration=0,records=[],loadError=false,storageWritable=true,currentId=null,editingId=null,draftTags=[],draftImage='',draftImageKind='',pendingImport=null,imageBusy=false,seedById=new Map(SEED.map(c=>[c.id,c]));
let view={mode:'all',q:'',work:'',role:'',min:'',max:'',sort:'added-desc',limit:48,expanded:new Set()};
function safeUrl(s,images=false){if(typeof s!=='string')return '';if(images&&/^(?:\.\/)?assets\/characters\/[a-z0-9-]+\.(?:webp|png|jpg|jpeg|gif)$/i.test(s))return s.replace(/^\.\//,'');if(images&&/^data:image\/(png|jpeg|webp|gif);base64,[A-Za-z0-9+/=]+$/i.test(s))return s;try{const u=new URL(s);if(u.protocol==='https:'||u.protocol==='http:')return u.href}catch{}return ''}
function cleanText(v,max=5000){return typeof v==='string'?v.trim().slice(0,max):''}
function normalize(raw,idx=0,strict=false){if(!raw||typeof raw!=='object'||Array.isArray(raw))throw Error('角色条目必须是对象');const nameZh=cleanText(raw.nameZh||raw.name,100),nameJa=cleanText(raw.nameJa||raw.japaneseName,100),work=cleanText(raw.work||raw.anime,150);if(!nameZh||!work)throw Error('第 '+(idx+1)+' 条缺少中文名或所属作品');const rating=raw.rating===null||raw.rating===undefined||raw.rating===''?null:Number(raw.rating);if(rating!==null&&(!Number.isFinite(rating)||rating<1||rating>10))throw Error(nameZh+' 的评分须为 1–10 分或空值');if(raw.tags!==undefined&&!Array.isArray(raw.tags))throw Error(nameZh+' 的标签格式不正确');const image=safeUrl(raw.image||raw.imageUrl,true);if(!image)throw Error(nameZh+' 缺少有效图片');if(strict&&typeof raw.id!=='string')throw Error(nameZh+' 缺少档案 ID');const date=Date.parse(raw.addedAt||raw.createdAt);return {id:cleanText(raw.id,150)||uid(),nameZh,nameJa,work,season:cleanText(raw.season,120),cv:cleanText(raw.cv,200),role:ROLES.includes(raw.role)?raw.role:'配角',tags:[...new Set((raw.tags||[]).map(x=>cleanText(x,24)).filter(Boolean))].slice(0,30),bio:cleanText(raw.bio,5000),birthday:cleanText(raw.birthday,80),height:cleanText(raw.height,80),bloodType:cleanText(raw.bloodType,80),rating,notes:cleanText(raw.notes,10000),image,fullImage:safeUrl(raw.fullImage||raw.fullImageUrl,true)||image,bioSources:[...new Set((Array.isArray(raw.bioSources)?raw.bioSources:[]).map(s=>safeUrl(s)).filter(Boolean))].slice(0,8),imageFit:raw.imageFit==='contain'?'contain':'cover',imageKind:raw.imageKind==='作品视觉图'?'作品视觉图':'角色图',sourceUrl:safeUrl(raw.sourceUrl),imageSourceUrl:safeUrl(raw.imageSourceUrl),addedAt:Number.isFinite(date)?new Date(date).toISOString():new Date().toISOString(),updatedAt:cleanText(raw.updatedAt,40),order:Number.isFinite(raw.order)?raw.order:idx};}
function uid(){return globalThis.crypto?.randomUUID?.()||'char-'+Date.now().toString(36)+'-'+Math.random().toString(36).slice(2)}
function expandStored(raw){if(raw?.seedImageRef&&!raw.image){const s=seedById.get(raw.seedImageRef);if(s)raw={...raw,image:s.image,fullImage:raw.fullImage||s.fullImage};}return raw;}
function compressedRecords(list){return list.map(c=>{const s=seedById.get(c.id);if(s&&c.image===s.image){const o={...c,seedImageRef:c.id};delete o.image;if(c.fullImage===s.fullImage)delete o.fullImage;return o;}const o={...c};if(o.fullImage===o.image)delete o.fullImage;return o;});}
function storageEnvelope(list){return {schemaVersion:1,catalogVersion:CATALOG_VERSION,characters:compressedRecords(list),savedAt:new Date().toISOString()};}
function migrateCatalog(list,version){
  if(version>=CATALOG_VERSION)return list.map((c,i)=>normalize(expandStored(c),i));
  const fields=['nameZh','nameJa','work','season','cv','role','tags','bio','birthday','height','bloodType','sourceUrl','imageSourceUrl','imageKind'];
  const next=list.map((raw,i)=>{
    const old=BASELINE.get(raw.id),previous=IMAGE_BASELINE.get(raw.id),seed=seedById.get(raw.id),c=normalize(expandStored(raw),i);
    const stockImage=Boolean(seed&&(raw.seedImageRef===raw.id||(previous&&(raw.image||raw.imageUrl)===previous.image)||(version<2&&old?.image&&(raw.image||raw.imageUrl)===old.image)));
    const stockFullImage=!raw.fullImage&&!raw.fullImageUrl||[previous?.fullImage,previous?.image,old?.image].filter(Boolean).includes(raw.fullImage||raw.fullImageUrl);
    if(version<2&&old&&seed){
      for(const key of fields){
        if((key==='imageSourceUrl'||key==='imageKind')&&!stockImage)continue;
        const before=old[key]??(key==='tags'?[]:'');
        if(JSON.stringify(c[key])===JSON.stringify(before))c[key]=seed[key]??(key==='tags'?[]:'');
      }
      if(c.bio===seed.bio)c.bioSources=seed.bioSources||[];
    }
    if(stockImage){
      c.image=seed.image;
      if(stockFullImage)c.fullImage=seed.fullImage||seed.image;
      c.imageSourceUrl=seed.imageSourceUrl||'';c.imageKind=seed.imageKind;c.imageFit='contain';
    }
    return normalize(c,i);
  });
  const ids=new Set(next.map(c=>c.id));
  for(const seed of SEED){
    // Only introduce records from later catalog versions; keep prior deletions.
    if((seed.catalogIntroducedVersion||1)>version&&!ids.has(seed.id)){
      next.push(normalize(seed,next.length));ids.add(seed.id);
    }
  }
  return next;
}
function notice(text){$('storageNotice').textContent=text;$('storageNotice').hidden=!text;}
function readStorage(){let raw;try{raw=localStorage.getItem(KEY);lastStoredValue=raw}catch{storageWritable=false;notice('此浏览器暂不允许本地保存。你仍可浏览和导出；编辑内容需允许本地存储后才能保存。');return SEED.map((x,i)=>normalize(x,i));}if(raw===null){const initial=SEED.map((x,i)=>normalize(x,i));try{const saved=JSON.stringify(storageEnvelope(initial));localStorage.setItem(KEY,saved);lastStoredValue=saved;storageWritable=true}catch{storageWritable=false;notice('当前无法保存到此浏览器。请检查存储空间或浏览器设置；可先导出档案备份。')}return initial;}let parsed,r;try{parsed=JSON.parse(raw);if(parsed.schemaVersion!==1||!Array.isArray(parsed.characters))throw Error('备份格式不支持');r=migrateCatalog(parsed.characters,Number(parsed.catalogVersion)||1);if(new Set(r.map(x=>x.id)).size!==r.length)throw Error('重复 ID');}catch{loadError=true;storageWritable=false;notice('本机档案无法读取，原始数据已保留。当前仅展示初始角色；请先下载原始数据，再导入有效备份。');return SEED.map((x,i)=>normalize(x,i));}loadError=false;if((Number(parsed.catalogVersion)||1)<CATALOG_VERSION){try{if(localStorage.getItem(KEY)!==raw)throw Error('ARCHIVE_CONFLICT');const saved=JSON.stringify(storageEnvelope(r));localStorage.setItem(KEY,saved);lastStoredValue=saved;storageWritable=true;notice('')}catch{storageWritable=false;notice('新版角色资料已载入，但本机存储暂时无法更新。原有数据仍保留；请先导出当前档案备份，再检查浏览器存储空间。')}}return r;}
function persist(next,{recover=false}={}){if(loadError&&!recover){toast('请先导出原始数据，再导入有效备份恢复档案。');return false;}try{if(localStorage.getItem(KEY)!==lastStoredValue)throw Error('ARCHIVE_CONFLICT');const serialized=JSON.stringify(storageEnvelope(next));localStorage.setItem(KEY,serialized);lastStoredValue=serialized;records=next;loadError=false;storageWritable=true;notice('');updateStorage();return true;}catch(e){storageWritable=false;updateStorage();throw Error(e?.message==='ARCHIVE_CONFLICT'?'另一窗口已更新档案。请先复制未保存内容，再刷新后重试，避免覆盖新的修改。':e?.name==='QuotaExceededError'?'本机存储空间不足。请先导出备份，再删除较大的上传图片或改用图片 URL；当前编辑仍保留。':'保存失败，浏览器可能禁用了本地存储。当前编辑仍保留，请检查设置。');}}
function updateStorage(){let size=0;try{size=(localStorage.getItem(KEY)||'').length*2}catch{}$('storageSize').textContent=size<1048576?(size/1024).toFixed(0)+' KB':(size/1048576).toFixed(2)+' MB';$('storageFill').style.width=Math.min(100,size/(5*1048576)*100)+'%';$('saveState').innerHTML=icon(storageWritable?'check':'archive')+(storageWritable?'已保存到本机':'本机保存不可用');$('saveState').classList.toggle('warn',!storageWritable);}
function toast(message,action){
  const el=document.createElement('div'),dismiss=()=>{if(el.classList.contains('leaving'))return;el.classList.add('leaving');setTimeout(()=>el.remove(),240)};
  el.className='toast';el.innerHTML=icon('ok');
  const span=document.createElement('span');span.textContent=message;el.append(span);
  if(action){const b=document.createElement('button');b.textContent=action.label;b.onclick=()=>{action.run();dismiss()};el.append(b)}
  $('toasts').append(el);setTimeout(dismiss,action?9000:5500);
}
function preference(){try{localStorage.setItem(PREF,JSON.stringify({mode:view.mode,sort:view.sort}))}catch{}}
function works(){return [...new Set(records.map(c=>c.work))].sort((a,b)=>a.localeCompare(b,'zh-Hans-CN'));}
function updateMenus(){
  const names=works(),counts=new Map(),rated=records.filter(c=>c.rating!==null).length,pct=records.length?Math.round(rated/records.length*100):0;
  records.forEach(c=>counts.set(c.work,(counts.get(c.work)||0)+1));
  $('sideTotal').textContent=records.length;$('sideWorks').textContent=names.length;
  $('summary').innerHTML='<div class="stat"><b>'+records.length+'</b><span>位角色</span></div><div class="stat"><b>'+names.length+'</b><span>部作品</span></div><div class="stat"><b>'+rated+'</b><span>位已评分</span><i class="meter-mini" title="已评分 '+pct+'%"><em style="width:'+pct+'%"></em></i></div>';
  $('workFilter').innerHTML='<option value="">全部作品</option>'+names.map(w=>'<option value="'+esc(w)+'">'+esc(w)+'</option>').join('');
  if(!names.includes(view.work))view.work='';
  $('workFilter').value=view.work;
  $('worksList').innerHTML=names.map(w=>'<option value="'+esc(w)+'"></option>').join('');
  $('workNav').innerHTML=names.map(w=>'<button class="nav-button'+(view.work===w?' active':'')+'" data-work="'+esc(w)+'" style="--h:'+workHue(w)+'"><span class="work-dot"></span><span class="work-name">'+esc(w)+'</span><span class="count">'+counts.get(w)+'</span></button>').join('');
  updateStorage();
}
function normalizedSearch(v){return String(v).normalize('NFKC').toLocaleLowerCase().replace(/[\s・··ー]/g,'');}
function getFiltered(){const terms=view.q.trim().split(/\s+/).filter(Boolean).map(normalizedSearch),hasRange=view.min!==''||view.max!=='',lo=view.min===''?1:Number(view.min),hi=view.max===''?10:Number(view.max);return records.filter(c=>(!view.work||c.work===view.work)&&(!view.role||c.role===view.role)&&(!hasRange||(c.rating!==null&&c.rating>=lo&&c.rating<=hi))&&terms.every(t=>normalizedSearch([c.nameZh,c.nameJa,c.work,c.season,...(WORK_ALIASES[c.work]||[]),...c.tags].join(' ')).includes(t))).sort((a,b)=>{if(view.sort.startsWith('rating')){if(a.rating===null&&b.rating!==null)return 1;if(b.rating===null&&a.rating!==null)return-1;const d=(a.rating??0)-(b.rating??0);if(d)return view.sort==='rating-asc'?d:-d;}if(view.sort==='work'){const w=a.work.localeCompare(b.work,'zh-Hans-CN');if(w)return w;}const d=Date.parse(a.addedAt)-Date.parse(b.addedAt);return (view.sort==='added-asc'?d:-d)||a.order-b.order||a.nameZh.localeCompare(b.nameZh,'zh-Hans-CN');});}
function card(c,index){
  const art=c.fullImage||c.image,visual=c.imageKind==='作品视觉图',tags=c.tags.slice(0,3),more=c.tags.length-tags.length;
  return '<article class="card" style="--h:'+workHue(c.work)+';--i:'+index+'"><button class="card-open" data-open="'+esc(c.id)+'" aria-label="查看 '+esc(c.nameZh)+' 的档案">'
    +'<div class="portrait"><span class="ambient" aria-hidden="true"><img src="'+esc(art)+'" alt="" loading="lazy" decoding="async" referrerpolicy="no-referrer"></span>'
    +'<div class="art"><img src="'+esc(art)+'" data-fallback="'+esc(c.image)+'" alt="'+esc(c.nameZh)+(visual?'所属作品视觉图':'角色图')+'" class="'+(c.imageFit==='contain'?'contain':'')+'" loading="lazy" decoding="async" referrerpolicy="no-referrer"></div>'
    +'<span class="role-badge role-'+(ROLE_CLASS[c.role]||'other')+'">'+esc(c.role)+'</span><span class="card-index">No.'+String(index+1).padStart(3,'0')+'</span>'+(visual?'<span class="image-kind">作品视觉图</span>':'')+'</div>'
    +'<div class="card-body"><div class="card-work">'+esc(c.work)+'</div><h3>'+esc(c.nameZh)+'</h3><div class="ja-name" lang="ja">'+esc(c.nameJa)+'</div>'
    +'<div class="card-tags">'+tags.map(t=>'<span class="tag"><i>#</i>'+esc(t)+'</span>').join('')+(more>0?'<span class="tag tag-more">+'+more+'</span>':'')+'</div>'
    +'<div class="card-foot"><span class="rating '+(c.rating===null?'unrated':'')+'">'+icon('star')+(c.rating===null?'尚未评分':c.rating.toFixed(1)+' <small>/ 10</small>')+'</span><span class="cv">CV '+esc(c.cv||'未收录')+'</span></div></div></button></article>';
}
// Fit small art to the frame and detect fully opaque pictures so they can get rounded corners (never crops).
const probe=document.createElement('canvas');probe.width=probe.height=8;
function shapeImage(img){
  const nw=img.naturalWidth,nh=img.naturalHeight;if(!nw||!nh||!img.matches('.art img,.detail-art img'))return;
  img.classList.remove('fit-w','fit-h');
  if(img.closest('.art')&&Math.max(nw,nh)<260)img.classList.add(nw/nh>.82?'fit-w':'fit-h');
  try{const g=probe.getContext('2d',{willReadFrequently:true});g.clearRect(0,0,8,8);g.drawImage(img,0,0,8,8);const d=g.getImageData(0,0,8,8).data;let solid=true;for(let i=3;i<d.length;i+=4)if(d[i]<250){solid=false;break}img.classList.toggle('is-opaque',solid)}catch{}
}
function handleImages(root){
  root.querySelectorAll('img').forEach(img=>{
    const ambient=Boolean(img.closest('.ambient')),loaded=()=>{shapeImage(img);img.classList.add('is-loaded')};
    img.addEventListener('load',loaded);
    img.addEventListener('error',()=>{
      if(ambient){img.remove();return}
      const fallback=img.dataset.fallback;
      if(fallback&&fallback!==img.getAttribute('src')){delete img.dataset.fallback;img.src=fallback;return;}
      img.classList.add('is-broken','is-loaded');img.alt='图片暂不可用，可在编辑中更换';
      img.parentElement.title='原图片暂不可用，请更换 URL 或上传本地图片';
    });
    if(img.complete&&img.naturalWidth)loaded();
  });
}
function render(enter=false){
  const arr=getFiltered(),filtered=view.q||view.work||view.role||view.min!==''||view.max!=='',box=$('collection');
  $('allTab').classList.toggle('active',view.mode==='all');$('groupTab').classList.toggle('active',view.mode==='group');$('allTab').setAttribute('aria-pressed',view.mode==='all');$('groupTab').setAttribute('aria-pressed',view.mode==='group');
  document.querySelectorAll('[data-action]').forEach(b=>b.classList.toggle('active',!view.work&&b.dataset.action===view.mode));
  document.querySelectorAll('[data-work]').forEach(b=>b.classList.toggle('active',b.dataset.work===view.work));
  revealActiveWork();
  $('clearFilters').hidden=!filtered;
  $('resultCount').innerHTML='<strong>'+esc(view.work||(view.mode==='group'?'按作品收藏':'全部角色'))+'</strong><span class="result-num">'+arr.length+' 位'+(filtered?' / '+records.length+' 位':'')+'</span>';
  box.removeAttribute('aria-busy');box.classList.toggle('enter',enter);if(enter)scrollToResults();
  if(view.min!==''&&view.max!==''&&Number(view.min)>Number(view.max)){box.innerHTML='<div class="empty"><h2>评分区间需要调整</h2><p>最低评分不能高于最高评分。</p></div>';return;}
  if(!arr.length){box.innerHTML='<div class="empty">'+icon('search')+'<h2>'+(records.length?'还没有找到这位角色':'第一份角色档案，从这里开始')+'</h2><p>'+(records.length?'试试其他名字、作品或标签，也可以清除筛选。':'添加一个角色，记录你的评分和感想。')+'</p><button class="btn primary" data-empty="'+(records.length?'clear':'add')+'">'+(records.length?'清除筛选':'添加角色')+'</button></div>';return;}
  if(view.mode==='all'){
    box.innerHTML='<div class="grid">'+arr.slice(0,view.limit).map(card).join('')+'</div>'+(arr.length>view.limit?'<div class="more-wrap"><button class="btn" data-more="all">加载更多 <span style="opacity:.5">'+Math.min(view.limit,arr.length)+' / '+arr.length+'</span></button></div>':'');
  }else{
    const grouped=new Map();arr.forEach(c=>{if(!grouped.has(c.work))grouped.set(c.work,[]);grouped.get(c.work).push(c)});
    box.innerHTML=[...grouped].map(([w,chars],gi)=>'<section class="work-section" style="--h:'+workHue(w)+'"><div class="section-title"><h2><span class="sec-no">'+String(gi+1).padStart(2,'0')+'</span>'+esc(w)+'<small>'+chars.length+' 位</small></h2>'+(chars.length>8?'<button class="btn subtle small" data-expand="'+esc(w)+'">'+(view.expanded.has(w)?'收起':'查看全部 '+chars.length+' 位')+'</button>':'')+'</div><div class="grid">'+chars.slice(0,view.expanded.has(w)?undefined:8).map(card).join('')+'</div></section>').join('');
  }
  handleImages(box);
}
// Keep the highlighted work visible when it is picked from the filter bar instead of the sidebar.
function revealActiveWork(){const on=document.querySelector('#workNav .active'),sc=document.querySelector('.side-scroll');if(!on||!sc)return;const a=on.getBoundingClientRect(),b=sc.getBoundingClientRect();if(a.top<b.top+8)sc.scrollTop-=b.top+8-a.top;else if(a.bottom>b.bottom-34)sc.scrollTop+=a.bottom-(b.bottom-34);}
// After the result set changes, bring its top back under the sticky bar instead of leaving the user mid-list.
function scrollToResults(){const bar=document.querySelector('.result-bar'),top=bar.getBoundingClientRect().top+window.scrollY-(matchMedia('(max-width:700px)').matches?76:140);if(window.scrollY>top)window.scrollTo(0,Math.max(0,top))}
function refresh(enter=false){updateMenus();render(enter);}
function setMode(mode){view.mode=mode;view.limit=48;preference();render(true);}
function clearFilters(){Object.assign(view,{q:'',work:'',role:'',min:'',max:'',limit:48});$('searchInput').value='';$('workFilter').value='';$('roleFilter').value='';$('scoreMin').value='';$('scoreMax').value='';render(true);}
function showDialog(id){const d=$(id);if(!d.open)d.showModal();document.body.style.overflow='hidden';}
function closeDialog(id){$(id).close();if(!document.querySelector('dialog[open]'))document.body.style.overflow='';}
// Ids in the order the cards are shown, so previous/next follow what the user sees.
function detailIds(){const arr=getFiltered();if(view.mode!=='group')return arr.map(c=>c.id);const g=new Map();arr.forEach(c=>{if(!g.has(c.work))g.set(c.work,[]);g.get(c.work).push(c.id)});return [...g.values()].flat();}
function stepDetail(dir){const ids=detailIds(),i=ids.indexOf(currentId),next=ids[i+dir];if(i>=0&&next)displayDetail(next);}
function displayDetail(id){
  const c=records.find(r=>r.id===id);if(!c)return;currentId=id;
  const art=c.fullImage||c.image,visual=c.imageKind==='作品视觉图',ids=detailIds(),pos=ids.indexOf(id);
  const facts=[['声优 CV',c.cv],['角色定位',c.role],['季数 / 版本',c.season],['生日',c.birthday],['身高',c.height],['血型',c.bloodType]];
  const meter=r=>Array.from({length:10},(_,i)=>'<i style="--f:'+Math.round(Math.max(0,Math.min(1,(r||0)-i))*100)+'%"></i>').join('');
  const link=(u,label)=>'<a href="'+esc(u)+'" target="_blank" rel="noopener noreferrer">'+label+icon('external')+'</a>';
  $('detailPos').textContent=pos<0?'':(pos+1)+' / '+ids.length;$('prevBtn').disabled=pos<=0;$('nextBtn').disabled=pos<0||pos>=ids.length-1;
  $('detailBody').innerHTML='<div class="detail-layout" style="--h:'+workHue(c.work)+'">'
    +'<div class="detail-image"><span class="ambient" aria-hidden="true"><img src="'+esc(art)+'" alt="" referrerpolicy="no-referrer"></span>'
    +'<button class="detail-art" data-full-image="'+esc(c.id)+'" aria-label="查看 '+esc(c.nameZh)+' 的完整大图"><img src="'+esc(art)+'" data-fallback="'+esc(c.image)+'" alt="'+esc(c.nameZh)+'" referrerpolicy="no-referrer"></button>'
    +'<div class="image-caption">'+(visual?'<span>作品视觉图</span>':'')+'<span>'+icon('zoom')+'点击查看大图</span></div></div>'
    +'<div class="detail-content"><div class="detail-work">'+esc(c.work)+'</div><h2 id="detailTitle">'+esc(c.nameZh)+'</h2><div class="ja-name" lang="ja">'+esc(c.nameJa)+'</div>'
    +'<div class="detail-tags">'+c.tags.map(t=>'<span class="tag"><i>#</i>'+esc(t)+'</span>').join('')+'</div>'
    +'<div class="facts">'+facts.map(([k,v])=>'<div class="fact"><div class="fact-label">'+k+'</div><div class="fact-value'+(v?'':' na')+'">'+esc(v||'未收录')+'</div></div>').join('')+'</div>'
    +'<h3>角色简介</h3><p'+(c.bio?'':' class="muted"')+'>'+esc(c.bio||'暂未填写，点击编辑补充。')+'</p>'
    +'<h3>我的评分</h3>'+(c.rating===null
      ?'<div class="rating-card is-empty"><div class="rating-score"><span class="score-empty">'+icon('star')+'</span><span class="score-note">尚未评分，点击右上角「编辑」打分</span></div><div class="meter" aria-hidden="true">'+meter(0)+'</div></div>'
      :'<div class="rating-card"><div class="rating-score"><span class="score-num">'+c.rating.toFixed(1)+'</span><span class="score-max">/ 10</span></div><div class="meter" role="img" aria-label="评分 '+c.rating.toFixed(1)+' / 10">'+meter(c.rating)+'</div></div>')
    +'<h3>我的备注</h3>'+(c.notes?'<div class="note-box"><p>'+esc(c.notes)+'</p></div>':'<div class="note-box empty-note"><p class="muted">还没有留下感想。</p></div>')
    +'<div class="sources">'+(c.sourceUrl?link(c.sourceUrl,'资料来源'):'')+(c.imageSourceUrl?link(c.imageSourceUrl,'图片来源'):'')+c.bioSources.filter(u=>u!==c.sourceUrl).map((u,i)=>link(u,'剧情参考 '+(i+1))).join('')+'<div class="meta">性格与定位为整理标签 · 未核实的个人数据留空<br>添加于 '+new Date(c.addedAt).toLocaleDateString('zh-CN')+'</div></div>'
    +'</div></div>';
  handleImages($('detailBody'));showDialog('detailDialog');
}

function openFullImage(id){const c=records.find(x=>x.id===id);if(!c)return;$('imageTitle').textContent=c.nameZh+' · '+(c.imageKind||'角色图');const img=$('fullImage');img.classList.remove('is-broken');img.alt=c.nameZh;img.dataset.fallback=c.image;img.src=c.fullImage||c.image;const link=$('originalImageLink'),src=safeUrl(c.fullImage||c.image);link.hidden=!src;if(src)link.href=src;else link.removeAttribute('href');showDialog('imageDialog');}
function renderTagChoices(){const tags=[...new Set([...DEFAULT_TAGS,...draftTags])];$('tagChoices').innerHTML=tags.map(t=>'<button type="button" class="tag-choice '+(draftTags.includes(t)?'selected':'')+'" aria-pressed="'+draftTags.includes(t)+'" data-tag="'+esc(t)+'">'+esc(t)+'</button>').join('');}
function renderRatings(){const val=$('ratingValue').value;$('ratingChoices').innerHTML=Array.from({length:10},(_,i)=>'<button type="button" class="score-choice '+(val===String(i+1)?'selected':'')+'" aria-pressed="'+(val===String(i+1))+'" data-rating="'+(i+1)+'">'+(i+1)+'</button>').join('')+'<button type="button" class="score-choice score-clear '+(val===''?'selected':'')+'" data-rating="">暂不评分</button>'+(val!==''&&!Number.isInteger(Number(val))?'<span class="tag">当前 '+esc(val)+' 分</span>':'');}
function previewImage(){const src=draftImage||safeUrl($('imageUrl').value,true);$('imagePreview').hidden=!src;$('noImage').hidden=!!src;if(src)$('imagePreview').src=src;else $('imagePreview').removeAttribute('src');}
function openEditor(id=null){editorGeneration++;editingId=id;const c=id?records.find(x=>x.id===id):null;$('characterForm').reset();$('formError').hidden=true;$('imageStatus').textContent='';$('editTitle').textContent=c?'编辑角色档案':'添加角色';for(const key of ['nameZh','nameJa','work','season','cv','role','bio','birthday','height','bloodType','notes','sourceUrl'])$(key).value=c?.[key]??(key==='role'?'主角':'');$('ratingValue').value=c?.rating??'';draftTags=c?[...c.tags]:[];draftImage=c?.image?.startsWith('data:')?c.image:'';draftImageKind=c?.imageKind||'角色图';$('imageUrl').value=c&&!c.image.startsWith('data:')?c.image:'';imageBusy=false;$('saveBtn').disabled=false;$('imageFile').value='';renderTagChoices();renderRatings();previewImage();showDialog('editDialog');}
function addTag(){const t=$('customTag').value.trim().replace(/^#/,'');if(!t)return;if(draftTags.length>=30)return toast('最多添加 30 个标签');if(!draftTags.includes(t))draftTags.push(t);$('customTag').value='';renderTagChoices();}
async function uploadImage(file){if(!file)return;const gen=editorGeneration;const accepted=['image/jpeg','image/png','image/webp','image/gif'];if(!accepted.includes(file.type)){toast('请选择 JPG、PNG、WebP 或 GIF 图片。');return;}if(file.size>20*1024*1024){toast('图片超过 20 MB，请先缩小后上传。');return;}imageBusy=true;$('saveBtn').disabled=true;$('imageStatus').textContent='正在压缩图片…';try{const url=URL.createObjectURL(file);try{const img=new Image();img.src=url;await new Promise((resolve,reject)=>{img.onload=resolve;img.onerror=()=>reject(Error('无法读取这张图片，请换一张试试。'))});if(img.naturalWidth*img.naturalHeight>60000000)throw Error('图片分辨率过大，请先缩小后上传。');const scale=Math.min(1,1600/Math.max(img.naturalWidth,img.naturalHeight)),canvas=document.createElement('canvas');canvas.width=Math.max(1,Math.round(img.naturalWidth*scale));canvas.height=Math.max(1,Math.round(img.naturalHeight*scale));canvas.getContext('2d').drawImage(img,0,0,canvas.width,canvas.height);let data=canvas.toDataURL('image/webp',.9);if(data.length>1600000)data=canvas.toDataURL('image/webp',.82);if(!safeUrl(data,true))throw Error('图片转换失败，请更换图片');if(gen!==editorGeneration)return;draftImage=data;draftImageKind='角色图';$('imageUrl').value='';previewImage();$('imageStatus').style.color='#bca0d4';$('imageStatus').textContent='已处理 · '+canvas.width+' × '+canvas.height+' · 约 '+Math.round(data.length*.75/1024)+' KB'+(file.type==='image/gif'?'（保存为静态封面）':'');}finally{URL.revokeObjectURL(url)}}catch(e){$('imageStatus').textContent=e.message;$('imageStatus').style.color='';}finally{if(gen===editorGeneration){imageBusy=false;$('saveBtn').disabled=false;}}}
function saveForm(event){event.preventDefault();if(imageBusy)return;const form=$('characterForm');if(!form.reportValidity())return;const raw=Object.fromEntries(new FormData(form));const old=records.find(c=>c.id===editingId);try{const c=normalize({...old,...raw,id:editingId||uid(),image:draftImage||$('imageUrl').value,fullImage:old&&old.image===(draftImage||$('imageUrl').value)?old.fullImage:(draftImage||$('imageUrl').value),bioSources:old&&old.bio===raw.bio?old.bioSources:[],rating:$('ratingValue').value,tags:draftTags,imageKind:draftImageKind,addedAt:old?.addedAt||new Date().toISOString(),updatedAt:new Date().toISOString(),order:old?.order??records.length, imageSourceUrl:old&&old.image===(draftImage||$('imageUrl').value)?old.imageSourceUrl:safeUrl($('imageUrl').value)});const next=old?records.map(x=>x.id===c.id?c:x):[c,...records];if(!persist(next))return;closeDialog('editDialog');refresh();if($('detailDialog').open)displayDetail(c.id);toast(old?'角色档案已更新':'已添加 '+c.nameZh);}catch(e){$('formError').textContent=e.message;$('formError').hidden=false;$('formError').scrollIntoView({block:'nearest'});}}
function download(content,name,type='application/json'){const blob=new Blob([content],{type}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=name;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),10000);}
function exportData(){if(loadError){try{download(localStorage.getItem(KEY)||'','Eidolon_原始档案_待恢复.json');toast('已下载原始数据，未修改本机档案。')}catch{toast('无法读取原始数据。')}return;}download(JSON.stringify({app:'Eidolon',schemaVersion:1,exportedAt:new Date().toISOString(),characters:records.map(c=>{const out={...c};if(out.fullImage===out.image)delete out.fullImage;return out;})},null,2),'Eidolon_角色档案_'+new Date().toISOString().slice(0,10)+'.json');toast('JSON 备份已导出，包含已上传的图片。');}
function parseImport(text){const data=JSON.parse(text),arr=Array.isArray(data)?data:data.characters;if(!Array.isArray(arr))throw Error('JSON 中没有 characters 数组。');if(!Array.isArray(data)&&data.schemaVersion!==undefined&&data.schemaVersion!==1)throw Error('这个备份版本暂不受支持。');if(arr.length>3000)throw Error('单次最多导入 3000 位角色。');const result=arr.map((x,i)=>normalize(expandStored(x),i));const ids=new Set();for(const c of result){if(ids.has(c.id))throw Error('备份包含重复档案 ID：'+c.nameZh);ids.add(c.id);}return result;}
async function readImport(file){if(!file)return;pendingImport=null;$('confirmImport').disabled=true;$('importError').hidden=true;$('importDetails').hidden=true;if(file.size>100*1024*1024){$('importError').textContent='备份超过 100 MB，请选择较小的文件。';$('importError').hidden=false;return;}try{const text=await file.text();pendingImport=parseImport(text);const overlap=pendingImport.filter(c=>records.some(r=>r.id===c.id)).length;$('importSummary').textContent='读到 '+pendingImport.length+' 位角色 · '+new Set(pendingImport.map(c=>c.work)).size+' 部作品 · '+overlap+' 个现有 ID 将被更新';$('importDetails').hidden=false;$('replaceConfirm').checked=false;updateImportButton();}catch(e){$('importError').textContent='无法导入：'+e.message;$('importError').hidden=false;}}
function updateImportButton(){const replace=document.querySelector('[name="importMode"]:checked').value==='replace';$('replaceConfirm').closest('label').hidden=!replace;$('confirmImport').disabled=!pendingImport||(replace&&!$('replaceConfirm').checked);}
function commitImport(){if(!pendingImport)return;const mode=document.querySelector('[name="importMode"]:checked').value;if(mode==='replace'&&!$('replaceConfirm').checked)return;try{let next=pendingImport;if(mode==='merge'){const map=new Map(records.map(c=>[c.id,c]));pendingImport.forEach(c=>map.set(c.id,c));next=[...map.values()];}if(persist(next,{recover:true})){const n=pendingImport.length;pendingImport=null;closeDialog('importDialog');closeDialog('detailDialog');clearFilters();refresh();toast('已导入 '+n+' 位角色。');}}catch(e){$('importError').textContent=e.message;$('importError').hidden=false;}}
function setMobileMenu(open){$('sidebar').classList.toggle('mobile-open',open);$('menuScrim').classList.toggle('open',open);$('menuBtn').setAttribute('aria-expanded',open);}
$('allTab').onclick=()=>setMode('all');$('groupTab').onclick=()=>setMode('group');$('clearFilters').onclick=clearFilters;$('addBtn').onclick=()=>openEditor();$('editBtn').onclick=()=>openEditor(currentId);$('exportBtn').onclick=exportData;$('aboutBtn').onclick=()=>showDialog('aboutDialog');$('menuBtn').onclick=()=>setMobileMenu(!$('sidebar').classList.contains('mobile-open'));$('menuScrim').onclick=()=>setMobileMenu(false);
$('sidebar').addEventListener('click',e=>{const b=e.target.closest('[data-work],[data-action]');if(!b)return;if(b.dataset.work!==undefined){view.work=b.dataset.work;$('workFilter').value=view.work;view.limit=48;render(true);}else{view.work='';$('workFilter').value='';setMode(b.dataset.action)}setMobileMenu(false);});
let searchTimer;$('searchInput').addEventListener('input',()=>{clearTimeout(searchTimer);searchTimer=setTimeout(()=>{view.q=$('searchInput').value;view.limit=48;render();scrollToResults()},100)});
for(const [id,key]of [['workFilter','work'],['roleFilter','role'],['scoreMin','min'],['scoreMax','max'],['sortSelect','sort']])$(id).addEventListener('change',()=>{view[key]=$(id).value;view.limit=48;preference();render(true);});
$('collection').addEventListener('click',e=>{const target=e.target.closest('[data-open],[data-more],[data-expand],[data-empty]');if(!target)return;if(target.dataset.open)displayDetail(target.dataset.open);if(target.dataset.more){view.limit+=48;render()}if(target.dataset.expand){const w=target.dataset.expand;if(view.expanded.has(w))view.expanded.delete(w);else view.expanded.add(w);render()}if(target.dataset.empty==='clear')clearFilters();if(target.dataset.empty==='add')openEditor();});
document.addEventListener('click',e=>{const art=e.target.closest('[data-full-image]');if(art)openFullImage(art.dataset.fullImage);const close=e.target.closest('[data-close]');if(close)closeDialog(close.dataset.close);});document.querySelectorAll('dialog').forEach(d=>{d.addEventListener('close',()=>{if(!document.querySelector('dialog[open]'))document.body.style.overflow='';});d.addEventListener('click',e=>{if(e.target===d){const r=d.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)closeDialog(d.id);}});});
$('tagChoices').onclick=e=>{const b=e.target.closest('[data-tag]');if(!b)return;const t=b.dataset.tag;draftTags=draftTags.includes(t)?draftTags.filter(x=>x!==t):[...draftTags,t];renderTagChoices();};$('addTagBtn').onclick=addTag;$('customTag').onkeydown=e=>{if(e.key==='Enter'){e.preventDefault();addTag()}};$('ratingChoices').onclick=e=>{const b=e.target.closest('[data-rating]');if(b){$('ratingValue').value=b.dataset.rating;renderRatings()}};
$('imageUrl').addEventListener('input',()=>{draftImage='';draftImageKind='角色图';previewImage();$('imageStatus').textContent='';});$('uploadImageBtn').onclick=()=>$('imageFile').click();$('imageFile').onchange=e=>uploadImage(e.target.files[0]);$('editDialog').addEventListener('paste',e=>{const f=[...(e.clipboardData?.items||[])].find(i=>i.kind==='file'&&i.type.startsWith('image/'));if(f){e.preventDefault();uploadImage(f.getAsFile())}});$('characterForm').onsubmit=saveForm;
$('deleteBtn').onclick=()=>{const c=records.find(x=>x.id===currentId);if(!c)return;$('deleteMessage').textContent='「'+c.nameZh+'」的评分、备注和图片也会一同删除。删除后可立即撤销。';showDialog('deleteDialog')};$('confirmDelete').onclick=()=>{const removed=records.find(c=>c.id===currentId);if(!removed)return;try{if(!persist(records.filter(c=>c.id!==removed.id)))return;closeDialog('deleteDialog');closeDialog('detailDialog');refresh();toast('已删除 '+removed.nameZh,{label:'撤销',run:()=>{try{if(records.some(c=>c.id===removed.id))return;if(persist([...records,removed])){refresh();toast('档案已恢复')}}catch(e){toast(e.message)}}});}catch(e){toast(e.message)}};
$('importBtn').onclick=()=>{pendingImport=null;$('importFile').value='';$('importDetails').hidden=true;$('importError').hidden=true;$('confirmImport').disabled=true;showDialog('importDialog')};$('chooseImport').onclick=()=>$('importFile').click();$('importFile').onchange=e=>readImport(e.target.files[0]);document.querySelectorAll('[name="importMode"]').forEach(r=>r.onchange=updateImportButton);$('replaceConfirm').onchange=updateImportButton;$('confirmImport').onclick=commitImport;
$('downloadHtml').onclick=downloadWebsite;
document.addEventListener('keydown',e=>{if(e.key==='/'&&!['INPUT','TEXTAREA','SELECT'].includes(document.activeElement?.tagName)&&!document.querySelector('dialog[open]')){e.preventDefault();$('searchInput').focus()}if(e.key==='Escape'){setMobileMenu(false);if(!$('themeMenu').hidden){setThemeMenu(false);$('themeBtn').focus()}}if((e.key==='ArrowLeft'||e.key==='ArrowRight')&&$('detailDialog').open&&!$('imageDialog').open&&!$('editDialog').open&&!$('deleteDialog').open&&!e.altKey&&!e.ctrlKey&&!e.metaKey&&!['INPUT','TEXTAREA','SELECT'].includes(document.activeElement?.tagName)){e.preventDefault();stepDetail(e.key==='ArrowRight'?1:-1)}});
window.addEventListener('storage',e=>{if(e.key!==KEY)return;if($('editDialog').open||$('importDialog').open){notice('另一窗口已修改档案。为避免覆盖，请先复制当前未保存内容，再刷新此页。');storageWritable=false;const b=$('saveBtn');b.disabled=true;return;}records=readStorage();refresh();if($('detailDialog').open){if(records.some(c=>c.id===currentId))displayDetail(currentId);else closeDialog('detailDialog')}toast('已同步此浏览器另一窗口的修改。')});
handleImages($('imageDialog'));
$('prevBtn').onclick=()=>stepDetail(-1);$('nextBtn').onclick=()=>stepDetail(1);
$('toTop').onclick=()=>window.scrollTo({top:0,behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'auto':'smooth'});
{let tick=false;window.addEventListener('scroll',()=>{if(tick)return;tick=true;requestAnimationFrame(()=>{tick=false;$('toTop').classList.toggle('show',window.scrollY>900)})},{passive:true});}
if('IntersectionObserver' in window)new IntersectionObserver(([e])=>$('controls').classList.toggle('stuck',!e.isIntersecting)).observe($('stuckSentinel'));
// Skins: paper / night / manga. The choice is remembered; view transitions cross-fade the swap where supported.
const THEMES={paper:'#f3eee4',night:'#0b0a12',manga:'#faf7ef'},THEME_KEY='eizou.theme.v1';
function applyTheme(t,{save=true,animate=true}={}){
  if(!THEMES[t])t='paper';
  const set=()=>{document.documentElement.dataset.theme=t;document.querySelector('meta[name="theme-color"]').content=THEMES[t];document.querySelectorAll('[data-theme-choice]').forEach(b=>b.setAttribute('aria-checked',String(b.dataset.themeChoice===t)))};
  if(animate&&document.startViewTransition&&!matchMedia('(prefers-reduced-motion:reduce)').matches){const vt=document.startViewTransition(set);vt.ready.catch(()=>{});vt.finished.catch(()=>{})}else set();
  if(save)try{localStorage.setItem(THEME_KEY,t)}catch{}
}
function setThemeMenu(open){$('themeMenu').hidden=!open;$('themeBtn').setAttribute('aria-expanded',String(open));if(open)($('themeMenu').querySelector('[aria-checked="true"]')||$('themeMenu').querySelector('button')).focus();}
$('themeBtn').onclick=()=>setThemeMenu($('themeMenu').hidden);
$('themeMenu').addEventListener('click',e=>{const b=e.target.closest('[data-theme-choice]');if(!b)return;applyTheme(b.dataset.themeChoice);setThemeMenu(false);$('themeBtn').focus()});
// Pressing outside only dismisses the menu: the click that follows is swallowed so it cannot also activate what lies underneath.
let swallowClick=false;
document.addEventListener('pointerdown',e=>{if($('themeMenu').hidden||e.target.closest('#themeSwitch'))return;setThemeMenu(false);swallowClick=true;setTimeout(()=>{swallowClick=false},500)},true);
document.addEventListener('pointercancel',()=>{swallowClick=false},true);
document.addEventListener('click',e=>{if(!swallowClick)return;swallowClick=false;e.preventDefault();e.stopPropagation()},true);
// Tabbing away from the open menu closes it (pointer presses are handled above).
$('themeSwitch').addEventListener('focusout',e=>{if(!$('themeMenu').hidden&&!$('themeSwitch').contains(e.relatedTarget))setThemeMenu(false)});
$('themeMenu').addEventListener('keydown',e=>{if(e.key!=='ArrowDown'&&e.key!=='ArrowUp')return;e.preventDefault();const items=[...$('themeMenu').querySelectorAll('.theme-option')],i=items.indexOf(document.activeElement);items[(i+(e.key==='ArrowDown'?1:-1)+items.length)%items.length].focus()});
applyTheme(document.documentElement.dataset.theme,{save:false,animate:false});
records=readStorage();try{const p=JSON.parse(localStorage.getItem(PREF)||'{}');if(['all','group'].includes(p.mode))view.mode=p.mode;if(['added-desc','added-asc','rating-desc','rating-asc','work'].includes(p.sort))view.sort=p.sort;}catch{}$('sortSelect').value=view.sort;refresh(true);
if(document.modelContext?.registerTool){const life=new AbortController();window.addEventListener('pagehide',()=>life.abort(),{once:true});const register=tool=>{try{Promise.resolve(document.modelContext.registerTool(tool,{signal:life.signal})).catch(()=>{})}catch{}};register({name:'search_character_archive',title:'查询角色档案',description:'按角色、作品或标签搜索当前浏览器中的档案，并显示结果。',inputSchema:{type:'object',properties:{query:{type:'string'},work:{type:'string'}},additionalProperties:false},annotations:{readOnlyHint:false,untrustedContentHint:true},execute(input){if(!input||typeof input!=='object'||Object.keys(input).some(k=>!['query','work'].includes(k))||Object.values(input).some(v=>typeof v!=='string'))throw Error('参数必须为 query 和 work 字符串');clearFilters();view.q=input.query||'';view.work=input.work||'';$('searchInput').value=view.q;$('workFilter').value=view.work;render();return getFiltered().map(c=>({id:c.id,name:c.nameZh,work:c.work,rating:c.rating}));}});register({name:'start_character_edit',title:'打开角色编辑',description:'打开现有角色的编辑表单；不会保存或修改档案。',inputSchema:{type:'object',properties:{id:{type:'string'}},required:['id'],additionalProperties:false},annotations:{readOnlyHint:false,untrustedContentHint:true},execute(input){if(!input||typeof input.id!=='string'||Object.keys(input).some(k=>k!=='id')||!records.some(c=>c.id===input.id))throw Error('角色 ID 无效');openEditor(input.id);return {id:input.id,status:'editing'};}});}
