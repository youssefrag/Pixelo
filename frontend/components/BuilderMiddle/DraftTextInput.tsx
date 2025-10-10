import { useState } from "react";
import { useSelector } from "react-redux";
import type { RootState, AppDispatch } from "@/store";

export default function DraftTextInput() {
  const { rootOrder, nodes } = useSelector(
    (state: RootState) => state.builderSlice
  );

  return (
    <input
      type="text"
      // value={value}
      // onChange={(e) => setValue(e.target.value)}
      placeholder="Type your heading..."
      className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-gray-400"
    />
  );
}
