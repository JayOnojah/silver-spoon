"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { FileUpload } from "@/components/_core/dashboard/shared/file-upload";

const HeroSection = () => {
  const [showHeroSection, setShowHeroSection] = useState(true);
  const [mainHeadline, setMainHeadline] = useState("");
  const [subheadline, setSubheadline] = useState("");
  const [primaryButtonText, setPrimaryButtonText] = useState("");
  const [secondaryButtonText, setSecondaryButtonText] = useState("");
  const [heroBackgroundImage, setHeroBackgroundImage] = useState<File | null>(
    null,
  );
  return (
    <div>
      {/* Hero Section Header with Toggle */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-foreground">Hero Section</h3>
        <div className="flex items-center gap-3">
          <Label
            htmlFor="show-hero"
            className="text-sm text-[#4B5565] cursor-pointer"
          >
            Show on website
          </Label>
          <Switch
            id="show-hero"
            checked={showHeroSection}
            onCheckedChange={setShowHeroSection}
          />
        </div>
      </div>

      {/* Main Headline */}
      <div className="space-y-2">
        <Label className="text-[#4B5565] text-sm">
          Main Headline <span className="text-destructive">*</span>
        </Label>
        <Input
          value={mainHeadline}
          onChange={(e) => setMainHeadline(e.target.value)}
          placeholder="e.g., Elevate Your Style With Custom Fashion."
          className="h-11 rounded-xl"
        />
      </div>

      {/* Subheadline */}
      <div className="space-y-2">
        <Label className="text-[#4B5565] text-sm">
          Subheadline <span className="text-destructive">*</span>
        </Label>
        <Textarea
          value={subheadline}
          onChange={(e) => setSubheadline(e.target.value)}
          placeholder="e.g., Where Tradition Meets Elegance."
          className="min-h-24 rounded-xl resize-none"
        />
      </div>

      {/* Button Texts - Side by Side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Primary Button Text */}
        <div className="space-y-2">
          <Label className="text-[#4B5565] text-sm">
            Primary Button Text <span className="text-destructive">*</span>
          </Label>
          <Input
            value={primaryButtonText}
            onChange={(e) => setPrimaryButtonText(e.target.value)}
            placeholder="e.g., View Collection."
            className="h-11 rounded-xl"
          />
        </div>

        {/* Secondary Button Text */}
        <div className="space-y-2">
          <Label className="text-[#4B5565] text-sm">
            Secondary Button Text <span className="text-destructive">*</span>
          </Label>
          <Input
            value={secondaryButtonText}
            onChange={(e) => setSecondaryButtonText(e.target.value)}
            placeholder="e.g., Book Consultation."
            className="h-11 rounded-xl"
          />
        </div>
      </div>

      {/* Hero Background Image */}
      <div className="space-y-2">
        <Label className="text-[#4B5565] text-sm">
          Hero Background Image <span className="text-destructive">*</span>
        </Label>
        <FileUpload
          value={heroBackgroundImage}
          onChange={setHeroBackgroundImage}
          accept="image/*"
        />
      </div>
    </div>
  );
};

export default HeroSection;
