const fs=require('fs');const d=process.argv[2];
const ss=fs.readFileSync(d+'/xl/sharedStrings.xml','utf8');
const dec=s=>s.replace(/<[^>]+>/g,'').replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&quot;/g,'"').replace(/&apos;/g,"'");
const strs=[...ss.matchAll(/<si>([\s\S]*?)<\/si>/g)].map(m=>dec(m[1].replace(/<rPh[\s\S]*?<\/rPh>/g,'')));
const sh=fs.readFileSync(d+'/xl/worksheets/sheet1.xml','utf8');
const rows=[];
for(const r of sh.matchAll(/<row [^>]*r="(\d+)"[^>]*>([\s\S]*?)<\/row>/g)){const o={};for(const c of r[2].matchAll(/<c r="([A-Z]+)\d+"([^>]*?)(?:\/>|>([\s\S]*?)<\/c>)/g)){const t=/t="s"/.test(c[2]),ti=/t="inlineStr"/.test(c[2]);let v=(c[3]||'').match(/<v>([\s\S]*?)<\/v>/);let val=ti?dec((c[3]||'')):v?(t?strs[+v[1]]:dec(v[1])):'';if(val!=='')o[c[1]]=val}rows.push([+r[1],o])}
fs.writeFileSync(process.argv[3],JSON.stringify(rows));console.log(rows.length);console.log(JSON.stringify(rows.slice(0,4)).slice(0,1500));
