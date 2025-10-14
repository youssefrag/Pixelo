import type { NextConfig } from "next";

declare module "*.css";

// Tell TS what this plugin does
declare module "next-plugin-svgr" {
  function withSvgr(config: NextConfig): NextConfig;
  export default withSvgr;
}
