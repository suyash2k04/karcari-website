export default function sitemap() {
 const base = process.env.NEXT_PUBLIC_SITE_URL || "https://www.karcari.in";
 return [{url:base,lastModified:new Date(),changeFrequency:"weekly",priority:1}];
}
