"use client";

import { useState } from "react";
import { IconRotateClockwise } from "@tabler/icons-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/_core/dashboard/shared/file-upload";
import { cn } from "@/lib/utils";

const Branding = () => {
  const [logo, setLogo] = useState<File | null>(null);
  const [banner, setBanner] = useState<File | null>(null);
  const [businessName, setBusinessName] = useState("John Stiches");
  const [tagline, setTagline] = useState("");
  const [brandDescription, setBrandDescription] = useState("");
  const [address, setAddress] = useState("");
  const [primaryBgColor, setPrimaryBgColor] = useState("#000000");
  const [primaryTextColor, setPrimaryTextColor] = useState("#FFFFFF");
  const [secondaryOutlineColor, setSecondaryOutlineColor] = useState("#000000");
  const [secondaryTextColor, setSecondaryTextColor] = useState("#FFFFFF");

  const handleResetPrimaryText = () => {
    setPrimaryTextColor("#FFFFFF");
  };

  const handleResetSecondaryText = () => {
    setSecondaryTextColor("#FFFFFF");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Branding</h2>
        <p className="text-sm text-[#9AA4B2]">
          Customize your website look and feel to match your brand
        </p>
      </div>

      {/* Upload Logo */}
      <div className="space-y-2">
        <Label className="text-[#4B5565] text-sm">
          Upload Logo <span className="text-destructive">*</span>
        </Label>
        <FileUpload
          value={logo}
          onChange={setLogo}
          accept="image/*"
          className="h-40"
        />
      </div>

      {/* Business Name */}
      <div className="space-y-2">
        <Label className="text-[#4B5565] text-sm">
          Business Name <span className="text-destructive">*</span>
        </Label>
        <Input
          value={businessName}
          onChange={(e) => setBusinessName(e.target.value)}
          placeholder="Enter Business Name"
          className="h-11 rounded-xl"
        />
      </div>

      {/* Tagline */}
      <div className="space-y-2">
        <Label className="text-[#4B5565] text-sm">
          Tagline <span className="text-destructive">*</span>
        </Label>
        <Input
          value={tagline}
          onChange={(e) => setTagline(e.target.value)}
          placeholder="e.g., Where Tradition Meets Elegance"
          className="h-11 rounded-xl"
        />
      </div>

      {/* Brand Description */}
      <div className="space-y-2">
        <Label className="text-[#4B5565] text-sm">
          Brand Description <span className="text-destructive">*</span>
        </Label>
        <Textarea
          value={brandDescription}
          onChange={(e) => setBrandDescription(e.target.value)}
          placeholder="Type here..."
          className="min-h-32 rounded-xl resize-none"
        />
      </div>

      {/* Address */}
      <div className="space-y-2">
        <Label className="text-[#4B5565] text-sm">
          Address <span className="text-destructive">*</span>
        </Label>
        <Input
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter Address"
          className="h-11 rounded-xl"
        />
      </div>

      {/* Custom Color Section */}
      <div className="bg-white border border-[#E5E7EB] rounded-xl p-6 space-y-6">
        <Label className="text-[#4B5565] text-sm">
          Custom Color <span className="text-destructive">*</span>
        </Label>

        {/* Primary Button Background Color */}
        <div className="space-y-2">
          <Label className="text-[#4B5565] text-sm">
            Primary Button Background Color
          </Label>
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded border border-[#E5E7EB] shrink-0 cursor-pointer"
              style={{ backgroundColor: primaryBgColor }}
            >
              <input
                type="color"
                value={primaryBgColor}
                onChange={(e) => setPrimaryBgColor(e.target.value)}
                className="w-full h-full opacity-0 cursor-pointer"
              />
            </div>
            <Input
              type="text"
              value={primaryBgColor}
              onChange={(e) => setPrimaryBgColor(e.target.value)}
              className="h-11 rounded-xl flex-1"
              placeholder="#000000"
            />
          </div>
        </div>

        {/* Primary Button Text Color */}
        <div className="space-y-2">
          <Label className="text-[#4B5565] text-sm">
            Primary Button Text Color
          </Label>
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded border border-[#E5E7EB] shrink-0 cursor-pointer relative"
              style={{ backgroundColor: primaryTextColor }}
            >
              <input
                type="color"
                value={primaryTextColor}
                onChange={(e) => setPrimaryTextColor(e.target.value)}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </div>
            <Input
              type="text"
              value={primaryTextColor}
              onChange={(e) => setPrimaryTextColor(e.target.value)}
              className="h-11 rounded-xl flex-1"
              placeholder="#FFFFFF"
            />
            <Button
              type="button"
              variant="outline"
              onClick={handleResetPrimaryText}
              className="h-11 px-4 rounded-xl"
            >
              <IconRotateClockwise className="size-4 mr-2" />
              Reset
            </Button>
          </div>
        </div>

        {/* Secondary Button Outline Color */}
        <div className="space-y-2">
          <Label className="text-[#4B5565] text-sm">
            Secondary Button Outline Color
          </Label>
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded border border-[#E5E7EB] shrink-0 cursor-pointer relative"
              style={{ backgroundColor: secondaryOutlineColor }}
            >
              <input
                type="color"
                value={secondaryOutlineColor}
                onChange={(e) => setSecondaryOutlineColor(e.target.value)}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </div>
            <Input
              type="text"
              value={secondaryOutlineColor}
              onChange={(e) => setSecondaryOutlineColor(e.target.value)}
              className="h-11 rounded-xl flex-1"
              placeholder="#000000"
            />
          </div>
        </div>

        {/* Secondary Button Text Color */}
        <div className="space-y-2">
          <Label className="text-[#4B5565] text-sm">
            Secondary Button Text Color
          </Label>
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded border border-[#E5E7EB] shrink-0 cursor-pointer relative"
              style={{ backgroundColor: secondaryTextColor }}
            >
              <input
                type="color"
                value={secondaryTextColor}
                onChange={(e) => setSecondaryTextColor(e.target.value)}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </div>
            <Input
              type="text"
              value={secondaryTextColor}
              onChange={(e) => setSecondaryTextColor(e.target.value)}
              className="h-11 rounded-xl flex-1"
              placeholder="#FFFFFF"
            />
            <Button
              type="button"
              variant="outline"
              onClick={handleResetSecondaryText}
              className="h-11 px-4 rounded-xl"
            >
              <IconRotateClockwise className="size-4 mr-2" />
              Reset
            </Button>
          </div>
        </div>
      </div>

      {/* Store Banner */}
      <div className="space-y-2">
        <Label className="text-[#4B5565] text-sm">
          Store Banner <span className="text-destructive">*</span>
        </Label>
        <FileUpload
          value={banner}
          onChange={setBanner}
          accept="image/*"
          className="h-40"
        />
      </div>
    </div>
  );
};

export default Branding;
