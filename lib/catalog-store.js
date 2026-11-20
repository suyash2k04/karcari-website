import "server-only";
import fs from "node:fs/promises";
import path from "node:path";
import { premixProducts, ingredientProducts } from "@/data/products";

// Set DATA_DIR to a persistent mounted volume in production.
const root = process.env.DATA_DIR || path.join(process.cwd(), "storage");
const filename = path.join(root, "catalog.json");
let queue = Promise.resolve();

function seed() {
  return [...premixProducts.map(x => ({...x, type: "premix", published: x.published !== false})),
    ...ingredientProducts.map(x => ({...x, type: "ingredient", published: x.published !== false}))];
}
export async function readCatalog() {
  try { const data = JSON.parse(await fs.readFile(filename, "utf8")); return Array.isArray(data) ? data : seed(); }
  catch (err) { if (err.code === "ENOENT") return seed(); throw err; }
}
export async function changeCatalog(fn) {
  const job = queue.then(async () => {
    await fs.mkdir(root, { recursive: true });
    const catalog = await readCatalog();
    const updated = await fn(catalog);
    const temporary = `${filename}.${process.pid}.${crypto.randomUUID()}.tmp`;
    await fs.writeFile(temporary, JSON.stringify(updated, null, 2), { mode: 0o600 });
    await fs.rename(temporary, filename);
    return updated;
  });
  queue = job.catch(() => {});
  return job;
}
export async function publishedCatalog() {
  const all = await readCatalog();
  return { premixes: all.filter(p => p.type === "premix" && p.published !== false), ingredients: all.filter(p => p.type === "ingredient" && p.published !== false) };
}
