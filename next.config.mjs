/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  /* Nothing needs to know the server stack, and it is a header on every
     response. */
  poweredByHeader: false,

  /* Every internal href in this site is written with a trailing slash (the
     design reference used that convention and the sitemap follows it). Without
     this flag Next would 308-redirect each one to the slash-less form, adding a
     round trip to every navigation and a redirect chain for crawlers. */
  trailingSlash: true,

  images: {
    formats: ["image/avif", "image/webp"],
    /* Uploads from the admin media library live in Supabase Storage. */
    remotePatterns: [{ protocol: "https", hostname: "*.supabase.co", pathname: "/storage/v1/object/public/**" }],
  },

};

export default nextConfig;
