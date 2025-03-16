/** @type {import('next').NextConfig} */

import { fileURLToPath } from "node:url";
import { createJiti } from "jiti";

const jiti = createJiti(fileURLToPath(import.meta.url));

// Import env here to validate during build. Using jiti we can import .ts files :)
await jiti.import("./env/client.ts");
await jiti.import("./env/server.ts");

const nextConfig = {
  experimental: {
    reactCompiler: true,
  },
  transpilePackages: [
    "@workspace/ui",
    // "@t3-oss/env-nextjs", // If output is: "standalone" later, uncomment
    // "@t3-oss/env-core" // If output is: "standalone" later, uncomment
  ],
  images: {
    remotePatterns: [
      // {
      //   protocol: "https",
      //   hostname: "www.morphic.com",
      //   port: "",
      //   // pathname: "/account123/**",
      //   search: "",
      // },
    ],
  },
};

export default nextConfig;
