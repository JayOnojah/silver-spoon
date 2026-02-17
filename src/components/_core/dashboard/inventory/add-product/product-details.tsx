"use client";

import { useState, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/src/components/ui/button";
import { Label } from "@/components/ui/label";
import { ImagePlus, Plus } from "lucide-react";
import AddVariant from "./add-variant";

interface ProductDetailsProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  collectionId?: string;
  isEdit?: boolean;
  onBack?: () => void;
  onCreate?: (data: ProductDetailsFormData) => void;
}

export interface ProductDetailsFormData {
  productName: string;
  description: string;
  price: string;
  discount: string;
  images: File[];
}

export default function ProductDetails({
  open,
  onOpenChange,
  collectionId,
  isEdit = false,
  onBack,
  onCreate,
}: ProductDetailsProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [addVariantOpen, setAddVariantOpen] = useState(false);

  const stepLabel = isEdit ? "Edit Product" : "Add New Product";

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files?.length) {
      setImages((prev) => [...prev, ...Array.from(files)]);
    }
    e.target.value = "";
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files?.length) {
      const imageFiles = Array.from(files).filter((f) => f.type.startsWith("image/"));
      setImages((prev) => [...prev, ...imageFiles]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => e.preventDefault();

  const handleSubmit = () => {
    onCreate?.({
      productName,
      description,
      price,
      discount,
      images,
    });
    onOpenChange(false);
  };

  const handleBack = () => {
    onOpenChange(false);
    onBack?.();
  };

  const canSubmit = productName.trim() && description.trim() && price.trim() && images.length > 0;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl max-h-[90vh] flex flex-col gap-0 p-0 overflow-hidden">
        <DialogHeader className="px-6 pt-6 pb-2 text-left space-y-1">
          <p className="text-xs font-medium text-[#9AA4B2]">
            Step 2 of 2 — {stepLabel}
          </p>
          <DialogTitle className="text-xl font-bold text-[#121926]">
            Product Details
          </DialogTitle>
          <p className="text-sm text-[#6B7280] pt-1">
            Provide basic product Information
          </p>
        </DialogHeader>

        <form
          className="px-6 pt-4 pb-6 flex flex-col gap-4 overflow-y-auto"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <div className="space-y-2">
            <Label className="text-sm font-medium text-[#374151]">
              Product Name <span className="text-destructive">*</span>
            </Label>
            <Input
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              placeholder="Enter Item Name"
              className="h-10 rounded-lg border-[#D0D5DD]"
              required
            />
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium text-[#374151]">
              Description <span className="text-destructive">*</span>
            </Label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter Short Description..."
              className="min-h-20 rounded-lg border-[#D0D5DD] resize-none"
              required
            />
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium text-[#374151]">
              Upload Image(s) <span className="text-destructive">*</span>
            </Label>
            <div
              role="button"
              tabIndex={0}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onClick={() => fileInputRef.current?.click()}
              onKeyDown={(e) => e.key === "Enter" && fileInputRef.current?.click()}
              className="border-2 border-dashed border-[#D0D5DD] rounded-lg p-6 flex flex-col items-center justify-center gap-2 bg-[#FAFAFA] hover:bg-[#F3F4F6] cursor-pointer transition-colors"
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileChange}
                className="hidden"
              />
              <ImagePlus className="size-10 text-[#9AA4B2]" strokeWidth={1.5} />
              <p className="text-sm text-[#6B7280] text-center">
                Click to upload or drag & drop your files here
              </p>
              <p className="text-xs text-[#9AA4B2]">
                (Image size 500 x 500)
              </p>
              {images.length > 0 && (
                <p className="text-xs text-primary font-medium">
                  {images.length} file(s) selected
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium text-[#374151]">
              Price <span className="text-destructive">*</span>
            </Label>
            <Input
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Enter Amount"
              type="number"
              min={0}
              step="0.01"
              className="h-10 rounded-lg border-[#D0D5DD]"
              required
            />
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium text-[#374151]">
              Discount (Optional)
            </Label>
            <Input
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
              placeholder="Enter Discount Amount"
              type="number"
              min={0}
              step="0.01"
              className="h-10 rounded-lg border-[#D0D5DD]"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium text-[#374151]">
              Product Variant (Optional)
            </Label>
            <Button
              type="button"
              variant="outline"
              className="w-full justify-start h-10 gap-2 border-[#D0D5DD] text-[#374151] hover:bg-[#F9FAFB]"
            >
              <Plus className="size-4" />
              Add Product Variant
            </Button>
          </div>

          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={handleBack}
              className="flex-1 h-11 rounded-xl border-[#D0D5DD]"
            >
              Back
            </Button>
            <Button
              type="submit"
              disabled={!canSubmit}
              className="flex-1 h-11 rounded-xl bg-primary text-white hover:bg-primary/90 font-bold disabled:opacity-50"
            >
              Create Product
            </Button>
          </div>
        </form>
      </DialogContent>

      <AddVariant
        open={addVariantOpen}
        onOpenChange={setAddVariantOpen}
        onBack={() => setAddVariantOpen(false)}
        onSave={() => setAddVariantOpen(false)}
      />
    </Dialog>
  );
}
