import { useState } from "react";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "@/app/firebase";

type UploadPrefix = "images" | "videos";

interface UseFirebaseUploadReturn {
  upload: (file: File) => Promise<string>;
  uploading: boolean;
  progress: number;
  error: string | null;
  reset: () => void;
}

export function useFirebaseUpload(
  pathPrefix: UploadPrefix
): UseFirebaseUploadReturn {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  async function upload(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      setError(null);
      setUploading(true);
      setProgress(0);

      const fileRef = ref(
        storage,
        `${pathPrefix}/${crypto.randomUUID()}-${file.name}`
      );

      const task = uploadBytesResumable(fileRef, file);

      task.on(
        "state_changed",
        (snapshot) => {
          const pct = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(pct);
        },
        (err) => {
          console.error("Firebase upload error:", err);
          setUploading(false);
          setError("Upload failed. Please try again.");
          reject(err);
        },
        async () => {
          try {
            const url = await getDownloadURL(task.snapshot.ref);
            setUploading(false);
            resolve(url);
          } catch (err) {
            console.error("Error getting download URL:", err);
            setUploading(false);
            setError("Could not get file URL.");
            reject(err);
          }
        }
      );
    });
  }

  function reset() {
    setUploading(false);
    setProgress(0);
    setError(null);
  }

  return { upload, uploading, progress, error, reset };
}
