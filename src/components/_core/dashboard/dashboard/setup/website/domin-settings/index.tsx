"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";

const DomainSettings = () => {
  const [formData, setFormData] = useState({
    subdomain: "Johnstiches",
    customDomain: "",
    publishWebsite: false,
    websiteTitle: "",
    metaDescription: "",
    googleSearchConsole: "",
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Domain & Website Settings
        </h2>
        <p className="text-sm text-[#9AA4B2]">
          Configure your website URL and publishing options
        </p>
      </div>

      <div className="border p-5 rounded-xl space-y-8">
        {/* Website Address Section */}
        <div className="space-y-6">
          {/* Free Subdomain */}
          <div className="space-y-2">
            <Label
              htmlFor="subdomain"
              className="text-sm font-medium text-[#4B5565]"
            >
              Free Subdomain
            </Label>
            <div className="flex gap-2">
              <Input
                id="subdomain"
                type="text"
                placeholder="Johnstiches"
                className="flex-1 h-12"
                value={formData.subdomain}
                onChange={(e) => handleInputChange("subdomain", e.target.value)}
              />
              <div className="flex items-center px-4 h-12 rounded-md bg-[#F9FAFB] border border-[#E5E7EB] text-[#4B5565] font-medium">
                .Silverspoon.com
              </div>
            </div>
            <p className="text-sm text-[#9AA4B2]">
              Your website will be available at:{" "}
              <span className="font-medium text-foreground">
                {formData.subdomain || "Johnstiches"}.Silverspoon.com
              </span>
            </p>
          </div>

          {/* Custom Domain */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Label
                htmlFor="customDomain"
                className="text-sm font-medium text-[#4B5565]"
              >
                Custom Domain
              </Label>
              <Badge className="bg-primary text-primary-foreground text-xs px-2 py-0.5">
                Premium
              </Badge>
            </div>
            <Input
              id="customDomain"
              type="text"
              placeholder="JohnStitches.com"
              className="h-12"
              disabled
              value={formData.customDomain}
              onChange={(e) =>
                handleInputChange("customDomain", e.target.value)
              }
            />
            <p className="text-sm text-[#9AA4B2]">
              Upgrade to Premium to use your own domain
            </p>
          </div>
        </div>

        {/* Website Status Section */}
        <div className="space-y-4 bg-[#FEF2F2] border border-[#FECACA] rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label
                htmlFor="publishWebsite"
                className="text-sm font-medium text-[#4B5565]"
              >
                Publish Website
              </Label>
              <p className="text-sm text-[#9AA4B2]">
                Make your website visible to the public
              </p>
            </div>
            <Switch
              id="publishWebsite"
              checked={formData.publishWebsite}
              onCheckedChange={(checked) =>
                handleInputChange("publishWebsite", checked as boolean)
              }
            />
          </div>
        </div>

        {/* SEO Settings Section */}
        <div className="space-y-3">
          <h3 className="text-lg font-bold text-foreground">SEO Settings</h3>

          {/* Website Title */}
          <div className="space-y-2">
            <Label
              htmlFor="websiteTitle"
              className="text-sm font-medium text-[#4B5565]"
            >
              Website Title
            </Label>
            <Input
              id="websiteTitle"
              type="text"
              placeholder="John Stiches- Custom Fashion Brand"
              className="h-12"
              value={formData.websiteTitle}
              onChange={(e) =>
                handleInputChange("websiteTitle", e.target.value)
              }
            />
          </div>

          {/* Meta Description */}
          <div className="space-y-2">
            <Label
              htmlFor="metaDescription"
              className="text-sm font-medium text-[#4B5565]"
            >
              Meta Description
            </Label>
            <Textarea
              id="metaDescription"
              placeholder="Brief description for search engine..."
              className="min-h-24"
              value={formData.metaDescription}
              onChange={(e) =>
                handleInputChange("metaDescription", e.target.value)
              }
            />
          </div>
        </div>

        {/* Google Search Console Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-foreground">
            Google Search Console
          </h3>

          <div className="space-y-2">
            <Label
              htmlFor="googleSearchConsole"
              className="text-sm font-medium text-[#4B5565]"
            >
              Google Search Console
            </Label>
            <Input
              id="googleSearchConsole"
              type="text"
              placeholder="Enter Unique ID"
              className="h-12"
              value={formData.googleSearchConsole}
              onChange={(e) =>
                handleInputChange("googleSearchConsole", e.target.value)
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DomainSettings;
