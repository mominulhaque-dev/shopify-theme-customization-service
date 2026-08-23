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
  },

  async redirects() {
    return [
      /* The three case studies the homepage linked to before they had real
         slugs. Kept so any shared or indexed URL still resolves. */
      {
        source: "/work/client-slug-1",
        destination: "/work/apparel-dawn-product-page/",
        permanent: true,
      },
      {
        source: "/work/client-slug-2",
        destination: "/work/home-goods-prestige-brand-system/",
        permanent: true,
      },
      {
        source: "/work/client-slug-3",
        destination: "/work/accessories-brooklyn-to-dawn-migration/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
