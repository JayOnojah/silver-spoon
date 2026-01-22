"use client";

import { useState, useRef, useEffect } from "react";
import {
  IconArrowLeft,
  IconPalette,
  IconEye,
  IconShare,
  IconPencil,
  IconPhoto,
  IconX,
} from "@tabler/icons-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface AddDesignDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  catalogueName?: string;
  catalogueDescription?: string;
  designCount?: number;
  onBack?: () => void;
  onSubmit?: (files: File[]) => void;
}

const AddDesignDialog = ({
  open,
  onOpenChange,
  catalogueName = "Men's Face Cap",
  catalogueDescription = "Description",
  designCount = 0,
  onBack,
  onSubmit,
}: AddDesignDialogProps) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [fileUrls, setFileUrls] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const fileUrlsRef = useRef<string[]>([]);

  // Keep ref in sync with state
  useEffect(() => {
    fileUrlsRef.current = fileUrls;
  }, [fileUrls]);

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

  // Reset files when dialog closes
  useEffect(() => {
    if (!open && fileUrlsRef.current.length > 0) {
      // Clean up all object URLs
      fileUrlsRef.current.forEach((url) => URL.revokeObjectURL(url));
      setSelectedFiles([]);
      setFileUrls([]);
      fileUrlsRef.current = [];
    }
  }, [open]);

  // Cleanup object URLs on unmount
  useEffect(() => {
    return () => {
      fileUrlsRef.current.forEach((url) => {
        URL.revokeObjectURL(url);
      });
      fileUrlsRef.current = [];
    };
  }, []);

  const handleSubmit = () => {
    if (selectedFiles.length > 0) {
      onSubmit?.(selectedFiles);
      setSelectedFiles([]);
      onOpenChange(false);
    }
  };

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={true}
        className="max-w-125 w-[90vw] rounded-xl p-0 overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-[#E5E7EB]">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-[#4B5565] hover:text-foreground transition-colors"
          >
            <IconArrowLeft className="size-4" />
            <span className="text-sm font-medium">Back</span>
          </button>
          <h2 className="text-lg font-bold text-foreground">
            Add Design to Catalogue
          </h2>
          <div className="w-20" /> {/* Spacer for centering */}
        </div>

        <div className="px-6 py-6 space-y-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {/* Catalogue Item Details Section */}
          <div className="bg-[#FFF1EC] rounded-xl p-4 border border-[#FFE8E0]">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3 flex-1">
                <div className="bg-white rounded-lg p-2.5 shrink-0">
                  <IconPalette className="size-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-bold text-foreground mb-1">
                    {catalogueName}
                  </h3>
                  <p className="text-sm text-[#9AA4B2] mb-2">
                    {catalogueDescription}
                  </p>
                  <p className="text-sm text-[#4B5565]">
                    {designCount} Design{designCount !== 1 ? "s" : ""}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <Badge
                  className="bg-[#4B5565] text-white text-xs font-medium px-2.5 py-1 border-transparent"
                >
                  Preview
                </Badge>
                <button className="p-2 hover:bg-white/50 rounded-lg transition-colors">
                  <IconEye className="size-5 text-[#4B5565]" />
                </button>
                <button className="p-2 hover:bg-white/50 rounded-lg transition-colors">
                  <IconShare className="size-5 text-[#4B5565]" />
                </button>
                <button className="p-2 hover:bg-white/50 rounded-lg transition-colors">
                  <IconPencil className="size-5 text-[#4B5565]" />
                </button>
              </div>
            </div>
          </div>

          {/* Upload Section */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-foreground">
              Upload Image(s) <span className="text-destructive">*</span>
            </label>

            {/* Upload Area */}
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={handleClick}
              className={cn(
                "border-2 border-dashed rounded-xl p-8 bg-white cursor-pointer transition-colors",
                isDragging
                  ? "border-primary bg-[#FFF1EC]"
                  : "border-[#E5E7EB] hover:border-primary/50 hover:bg-[#FFF1EC]/50",
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
                <IconPhoto className="size-12 text-[#9AA4B2]" />
                <p className="text-sm text-center">
                  <span className="text-primary font-medium">
                    Click to upload
                  </span>{" "}
                  <span className="text-[#4B5565]">
                    or drag & drop your files here (Image size 500 x 500)
                  </span>
                </p>
              </div>
            </div>

            {/* Selected Files Preview */}
            {selectedFiles.length > 0 && (
              <div className="space-y-2 mt-4">
                <p className="text-sm text-[#4B5565] font-medium">
                  Selected Files ({selectedFiles.length})
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {selectedFiles.map((file, index) => (
                    <div
                      key={index}
                      className="relative group rounded-lg overflow-hidden border border-[#E5E7EB]"
                    >
                      <img
                        src={fileUrls[index]}
                        alt={file.name}
                        className="w-full h-24 object-cover"
                      />
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveFile(index);
                        }}
                        className="absolute top-1 right-1 bg-black/50 hover:bg-black/70 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <IconX className="size-3 text-white" />
                      </button>
                      <p className="text-xs text-[#4B5565] p-1 truncate">
                        {file.name}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer Button */}
        <div className="px-6 pb-6 pt-4 border-t border-[#E5E7EB]">
          <Button
            onClick={handleSubmit}
            disabled={selectedFiles.length === 0}
            className="w-full h-12 text-base font-medium rounded-2xl bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Add Designs
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddDesignDialog;
