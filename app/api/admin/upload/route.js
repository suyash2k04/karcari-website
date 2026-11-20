import { NextResponse } from "next/server";
import { isAdmin, sameOrigin } from "@/lib/admin-auth";
import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
export const runtime="nodejs";
export async function POST(request) {
 if(!(await isAdmin()))return NextResponse.json({error:"Unauthorized"},{status:401});
 if(!(await sameOrigin(request)))return NextResponse.json({error:"Invalid origin"},{status:403});
 try {
  const form=await request.formData(),file=form.get("file");
  if(!(file instanceof File)||file.size===0||file.size>8*1024*1024)return NextResponse.json({error:"Choose an image under 8 MB"},{status:400});
  if(!["image/jpeg","image/png","image/webp","image/avif"].includes(file.type))throw Error("Upload JPG, PNG, WebP or AVIF images only");
  const input=Buffer.from(await file.arrayBuffer());
  const output=await sharp(input,{limitInputPixels:30_000_000}).rotate().resize({width:1400,height:1600,fit:"inside",withoutEnlargement:true}).webp({quality:86}).toBuffer();
  const name=`${crypto.randomUUID()}.webp`;
  const dir=path.join(process.env.DATA_DIR || path.join(process.cwd(),"storage"),"uploads");await fs.mkdir(dir,{recursive:true});await fs.writeFile(path.join(dir,name),output,{flag:"wx"});
  return NextResponse.json({url:`/media/${name}`});
 }catch(e){return NextResponse.json({error:e.message || "Upload failed"},{status:400})}
}
