import { memo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretRight,
  faCaretDown,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import type { Node } from "@/store/slices/builderSlice";

type NodesMap = Record<string, Node>;

type TreeProps = {
  ids: string[];
  nodes: NodesMap;
  selectedId: string | null;
  isOpen: (id: string) => boolean;
  onToggleExpand: (id: string) => void;
  onSelect: (id: string) => void;
  onAddChild?: (parentId: string) => void;
  depth?: number;
};

export const SectionTree = memo(function SectionTree({
  ids,
  nodes,
  selectedId,
  isOpen,
  onToggleExpand,
  onSelect,
  onAddChild,
  depth = 0,
}: TreeProps) {
  return (
    <ul className="space-y-1">
      {ids.map((id) => (
        <SectionNode
          key={id}
          id={id}
          nodes={nodes}
          selectedId={selectedId}
          isOpen={isOpen}
          onToggleExpand={onToggleExpand}
          onSelect={onSelect}
          onAddChild={onAddChild}
          depth={depth}
        />
      ))}
    </ul>
  );
});

type NodeProps = {
  id: string;
  nodes: NodesMap;
  selectedId: string | null;
  isOpen: (id: string) => boolean;
  onToggleExpand: (id: string) => void;
  onSelect: (id: string) => void;
  onAddChild?: (parentId: string) => void;
  depth: number;
};

const SectionNode = memo(function SectionNode({
  id,
  nodes,
  selectedId,
  isOpen,
  onToggleExpand,
  onSelect,
  onAddChild,
  depth,
}: NodeProps) {
  const node = nodes[id];
  if (!node) return null;

  const open = isOpen(id);
  const isSelected = selectedId === id;

  return (
    <li>
      <div
        className={`flex items-center gap-2 rounded-md cursor-pointer py-1 px-2 ${
          isSelected ? "bg-orange-100 text-orange-700" : "hover:bg-gray-100"
        }`}
        style={{ paddingLeft: depth * 16 + 8 }}
        onClick={() => onSelect(id)}
      >
        <button
          type="button"
          className="shrink-0"
          onClick={(e) => {
            e.stopPropagation();
            onToggleExpand(id);
          }}
          aria-label={open ? "Collapse" : "Expand"}
        >
          <FontAwesomeIcon icon={open ? faCaretDown : faCaretRight} />
        </button>

        <span className="flex-1 truncate">{node.name}</span>

        {onAddChild && (
          <button
            type="button"
            className="text-white bg-[#FF7A00] text-xs px-2 py-1 rounded-md"
            onClick={(e) => {
              e.stopPropagation();
              onAddChild?.(id);
            }}
          >
            <FontAwesomeIcon icon={faPlus} />
          </button>
        )}
      </div>

      {open && node.children.length > 0 && (
        <SectionTree
          ids={node.children}
          nodes={nodes}
          selectedId={selectedId}
          isOpen={isOpen}
          onToggleExpand={onToggleExpand}
          onSelect={onSelect}
          onAddChild={onAddChild}
          depth={depth + 1}
        />
      )}
    </li>
  );
});
