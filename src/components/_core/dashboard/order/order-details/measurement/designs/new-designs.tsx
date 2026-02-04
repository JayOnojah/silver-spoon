"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { IconPhotoUp, IconX } from "@tabler/icons-react";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export interface UploadedFileEntry {
  id: string;
  file: File;
  preview: string;
}

interface NewDesignsProps {
  onFilesChange?: (files: File[]) => void;
  /** When this transitions from true to false, uploaded files are cleared (e.g. pass dialog open state). */
  resetWhen?: boolean;
}

const NewDesigns = ({ onFilesChange, resetWhen }: NewDesignsProps) => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFileEntry[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const prevResetWhen = useRef(resetWhen);

  const addFiles = useCallback((files: FileList | null) => {
    if (!files?.length) return;
    const newEntries: UploadedFileEntry[] = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (!file.type.startsWith("image/")) continue;
      newEntries.push({
        id: crypto.randomUUID(),
        file,
        preview: URL.createObjectURL(file),
      });
    }
    setUploadedFiles((prev) => [...prev, ...newEntries]);
  }, []);

  const removeFile = useCallback((id: string) => {
    setUploadedFiles((prev) => {
      const removed = prev.find((f) => f.id === id);
      if (removed) URL.revokeObjectURL(removed.preview);
      const next = prev.filter((f) => f.id !== id);
      return next;
    });
  }, []);

  useEffect(() => {
    onFilesChange?.(uploadedFiles.map((u) => u.file));
  }, [uploadedFiles, onFilesChange]);

  useEffect(() => {
    if (prevResetWhen.current && !resetWhen) {
      setUploadedFiles((prev) => {
        prev.forEach((u) => URL.revokeObjectURL(u.preview));
        return [];
      });
    }
    prevResetWhen.current = resetWhen;
  }, [resetWhen]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    addFiles(e.dataTransfer.files);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    addFiles(e.target.files);
    e.target.value = "";
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label className="text-sm font-semibold text-[#4B5565]">
          Upload Images <span className="text-[#EF4444]">*</span>
        </Label>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          className="sr-only"
          onChange={handleFileInputChange}
        />
        <div
          role="button"
          tabIndex={0}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              fileInputRef.current?.click();
            }
          }}
          className={cn(
            "border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors min-h-35",
            isDragging
              ? "border-primary bg-primary/5"
              : "border-[#CDD5DF] hover:border-[#9AA4B2] hover:bg-[#F9FAFB]",
          )}
        >
          <IconPhotoUp className="size-10 text-[#9AA4B2]" />
          <p className="text-sm text-center text-[#4B5565]">
            <span className="text-primary underline font-medium">
              Click to upload
            </span>{" "}
            or drag & drop your files here
          </p>
          <p className="text-xs text-[#9AA4B2]">
            (Image size 500 x 500)
          </p>
        </div>
      </div>

      {uploadedFiles.length > 0 && (
        <div className="grid grid-cols-4 gap-2">
          {uploadedFiles.map((item) => (
            <div
              key={item.id}
              className="relative aspect-square rounded-lg overflow-hidden bg-[#F9FAFB] border border-[#E5E7EB] group"
            >
              <img
                src={item.preview}
                alt=""
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  removeFile(item.id);
                }}
                className="absolute top-1 right-1 size-6 rounded-full bg-white/90 border border-[#E5E7EB] flex items-center justify-center text-[#4B5565] hover:bg-white hover:text-foreground shadow-sm"
                aria-label="Remove image"
              >
                <IconX className="size-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NewDesigns;
