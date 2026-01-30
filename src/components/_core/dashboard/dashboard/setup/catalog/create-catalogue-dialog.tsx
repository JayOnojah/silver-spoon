"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface CreateCatalogueDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit?: (data: CatalogueFormData) => void;
}

interface CatalogueFormData {
  catalogueName: string;
  description: string;
}

const CreateCatalogueDialog = ({
  open,
  onOpenChange,
  onSubmit,
}: CreateCatalogueDialogProps) => {
  const [formData, setFormData] = useState<CatalogueFormData>({
    catalogueName: "",
    description: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors: Record<string, string> = {};

    if (!formData.catalogueName.trim()) {
      newErrors.catalogueName = "Catalogue name is required";
    }
    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      onSubmit?.(formData);
      onOpenChange(false);
      // Reset form
      setFormData({
        catalogueName: "",
        description: "",
      });
    }
  };

  const isFormValid =
    formData.catalogueName.trim() &&
    formData.description.trim() &&
    Object.keys(errors).length === 0;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={true}
        className="max-w-125 w-[90vw] rounded-md p-6 sm:p-8"
      >
        <DialogHeader className="space-y-2">
          <DialogTitle>
            <div className="text-xl font-extrabold text-foreground">
              Create Catalogue
            </div>
            <p className="text-xs font-normal text-[#9AA4B2] mt-1">
              Please provide name and description of your catalogue
            </p>
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-6">
          {/* Catalogue Name */}
          <div className="grid gap-1.5">
            <label
              htmlFor="catalogueName"
              className="text-sm font-medium text-[#4B5565]"
            >
              Catalogue Name <span className="text-destructive">*</span>
            </label>
            <Input
              id="catalogueName"
              type="text"
              placeholder="Enter Catalogue Name"
              value={formData.catalogueName}
              onChange={(e) =>
                handleInputChange("catalogueName", e.target.value)
              }
              className={cn(
                "h-12 rounded-xl",
                errors.catalogueName && "border-destructive",
              )}
            />
            {errors.catalogueName && (
              <p className="text-sm text-destructive">{errors.catalogueName}</p>
            )}
          </div>

          {/* Description */}
          <div className="grid gap-1.5">
            <label
              htmlFor="description"
              className="text-sm font-medium text-[#4B5565]"
            >
              Description <span className="text-destructive">*</span>
            </label>
            <Textarea
              id="description"
              placeholder="Type here..."
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              className={cn(
                "min-h-24 rounded-xl resize-none",
                errors.description && "border-destructive",
              )}
            />
            {errors.description && (
              <p className="text-sm text-destructive">{errors.description}</p>
            )}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full h-12 text-base font-medium rounded-2xl bg-primary hover:bg-primary/90"
            disabled={!isFormValid}
          >
            Create Catalogue
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCatalogueDialog;
