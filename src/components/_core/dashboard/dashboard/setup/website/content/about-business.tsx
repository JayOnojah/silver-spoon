"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { FileUpload } from "@/components/_core/dashboard/shared/file-upload";

const AboutBusiness = () => {
  const [showAboutBusiness, setShowAboutBusiness] = useState(true);
  const [sectionHeadline, setSectionHeadline] = useState("");
  const [aboutText, setAboutText] = useState("");
  const [yearsOfExperience, setYearsOfExperience] = useState("");
  const [happyClients, setHappyClients] = useState("");
  const [projectsCompleted, setProjectsCompleted] = useState("");
  const [sectionImage, setSectionImage] = useState<File | null>(null);

  return (
    <div className="space-y-6">
      {/* About Business Header with Toggle */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-foreground">About Business</h3>
        <div className="flex items-center gap-3">
          <Label
            htmlFor="show-about-business"
            className="text-sm text-[#4B5565] cursor-pointer"
          >
            Show on website
          </Label>
          <Switch
            id="show-about-business"
            checked={showAboutBusiness}
            onCheckedChange={setShowAboutBusiness}
          />
        </div>
      </div>

      {/* Section Headline */}
      <div className="space-y-2">
        <Label className="text-[#4B5565] text-sm">
          Section Headline <span className="text-destructive">*</span>
        </Label>
        <Input
          value={sectionHeadline}
          onChange={(e) => setSectionHeadline(e.target.value)}
          placeholder="e.g., Elevate Your Style With Custom Fashion"
          className="h-11 rounded-xl"
        />
      </div>

      {/* About Text */}
      <div className="space-y-2">
        <Label className="text-[#4B5565] text-sm">
          About Text <span className="text-destructive">*</span>
        </Label>
        <Textarea
          value={aboutText}
          onChange={(e) => setAboutText(e.target.value)}
          placeholder="Tell your story"
          className="min-h-32 rounded-xl resize-none"
        />
      </div>

      {/* Stats - Three fields side by side */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Years Of Experience */}
        <div className="space-y-2">
          <Label className="text-[#4B5565] text-sm">
            Years Of Experience <span className="text-destructive">*</span>
          </Label>
          <Input
            value={yearsOfExperience}
            onChange={(e) => setYearsOfExperience(e.target.value)}
            placeholder="e.g., 10"
            className="h-11 rounded-xl"
          />
        </div>

        {/* Happy Clients */}
        <div className="space-y-2">
          <Label className="text-[#4B5565] text-sm">
            Happy Clients <span className="text-destructive">*</span>
          </Label>
          <Input
            value={happyClients}
            onChange={(e) => setHappyClients(e.target.value)}
            placeholder="e.g., 500+"
            className="h-11 rounded-xl"
          />
        </div>

        {/* Projects Completed */}
        <div className="space-y-2">
          <Label className="text-[#4B5565] text-sm">
            Projects Completed <span className="text-destructive">*</span>
          </Label>
          <Input
            value={projectsCompleted}
            onChange={(e) => setProjectsCompleted(e.target.value)}
            placeholder="e.g., 1000+"
            className="h-11 rounded-xl"
          />
        </div>
      </div>

      {/* Upload Section Image */}
      <div className="space-y-2">
        <Label className="text-[#4B5565] text-sm">
          Upload Section Image <span className="text-destructive">*</span>
        </Label>
        <FileUpload
          value={sectionImage}
          onChange={setSectionImage}
          accept="image/*"
        />
      </div>
    </div>
  );
};

export default AboutBusiness;
