import { ComponentKind } from "@/app/types";

export const isTextKind = (k: ComponentKind): k is "heading" | "paragraph" =>
  k === "heading" || k === "paragraph";

export const deepClone = <T>(x: T): T => JSON.parse(JSON.stringify(x));
