// Explicit one-time catalog refresh for existing deployments, preserving custom products.
// Back up the existing storage/catalog.json before running.
import fs from 'node:fs/promises';
import path from 'node:path';
const root=process.env.DATA_DIR || path.join(process.cwd(),'storage');
const file=path.join(root,'catalog.json');
const source=await fs.readFile(path.join(process.cwd(),'data/products.js'),'utf8');
const mod=await import('data:text/javascript;base64,'+Buffer.from(source).toString('base64'));
const originals=mod.premixProducts.map(p=>({...p,type:'premix'}));
await fs.mkdir(root,{recursive:true});
let existing=[];
try {existing=JSON.parse(await fs.readFile(file,'utf8'));if(!Array.isArray(existing))throw Error('Not an array');}
catch(e){if(e.code!=='ENOENT')throw e;}
if(existing.length){const backup=file+'.backup-'+new Date().toISOString().replace(/[:.]/g,'-');await fs.copyFile(file,backup);console.log('Backup:',backup);}
const existingById=new Map(existing.map(p=>[p.id,p]));
const updated=originals.map(p=>({...existingById.get(p.id),...p,published:p.published!==false}));
const originalIds=new Set(originals.map(p=>p.id));
const additional=existing.filter(p=>!originalIds.has(p.id));
const all=[...updated,...additional];
const temporary=file+'.tmp-'+process.pid;
await fs.writeFile(temporary,JSON.stringify(all,null,2),{mode:0o600});await fs.rename(temporary,file);
console.log(`Catalog updated: ${originals.length} current premixes, ${additional.length} existing other/custom products retained.`);
