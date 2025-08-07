import type { NextConfig } from "next";

// Tell TS what this plugin does
declare module "next-plugin-svgr" {
  function withSvgr(config: NextConfig): NextConfig;
  export default withSvgr;
}
