const vm=require('node:vm'),fs=require('node:fs'),assert=require('node:assert/strict'),path=require('node:path');
function element(){return {value:'',hidden:true,children:[],dataset:{},style:{},classList:{toggle(){}},append(...x){this.children.push(...x)},before(){},after(){},remove(){},insertBefore(){},focus(){},setAttribute(){},querySelectorAll(){return []},querySelector(){return element()},addEventListener(){}}}
const els=new Map();const el=k=>{if(!els.has(k))els.set(k,element());return els.get(k)};
let sent;
const ctx=vm.createContext({console,Intl,Date,Map,Set,Number,String,Math,encodeURIComponent,setTimeout,AbortSignal,window:{},fetch:async(url,options)=>{if(url==='/api/status')return {json:async()=>({configured:true})};sent=JSON.parse(options.body);return {ok:true,json:async()=>({answer:'Демоанализ окружения',listing_id:null,highlight:'pharmacy'})}},document:{head:element(),querySelector:el,querySelectorAll:()=>[],addEventListener(){},createElement:element,createTextNode:x=>x}});
for(const file of ['app.js','pitch.js','listing-details.js'])vm.runInContext(fs.readFileSync(path.join(__dirname,'site',file),'utf8'),ctx);
vm.runInContext('startMap=()=>{}; const answers=[]; message=(text,own)=>{if(!own)answers.push(text)};',ctx);
vm.runInContext(fs.readFileSync(path.join(__dirname,'site/ai-chat.js'),'utf8'),ctx);
(async()=>{
 vm.runInContext('openDetail(demoRows[1])',ctx);
 await vm.runInContext("chat('Аптеки рядом')",ctx);
 assert.equal(sent.context.listings.length,35);
 assert.equal(sent.context.selected_id,'demo-1');
 assert(sent.context.selected_points.every(p=>p.distance_m<=750));
 assert.equal(vm.runInContext('category',ctx),'pharmacy');
 assert(vm.runInContext("answers.includes('Демоанализ окружения')",ctx));
 await vm.runInContext("chat('Почему?')",ctx);
 assert.equal(sent.history.length,2);
 console.log('PASS: AI chat receives 35 listings and nearby demo points, highlights pharmacies, retains conversation.');
})().catch(e=>{console.error(e);process.exitCode=1});
