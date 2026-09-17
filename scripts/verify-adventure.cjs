const fs=require('fs'),assert=require('node:assert/strict'),Module=require('module');
const root=process.cwd();
const req=Module.createRequire(root+'/package.json');
const ts=req('typescript');
let session=null,dbCalls=0;
function load(file,mocks={}){const source=fs.readFileSync(root+'/'+file,'utf8');const code=ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020,esModuleInterop:true}}).outputText;const module={exports:{}};new Function('require','module','exports',code)((id)=>id in mocks?mocks[id]:req(id),module,module.exports);return module.exports;}
const access=load('src/lib/adventure-access.ts',{'server-only':{},'@/app/api/games/_session':{getSession:async()=>session}});
const route=load('src/app/intimne-dobrodruzstvo/[[...file]]/route.ts',{'@/lib/adventure-access':access});
const api=load('src/app/api/intimne-dobrodruzstvo/tasks/route.ts',{'@/lib/adventure-access':access,'@/lib/supabase/admin':{supabaseAdmin(){dbCalls++;throw Error('Unexpected database access');}}});
const request=new (req('next/server').NextRequest)('http://localhost:4188/intimne-dobrodruzstvo/');
const get=(file=[])=>route.GET(request,{params:Promise.resolve({file})});
(async()=>{
 let response=await get();assert.equal(response.status,307);assert.match(response.headers.get('location'),/auth\/login/);
 assert.equal((await get(['assets','test.js'])).status,404);
 assert.equal((await api.GET()).status,403);assert.equal(dbCalls,0);
 session={user:{email:'someone@example.com',email_confirmed_at:'2026-01-01'}};
 assert.equal(await access.adventureAccess(),'denied');assert.equal((await get()).status,404);assert.equal((await api.GET()).status,403);
 session={user:{email:'jozef.bubliak@gmail.com'}};assert.equal(await access.adventureAccess(),'denied');
 session={user:{email:'JOZEF.BUBLIAK@GMAIL.COM',email_confirmed_at:'2026-01-01'}};
 assert.equal(await access.adventureAccess(),'owner');response=await get();assert.equal(response.status,200);assert.match(await response.text(),/Intímne dobrodružstvo/);assert.match(response.headers.get('cache-control'),/no-store/);
 const asset=fs.readdirSync(root+'/modules/intimne-dobrodruzstvo/dist/assets').find(f=>f.endsWith('.js'));
 assert.equal((await get(['assets',asset])).status,200);
 assert.equal((await get(['..','package.json'])).status,404);assert.equal((await get(['src','App.jsx'])).status,404);
 assert.equal(fs.existsSync(root+'/public/intimne-dobrodruzstvo'),false);
 console.log('PASS: anonymous, other-account, unverified-email, owner, HTML/assets, API denial, no-store, traversal, removed public bypass.');
})().catch(e=>{console.error(e);process.exit(1)});
