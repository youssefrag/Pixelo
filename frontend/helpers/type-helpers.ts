import {
  ComponentDraft,
  ComponentKind,
  TableDraft,
  TextDraft,
} from "@/app/types";

export const isTextKind = (k: ComponentKind): k is "heading" | "paragraph" =>
  k === "heading" || k === "paragraph";

export const isTextDraft = (draft: ComponentDraft): draft is TextDraft => {
  return draft?.kind === "heading" || draft?.kind === "paragraph";
};

export const isTableDraft = (draft: ComponentDraft): draft is TableDraft => {
  return !!draft && draft.kind === "table";
};

export const deepClone = <T>(x: T): T => JSON.parse(JSON.stringify(x));
