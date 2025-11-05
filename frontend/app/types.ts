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
  | "chart"
  | "image"
  | "video";

export type ComponentNode = BaseNode & {
  type: "component";
  kind: ComponentKind;
  props: Record<string, unknown>;
  children?: never;
};

export type HeadingComponentNode = ComponentNode & { kind: "heading" };

export type ParagraphComponentNode = ComponentNode & { kind: "paragraph" };

export type TableComponentNode = ComponentNode & { kind: "table" };

export type ListComponentNode = ComponentNode & { kind: "list" };

export type ChartComponentNode = ComponentNode & { kind: "chart" };

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

type DraftBase = {
  id: string;
  type: "component";
  targetParentId: string | null;
  styles: Record<string, string>;
};

export type TextDraft = DraftBase & {
  draft: "text";
  kind: "heading" | "paragraph";
  props: { text: string };
};

export type TableDraft = DraftBase & {
  kind: "table";
  props: { headers: string[]; data: string[][]; editCell: string | null };
};

export type ListDraft = DraftBase & {
  kind: "list";
  props: { items: string[]; editItem: number | null };
};

export type ChartDraft = DraftBase & {
  kind: "chart";
  props: { data: unknown[]; editIdx: number | null };
};

export type ComponentDraft =
  | TextDraft
  | TableDraft
  | ListDraft
  | ChartDraft
  | null;

export type DraftState = ComponentDraft;
