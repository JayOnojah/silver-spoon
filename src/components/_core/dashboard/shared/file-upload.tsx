"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { IconCloudUpload } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

interface FileUploadProps {
  label?: string;
  required?: boolean;
  accept?: string;
  value?: File | null;
  onChange?: (file: File | null) => void;
  error?: string;
  className?: string;
  previewClassName?: string;
  showPreview?: boolean;
  maxSize?: number; // in bytes
}

const FileUpload = ({
  label,
  required = false,
  accept = "image/*",
  value,
  onChange,
  error,
  className,
  previewClassName,
  showPreview = true,
  maxSize,
}: FileUploadProps) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback(
    (file: File | null) => {
      if (file) {
        // Validate file size if maxSize is provided
        if (maxSize && file.size > maxSize) {
          const maxSizeMB = (maxSize / (1024 * 1024)).toFixed(2);
          alert(`File size exceeds ${maxSizeMB}MB`);
          return;
        }

        // Generate preview for images
        if (showPreview && file.type.startsWith("image/")) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setPreview(reader.result as string);
          };
          reader.readAsDataURL(file);
        }
      } else {
        setPreview(null);
      }

      onChange?.(file);
    },
    [onChange, maxSize, showPreview],
  );

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

    const file = e.dataTransfer.files[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    handleFile(file);
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  // Update preview when value changes externally
  useEffect(() => {
    if (value && showPreview && value.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(value);
    } else if (!value) {
      setPreview(null);
    }
  }, [value, showPreview]);

  return (
    <div className={cn("space-y-2", className)}>
      {label && (
        <label className="text-sm font-medium text-[#4B5565]">
          {label}
          {required && <span className="text-destructive">*</span>}
        </label>
      )}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
        className={cn(
          "border-2 mt-1 border-dashed border-primary rounded-xl p-8 bg-[#FFF1EC] cursor-pointer transition-colors",
          isDragging && "bg-[#FFE8E0] border-primary/80",
          !isDragging && "hover:bg-[#FFE8E0]",
          error && "border-destructive",
        )}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          className="hidden"
          onChange={handleFileInputChange}
        />
        {preview && showPreview ? (
          <div className="flex flex-col items-center gap-2">
            <img
              src={preview}
              alt="Preview"
              className={cn(
                "max-h-32 max-w-full object-contain",
                previewClassName,
              )}
            />
            <p className="text-sm text-[#4B5565]">
              Click to change or drag & drop
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3">
            <IconCloudUpload className="size-8 text-foreground" />
            <p className="text-sm text-center">
              <span className="text-primary">Click to upload</span>{" "}
              <span className="text-[#4B5565]">
                or drag & drop your document here
              </span>
            </p>
          </div>
        )}
      </div>
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
};

export { FileUpload };
