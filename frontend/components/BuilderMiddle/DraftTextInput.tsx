import { useState } from "react";
import { useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "@/store";

import { updateTextDraftContent } from "@/store/slices/builderSlice";

export default function DraftTextInput() {
  const dispatch = useDispatch<AppDispatch>();

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateTextDraftContent(e.target.value));
  };

  return (
    <input
      type="text"
      onChange={handleTextChange}
      placeholder="Type your heading..."
      className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-gray-400"
    />
  );
}
