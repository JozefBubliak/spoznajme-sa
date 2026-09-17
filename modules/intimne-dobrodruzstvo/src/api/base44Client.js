import tasks from '../data/tasks.json';
import positions from '../data/positions.json';
const read = key => { try { return JSON.parse(localStorage.getItem(key) || '{}'); } catch { return {}; } };
function entity(name, load) {
 const key = 'deeptalks-adventure-'+name+'-v1';
 return {
 async list() { const data=await load(), state=read(key); return data.map(item=>({...item,...state[item.id]})); },
 async update(id,data) { const allowed=name==='tasks'?['shown','status']:['is_favorite']; const changes=Object.fromEntries(Object.entries(data).filter(([k])=>allowed.includes(k))); const state=read(key);state[id]={...state[id],...changes};localStorage.setItem(key,JSON.stringify(state));return {id,...state[id]}; }
 };
}
export const base44={entities:{
 Task:entity('tasks',async()=>{const response=await fetch('/api/intimne-dobrodruzstvo/tasks',{cache:'no-store',credentials:'same-origin'});if(!response.ok)throw new Error(response.status===401||response.status===403?'Prihlásenie vypršalo. Prihlás sa znova v DeepTalks.':'Databáza úloh je momentálne nedostupná.');const result=await response.json();return result.tasks?.length?result.tasks:tasks;}),
 Position:entity('positions',async()=>positions)
},integrations:{Core:{async InvokeLLM(){window.dispatchEvent(new CustomEvent('adventure-notice',{detail:'AI služba zatiaľ nie je pripojená. Existujúce úlohy zostávajú k dispozícii.'}));return '';}}}};
