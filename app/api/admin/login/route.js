import { NextResponse } from "next/server";
import { validCredentials, setCookie, token, sameOrigin } from "@/lib/admin-auth";
const attempts = new Map();
export async function POST(request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const now=Date.now();
  const entry=attempts.get(ip) || {count:0,until:0};
  if(entry.until>now) return NextResponse.json({error:"Too many attempts. Please try again later."},{status:429});

  if (!(await sameOrigin(request))) return NextResponse.json({error:"Invalid origin"},{status:403});
  try {
    const { username, password } = await request.json();
    if (!validCredentials(username, password)) {
      const count=entry.count+1;
      attempts.set(ip,{count:count>=8?0:count,until:count>=8?now+15*60*1000:0});
      return NextResponse.json({error:"Invalid credentials"},{status:401});
    }
    attempts.delete(ip);
    const res = NextResponse.json({ok:true}); setCookie(res, token()); return res;
  } catch (e) { return NextResponse.json({error: e instanceof SyntaxError ? "Invalid request" : "Admin credentials not configured"},{status:400}); }
}
