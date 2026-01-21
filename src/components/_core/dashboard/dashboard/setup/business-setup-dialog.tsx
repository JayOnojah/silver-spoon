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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { FileUpload } from "@/src/components/_core/dashboard/shared/file-upload";

interface BusinessSetupDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit?: (data: BusinessFormData) => void;
}

interface BusinessFormData {
  businessName: string;
  tagline: string;
  description: string;
  address: string;
  country: string;
  logo: File | null;
  storeBanner: File | null;
}

const BusinessSetupDialog = ({
  open,
  onOpenChange,
  onSubmit,
}: BusinessSetupDialogProps) => {
  const [formData, setFormData] = useState<BusinessFormData>({
    businessName: "",
    tagline: "",
    description: "",
    address: "",
    country: "",
    logo: null,
    storeBanner: null,
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

  const handleFileChange = (
    field: "logo" | "storeBanner",
    file: File | null,
  ) => {
    setFormData((prev) => ({ ...prev, [field]: file }));
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

    if (!formData.businessName.trim()) {
      newErrors.businessName = "Business name is required";
    }
    if (!formData.tagline.trim()) {
      newErrors.tagline = "Tagline is required";
    }
    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }
    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    }
    if (!formData.country.trim()) {
      newErrors.country = "Country is required";
    }
    if (!formData.logo) {
      newErrors.logo = "Logo is required";
    }
    if (!formData.storeBanner) {
      newErrors.storeBanner = "Store banner is required";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      onSubmit?.(formData);
      onOpenChange(false);
    }
  };

  const isFormValid =
    formData.businessName.trim() &&
    formData.tagline.trim() &&
    formData.description.trim() &&
    formData.address.trim() &&
    formData.country &&
    formData.logo &&
    formData.storeBanner &&
    Object.keys(errors).length === 0;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={true}
        className="max-w-200 w-[90vw] rounded-md p-6 sm:p-8 overflow-y-auto max-h-[90vh] overflow-x-hidden"
      >
        <DialogHeader className="space-y-2 py-0!">
          <DialogTitle className="py-0!">
            <div className="text-xl font-extrabold text-foreground">
              Complete Business Setup
            </div>
            <p className="text-xs font-normal text-[#9AA4B2]">
              Provide your business profile so it can be displayed on the
              storefront for your customers to see
            </p>
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Business Name */}
          <div className="grid gap-1.5">
            <label
              htmlFor="businessName"
              className="text-sm font-medium text-[#4B5565]"
            >
              Business Name <span className="text-destructive">*</span>
            </label>
            <Input
              id="businessName"
              type="text"
              value={formData.businessName}
              onChange={(e) =>
                handleInputChange("businessName", e.target.value)
              }
              className={cn(
                "h-12 rounded-xl",
                errors.businessName && "border-destructive",
              )}
            />
            {errors.businessName && (
              <p className="text-sm text-destructive">{errors.businessName}</p>
            )}
          </div>

          {/* Tagline */}
          <div className="grid gap-1.5">
            <label
              htmlFor="tagline"
              className="text-sm font-medium text-[#4B5565]"
            >
              Tagline <span className="text-destructive">*</span>
            </label>
            <Input
              id="tagline"
              type="text"
              placeholder="e.g Explore Our Craft"
              value={formData.tagline}
              onChange={(e) => handleInputChange("tagline", e.target.value)}
              className={cn(
                "h-12 rounded-xl",
                errors.tagline && "border-destructive",
              )}
            />
            {errors.tagline && (
              <p className="text-sm text-destructive">{errors.tagline}</p>
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
              placeholder="E.g., Explore our latest designs and handcrafted pieces, made with care and attention to detail."
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

          {/* Address */}
          <div className="grid gap-1.5">
            <label
              htmlFor="address"
              className="text-sm font-medium text-[#4B5565]"
            >
              Address <span className="text-destructive">*</span>
            </label>
            <Input
              id="address"
              type="text"
              placeholder="Enter Address"
              value={formData.address}
              onChange={(e) => handleInputChange("address", e.target.value)}
              className={cn(
                "h-12 rounded-xl",
                errors.address && "border-destructive",
              )}
            />
            {errors.address && (
              <p className="text-sm text-destructive">{errors.address}</p>
            )}
          </div>

          {/* Country */}
          <div className="grid gap-1.5">
            <label
              htmlFor="country"
              className="text-sm font-medium text-[#4B5565]"
            >
              Country <span className="text-destructive">*</span>
            </label>
            <Select
              value={formData.country}
              onValueChange={(value) => {
                handleInputChange("country", value);
              }}
            >
              <SelectTrigger
                className={cn(
                  "h-12! rounded-xl w-full",
                  errors.country && "border-destructive",
                )}
              >
                <SelectValue placeholder="Select Country" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Nigeria">Nigeria</SelectItem>
                <SelectItem value="Ghana">Ghana</SelectItem>
                <SelectItem value="Kenya">Kenya</SelectItem>
                <SelectItem value="South Africa">South Africa</SelectItem>
                <SelectItem value="United States">United States</SelectItem>
                <SelectItem value="United Kingdom">United Kingdom</SelectItem>
              </SelectContent>
            </Select>
            {errors.country && (
              <p className="text-sm text-destructive">{errors.country}</p>
            )}
          </div>

          {/* Upload Logo */}
          <FileUpload
            label="Upload Logo"
            required
            accept="image/*"
            value={formData.logo}
            onChange={(file) => handleFileChange("logo", file)}
            error={errors.logo}
          />

          {/* Store Banner */}
          <FileUpload
            label="Store Banner"
            required
            accept="image/*"
            value={formData.storeBanner}
            onChange={(file) => handleFileChange("storeBanner", file)}
            error={errors.storeBanner}
          />

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full h-12 text-base font-medium rounded-2xl bg-primary hover:bg-primary/90"
            disabled={!isFormValid}
          >
            Complete Profile Setup
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BusinessSetupDialog;
