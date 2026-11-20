import { NextResponse } from "next/server";
import { isAdmin, sameOrigin, setCookie } from "@/lib/admin-auth";
export async function POST(request) {
  if (!(await sameOrigin(request)) || !(await isAdmin())) return NextResponse.json({error:"Forbidden"},{status:403});
  const res = NextResponse.json({ok:true}); setCookie(res, ""); res.cookies.set("karcari_admin", "", {httpOnly:true, sameSite:"strict", path:"/", maxAge:0}); return res;
}
