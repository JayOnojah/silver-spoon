"use client";

import { useState, useRef, useEffect } from "react";
import { IconCloudUpload, IconX, IconEye } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

const Gallery = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [fileUrls, setFileUrls] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const fileUrlsRef = useRef<string[]>([]);

  // Keep ref in sync with state for cleanup
  useEffect(() => {
    fileUrlsRef.current = fileUrls;
  }, [fileUrls]);

  // Cleanup object URLs on unmount
  useEffect(() => {
    return () => {
      fileUrlsRef.current.forEach((url) => URL.revokeObjectURL(url));
    };
  }, []);

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

    const files = Array.from(e.dataTransfer.files).filter((file) =>
      file.type.startsWith("image/"),
    );
    if (files.length > 0) {
      const urls = files.map((file) => URL.createObjectURL(file));
      setSelectedFiles((prev) => [...prev, ...files]);
      setFileUrls((prev) => [...prev, ...urls]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []).filter((file) =>
      file.type.startsWith("image/"),
    );
    if (files.length > 0) {
      const urls = files.map((file) => URL.createObjectURL(file));
      setSelectedFiles((prev) => [...prev, ...files]);
      setFileUrls((prev) => [...prev, ...urls]);
    }
    // Reset input to allow selecting the same file again
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveFile = (index: number) => {
    // Revoke the object URL for the removed file
    if (fileUrls[index]) {
      URL.revokeObjectURL(fileUrls[index]);
    }
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
    setFileUrls((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Portfolio Gallery
        </h2>
        <p className="text-sm text-[#9AA4B2]">
          Showcase your best work with a stunning portfolio gallery
        </p>
      </div>

      {/* Upload Section */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-[#4B5565]">
          Upload Images <span className="text-destructive">*</span>
        </label>

        {/* Upload Area */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={handleClick}
          className={cn(
            "border-2 border-dashed rounded-xl p-8 bg-[#FFF1EC] cursor-pointer transition-colors",
            isDragging
              ? "border-primary bg-[#FFE8E0]"
              : "border-primary hover:bg-[#FFE8E0]",
          )}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={handleFileInputChange}
          />
          <div className="flex flex-col items-center gap-3">
            <IconCloudUpload className="size-8 text-foreground" />
            <p className="text-sm text-center">
              <span className="text-primary">Click to upload</span>{" "}
              <span className="text-[#4B5565]">
                or drag & drop your files here (Image size 500 x 500)
              </span>
            </p>
          </div>
        </div>

        {/* Thumbnail Previews */}
        {selectedFiles.length > 0 && (
          <div className="flex gap-3 overflow-x-auto pb-2">
            {selectedFiles.map((file, index) => (
              <div
                key={index}
                className="relative shrink-0 w-20 h-20 rounded-lg overflow-hidden border border-[#E5E7EB]"
              >
                <img
                  src={fileUrls[index]}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveFile(index);
                  }}
                  className="absolute top-1 right-1 bg-destructive text-white rounded-full p-1 hover:bg-destructive/90 transition-colors shadow-md"
                  aria-label="Remove image"
                >
                  <IconX className="size-3" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Image Preview Section */}
      {selectedFiles.length > 0 && (
        <div className="bg-[#F9FAFB] rounded-xl p-6 space-y-4">
          <div className="flex items-center gap-2">
            <IconEye className="size-5 text-[#4B5565]" />
            <h3 className="text-sm font-medium text-[#4B5565]">Image Preview</h3>
          </div>

          {/* Preview Grid */}
          <div className="grid grid-cols-3 gap-4 p-5 rounded-xl border">
            {selectedFiles.map((file, index) => (
              <div
                key={index}
                className="relative aspect-square rounded-lg overflow-hidden border-[#E5E7EB] bg-white"
              >
                <img
                  src={fileUrls[index]}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
