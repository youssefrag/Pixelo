"use client";

import { useSelector } from "react-redux";

import SectionRender from "@/components/BuilderMiddle/SectionRender";
import { RootState } from "@/store";

export default function Builder() {
  const { rootOrder, nodes } = useSelector(
    (state: RootState) => state.builderSlice
  );

  return (
    <>
      {rootOrder.map((id) => {
        if (nodes[id].type === "section")
          return <SectionRender key={id} sectionId={id} />;
      })}
    </>
  );
}
