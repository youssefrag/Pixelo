import { isImageDraft } from "@/helpers/type-helpers";
import { RootState } from "@/store";
import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function ImageDraft() {
  const { ui } = useSelector((state: RootState) => state.builderSlice);

  const dispatch = useDispatch();

  const { draft } = ui;

  if (!draft) return null;

  if (!isImageDraft(draft)) return null;

  const [error, setError] = useState<string | null>(null);

  const handleFile = useCallback(
    async (file: File | undefined) => {
      if (!file) return;

      if (!file.type.startsWith("image/")) {
        setError("Please upload an image file (jpg, png, etc.)");
        return;
      }

      setError(null);

      try {
      } catch (error) {}
    },
    // [dispatch, draft, upload]
    []
  );

  return <div>ImageDraft</div>;
}
