import fs from 'node:fs/promises';
import path from 'node:path';
const root = process.env.DATA_DIR || path.join(process.cwd(), 'storage');
const file = path.join(root, 'catalog.json');
const urls = {
  'sprouted-moong-chilla': 'https://www.indiamart.com/proddetail/karcari-sprouted-moong-chilla-premix-powder-2859373289848.html',
  'puran-poli': 'https://www.indiamart.com/proddetail/karcari-puran-poli-premix-powder-2859367875155.html'
};
let catalog;
try { catalog = JSON.parse(await fs.readFile(file, 'utf8')); }
catch (e) { if(e.code === 'ENOENT'){ console.log('No stored catalogue: links are already included in the default seed.'); process.exit(0); } throw e; }
if(!Array.isArray(catalog)) throw new Error('Catalog format is not an array');
let updated=0;
for (const product of catalog) if (Object.hasOwn(urls, product.id)) { product.indiaMartUrl = urls[product.id]; updated++; }
const backup = `${file}.before-indiamart.bak`;
await fs.copyFile(file,backup);
const temp = `${file}.${process.pid}.tmp`;
await fs.writeFile(temp,JSON.stringify(catalog,null,2));
await fs.rename(temp,file);
console.log(`Updated ${updated} IndiaMART URLs. Backup: ${backup}`);
