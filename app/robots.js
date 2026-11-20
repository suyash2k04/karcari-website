export default function robots() {
 const base = process.env.NEXT_PUBLIC_SITE_URL || "https://www.karcari.in";
 return {rules:[{userAgent:"*",allow:"/",disallow:["/admin","/api/admin"]}],sitemap:`${base}/sitemap.xml`};
}
