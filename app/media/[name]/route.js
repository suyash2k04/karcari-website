import { NextResponse } from "next/server";
import fs from "node:fs/promises";
import path from "node:path";
export const runtime = "nodejs";
export async function GET(_request, {params}) {
 const {name}=await params;
 if(!/^[0-9a-f-]{36}\.webp$/.test(name))return new Response("Not found",{status:404});
 try {
  const file=await fs.readFile(path.join(process.env.DATA_DIR || path.join(process.cwd(),"storage"),"uploads",name));
  return new Response(file,{headers:{"Content-Type":"image/webp","Cache-Control":"public, max-age=31536000, immutable","X-Content-Type-Options":"nosniff"}});
 }catch{return new Response("Not found",{status:404})}
}
