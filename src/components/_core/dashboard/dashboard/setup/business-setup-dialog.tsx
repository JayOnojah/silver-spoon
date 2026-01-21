"use client";

import { useState, useRef } from "react";
import {
  IconCloudUpload,
} from "@tabler/icons-react";
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
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [bannerPreview, setBannerPreview] = useState<string | null>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);
  const bannerInputRef = useRef<HTMLInputElement>(null);

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

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (field === "logo") {
          setLogoPreview(reader.result as string);
        } else {
          setBannerPreview(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (
    e: React.DragEvent,
    field: "logo" | "storeBanner",
  ) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileChange(field, file);
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
        <DialogHeader className="space-y-2">
          <DialogTitle className="text-2xl font-bold text-foreground">
            Complete Business Setup
          </DialogTitle>
          <p className="text-sm text-[#4B5565]">
            Provide your business profile so it can be displayed on the
            storefront for your customers to see
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-6">
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
              onChange={(e) => handleInputChange("businessName", e.target.value)}
              className={cn(
                "h-12 rounded-xl",
                errors.businessName && "border-destructive"
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
                errors.tagline && "border-destructive"
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
                errors.description && "border-destructive"
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
                errors.address && "border-destructive"
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
                  errors.country && "border-destructive"
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
          <div className="grid gap-1.5">
            <label className="text-sm font-medium text-[#4B5565]">
              Upload Logo<span className="text-destructive">*</span>
            </label>
            <div
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, "logo")}
              onClick={() => logoInputRef.current?.click()}
              className={cn(
                "border-2 border-dashed border-primary rounded-xl p-8 bg-[#FFF1EC] cursor-pointer transition-colors hover:bg-[#FFE8E0]",
                errors.logo && "border-destructive"
              )}
            >
              <input
                ref={logoInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0] || null;
                  handleFileChange("logo", file);
                }}
              />
              {logoPreview ? (
                <div className="flex flex-col items-center gap-2">
                  <img
                    src={logoPreview}
                    alt="Logo preview"
                    className="max-h-32 max-w-full object-contain"
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
            {errors.logo && (
              <p className="text-sm text-destructive">{errors.logo}</p>
            )}
          </div>

          {/* Store Banner */}
          <div className="grid gap-1.5">
            <label className="text-sm font-medium text-[#4B5565]">
              Store Banner<span className="text-destructive">*</span>
            </label>
            <div
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, "storeBanner")}
              onClick={() => bannerInputRef.current?.click()}
              className={cn(
                "border-2 border-dashed border-primary rounded-xl p-8 bg-[#FFF1EC] cursor-pointer transition-colors hover:bg-[#FFE8E0]",
                errors.storeBanner && "border-destructive"
              )}
            >
              <input
                ref={bannerInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0] || null;
                  handleFileChange("storeBanner", file);
                }}
              />
              {bannerPreview ? (
                <div className="flex flex-col items-center gap-2">
                  <img
                    src={bannerPreview}
                    alt="Banner preview"
                    className="max-h-32 max-w-full object-contain"
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
            {errors.storeBanner && (
              <p className="text-sm text-destructive">{errors.storeBanner}</p>
            )}
          </div>

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
