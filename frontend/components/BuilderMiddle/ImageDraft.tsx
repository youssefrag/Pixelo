"use client";

import { isImageDraft } from "@/helpers/type-helpers";
import { useFirebaseUpload } from "@/hooks/useFirebaseUpload";
import { RootState } from "@/store";
import { uploadImage } from "@/store/slices/builderSlice";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";

export default function ImageDraft() {
  const { ui } = useSelector((state: RootState) => state.builderSlice);

  const dispatch = useDispatch();

  const { draft } = ui;

  if (!draft) return null;

  if (!isImageDraft(draft)) return null;

  const { upload, uploading, progress, error, reset } =
    useFirebaseUpload("images");

  const [localError, setLocalError] = useState<string | null>(null);

  const url = (draft.props as any)?.url as string | null;

  console.log({ url });

  const handleFile = useCallback(
    async (file: File | undefined) => {
      if (!file) return;

      if (!file.type.startsWith("image/")) {
        setLocalError("Please upload an image file (jpg, png, etc.)");
        return;
      }

      setLocalError(null);
      reset();

      try {
        const url = await upload(file);

        dispatch(uploadImage({ url }));
      } catch (e) {
        console.error(e);
        setLocalError("Upload failed. Please try again.");
      }
    },
    [dispatch, draft, upload, reset]
  );

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      await handleFile(acceptedFiles[0]);
    },
    [handleFile]
  );

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: false,
    noClick: true,
    noKeyboard: true,
  });

  const { styles } = draft;

  console.log(styles);

  const { widthPct, opacity, borderRadius } = styles;

  return (
    <div className="space-y-4">
      {/* Drag & Drop area */}
      <div
        {...getRootProps()}
        className={`
          flex flex-col items-center justify-center gap-4
          rounded-xl border-2 border-blue-500 bg-blue-950/30
          px-6 py-10
          transition
          ${isDragActive ? "bg-blue-900 border-blue-400" : ""}
        `}
      >
        <input {...getInputProps()} />
        <p className="text-base text-blue-200 text-center">
          {isDragActive ? "Drop the image here…" : "Drag & drop an image here"}
        </p>

        {/* Upload button (opens file dialog) */}
        <button
          type="button"
          onClick={open}
          className="
            px-4 py-2 rounded-md
           bg-blue-600 text-white
           hover:bg-blue-700
            transition
          "
        >
          {!url && <div>Upload Image</div>}
          {url && <div>Replace Image</div>}
        </button>
        {uploading && (
          <div className="w-full max-w-xs">
            <div className="h-2 rounded-full bg-blue-900 overflow-hidden">
              <div
                className="h-full bg-blue-400"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="mt-2 text-sm text-blue-200 text-center">
              Uploading… {progress.toFixed(0)}%
            </p>
          </div>
        )}

        {(error || localError) && (
          <p className="mt-2 text-xs text-red-400 text-center">
            {localError ?? error}
          </p>
        )}
      </div>

      {url && (
        <div
          className="rounded-xl overflow-hidden bg-black/20"
          style={{ width: `${widthPct}%` }}
        >
          <img src={url} alt="" className="block w-full h-auto" />
        </div>
      )}
    </div>
  );
}
