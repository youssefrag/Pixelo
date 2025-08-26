type NodeType = "section" | "component";

export type Node = {
  id: string;
  type: NodeType;
  name: string;
  parentId: string | null;
  children: string[];
};

export type BuilderState = {
  rootOrder: string[];
  nodes: Record<string, Node>;
  selectedId: string | null;
  expanded: Record<string, boolean>;
};
