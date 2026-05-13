/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Ensure SSR-friendly module resolution for packages that ship CJS
  // and cause vendor-chunk issues in Next dev mode (e.g. react-icons).
  transpilePackages: ["react-icons", "react-undraw-illustrations"],
  experimental: {
    serverComponentsExternalPackages: [],
  },
};

module.exports = nextConfig;
