/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // All website imagery is bundled locally under /public.
    // WebP output keeps hosted pages fast without runtime CDN dependencies.
    formats: ["image/webp"],
    qualities: [75, 85]
  }
};

export default nextConfig;
