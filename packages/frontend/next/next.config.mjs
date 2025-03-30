/** @type {import('next').NextConfig} */
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "1337",
      },
    ],
  },
  transpilePackages: ["@rrrcn/common-types", "@rrrcn/frontend-helpers"],

  webpack: (config) => {
    config.resolve.symlinks = false;
    return config;
  },
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },
  experimental: {
    // this includes files from the monorepo base two directories up
    outputFileTracingRoot: path.join(__dirname, "../../"),
  },
  output: "standalone",
  async redirects() {
    return [
      {
        source: "/",
        destination: "/map",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
