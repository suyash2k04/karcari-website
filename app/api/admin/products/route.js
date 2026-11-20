import { NextResponse } from "next/server";
import { isAdmin, sameOrigin } from "@/lib/admin-auth";
import { premixGroups } from "@/data/products";
import { readCatalog, changeCatalog } from "@/lib/catalog-store";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
const deny = () => NextResponse.json({error:"Unauthorized"},{status:401});
const allowed = ["name","short","type","group","category","badge","packSize","yieldLabel","description","highlights","specs","proof","image","link","indiaMartUrl","accent","tint","published"];
function normalize(input, old = {}) {
  const val = { ...old };
  for (const key of allowed) if (Object.hasOwn(input,key)) val[key] = input[key];
  for (const key of allowed.filter(k => !["highlights","specs","published"].includes(k))) if (val[key] != null) val[key] = String(val[key]).trim().slice(0,key === "description" ? 3000 : 500);
  for (const key of ["highlights","specs"]) val[key] = (Array.isArray(val[key]) ? val[key] : []).map(x=>String(x).trim().slice(0,120)).filter(Boolean).slice(0,12);
  val.published = val.published !== false;
  if (!["premix","ingredient"].includes(val.type)) throw Error("Select a valid product type");
  if (!val.name) throw Error("Product name is required");
  if (val.published && !val.description) throw Error("Add a description before publishing");
  if (val.published && !val.image) throw Error("Upload a product image before publishing");
  if (val.type === "premix" && !premixGroups.some(group => group.id === val.group)) throw Error("Select a premix category");
  if (val.image && !val.image.startsWith("/media/") && !val.image.startsWith("/uploads/") && !val.image.startsWith("/products/") && !val.image.startsWith("/ingredients/")) throw Error("Invalid image path");
  if (val.link && !/^https:\/\//.test(val.link)) throw Error("Retail link must start with https://");
  if (val.indiaMartUrl && !/^https:\/\/www\.indiamart\.com\/proddetail\//i.test(val.indiaMartUrl)) throw Error("Use a valid IndiaMART product URL");
  if (val.accent && !/^#[0-9a-fA-F]{6}$/.test(val.accent)) throw Error("Invalid accent color");
  if (val.tint && !/^#[0-9a-fA-F]{6}$/.test(val.tint)) throw Error("Invalid background color");
  return val;
}
export async function GET() { if (!(await isAdmin())) return deny(); return NextResponse.json(await readCatalog(),{headers:{"Cache-Control":"no-store"}}); }
export async function POST(request) {
  if (!(await isAdmin())) return deny(); if (!(await sameOrigin(request))) return NextResponse.json({error:"Invalid origin"},{status:403});
  try {
    const body = await request.json(); const product = normalize(body);
    product.id = crypto.randomUUID(); product.index = "";
    await changeCatalog(items => [...items, product]);
    return NextResponse.json(product,{status:201});
  } catch(e) { return NextResponse.json({error:e.message},{status:400}); }
}
export async function PUT(request) {
  if (!(await isAdmin())) return deny(); if (!(await sameOrigin(request))) return NextResponse.json({error:"Invalid origin"},{status:403});
  try {
    const body = await request.json(); if (typeof body.id !== "string") throw Error("Missing product ID");
    let updated;
    await changeCatalog(items => { const i=items.findIndex(x=>x.id===body.id); if(i<0) throw Error("Product not found"); updated=normalize(body,items[i]); return items.map((p,j)=>j===i? updated:p); });
    return NextResponse.json(updated);
  } catch(e) { return NextResponse.json({error:e.message},{status:400}); }
}
export async function DELETE(request) {
  if (!(await isAdmin())) return deny(); if (!(await sameOrigin(request))) return NextResponse.json({error:"Invalid origin"},{status:403});
  try { const {id}=await request.json(); if(typeof id!=="string") throw Error("Missing ID");
    await changeCatalog(items => {if(!items.some(p=>p.id===id))throw Error("Product not found");return items.filter(p=>p.id!==id)});
    return NextResponse.json({ok:true});
  } catch(e) {return NextResponse.json({error:e.message},{status:400})}
}
