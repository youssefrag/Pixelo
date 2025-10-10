type BaseNode = {
  id: string;
  name: string;
  parentId: string | null;
  depth: number;
  styles: Record<string, string>;
};

export type SectionNode = BaseNode & {
  type: "section";
  children: string[];
};

export type ComponentKind =
  | "heading"
  | "paragraph"
  | "list"
  | "table"
  | "image"
  | "video";

export type ComponentNode = BaseNode & {
  type: "component";
  kind: ComponentKind;
  props: Record<string, unknown>;
  children?: never;
};

export type BuilderNode = SectionNode | ComponentNode;

export type BuilderState = {
  rootOrder: string[];
  nodes: Record<string, BuilderNode>;
  selectedId: string | null;
  expanded: string[];
  ui: {
    leftBar: LeftBarTab;
    draft: DraftState;
  };
};

export type LeftBarTab =
  | { tab: "layout" }
  | { tab: "component"; parentId: string };

export const isSection = (n: BuilderNode): n is SectionNode =>
  n.type === "section";
export const isComponent = (n: BuilderNode): n is ComponentNode =>
  n.type === "component";

export type TextDraft = {
  id: string;
  kind: "heading" | "paragraph";
  targetParentId: string | null;
  props: { text: string };
  styles: Record<string, string>;
};

export type DraftState = TextDraft | null;
