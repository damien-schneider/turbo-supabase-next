/** @type {import('next').NextConfig} */

import { fileURLToPath } from "node:url";
import createMDX from "@next/mdx";
import { createJiti } from "jiti";

const jiti = createJiti(fileURLToPath(import.meta.url));

// Import env here to validate during build. Using jiti we can import .ts files :)
await jiti.import("./env/client.ts");
await jiti.import("./env/server.ts");

const nextConfig = {
  experimental: {
    reactCompiler: true,
  },
  // Configure `pageExtensions` to include markdown and MDX files
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
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
const withMDX = createMDX({
  // Add markdown plugins here, as desired
});

export default withMDX(nextConfig);
