/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Full static export: nothing in this project needs a server at
  // request time (every dynamic route uses generateStaticParams, no
  // API routes/server actions/middleware). This is what lets it deploy
  // to Cloudflare Pages directly, with no adapter.
  output: "export",
};

export default nextConfig;
