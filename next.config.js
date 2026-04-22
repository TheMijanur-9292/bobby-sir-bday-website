/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",   // static export → generates /out folder for Netlify
  images: {
    unoptimized: true, // required for static export with remote images
    remotePatterns: [
      {
        protocol: "https",
        hostname: "media.licdn.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "**.licdn.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "contacts.zoho.in",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "**.zoho.in",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
