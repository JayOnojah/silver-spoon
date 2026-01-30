"use client";

import { useState } from "react";
import {
  IconMail,
  IconMapPin,
  IconLink,
  IconBrandWhatsapp,
} from "@tabler/icons-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

const ContactInfo = () => {
  const [formData, setFormData] = useState({
    countryCode: "+234",
    phoneNumber: "",
    email: "",
    businessAddress: "",
    facebook: "",
    instagram: "",
    x: "",
    tiktok: "",
    enableContactForm: true,
    emailNotifications: false,
    enableWhatsApp: false,
    whatsappNumber: "",
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Contact Information
        </h2>
        <p className="text-sm text-[#9AA4B2]">
          Make it easy for customers to reach you
        </p>
      </div>

      {/* Business Contact Section */}
      <div className="space-y-6 border rounded-xl p-5">
        <h3 className="text-lg font-bold text-foreground">Business Contact</h3>

        {/* Phone Number */}
        <div className="space-y-2">
          <Label
            htmlFor="phoneNumber"
            className="text-sm font-medium text-[#4B5565]"
          >
            Phone Number <span className="text-destructive">*</span>
          </Label>
          <div className="flex gap-2">
            <Select
              value={formData.countryCode}
              onValueChange={(value) => handleInputChange("countryCode", value)}
            >
              <SelectTrigger className="w-24 h-12!">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="+234">+234</SelectItem>
                <SelectItem value="+233">+233</SelectItem>
                <SelectItem value="+254">+254</SelectItem>
                <SelectItem value="+27">+27</SelectItem>
                <SelectItem value="+1">+1</SelectItem>
                <SelectItem value="+44">+44</SelectItem>
              </SelectContent>
            </Select>
            <Input
              id="phoneNumber"
              type="tel"
              placeholder="Enter Mobile Number"
              className="flex-1 h-12"
              value={formData.phoneNumber}
              onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
            />
          </div>
        </div>

        {/* Email Address */}
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium text-[#4B5565]">
            Email Address <span className="text-destructive">*</span>
          </Label>
          <div className="relative">
            <IconMail className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-[#9AA4B2]" />
            <Input
              id="email"
              type="email"
              placeholder="Contact@YourBrand.com"
              className="pl-10 h-12"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
            />
          </div>
        </div>

        {/* Business Address */}
        <div className="space-y-2">
          <Label
            htmlFor="businessAddress"
            className="text-sm font-medium text-[#4B5565]"
          >
            Business Address <span className="text-destructive">*</span>
          </Label>
          <div className="relative">
            <IconMapPin className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-[#9AA4B2]" />
            <Input
              id="businessAddress"
              type="text"
              placeholder="Your studio/Shop address"
              className="pl-10 h-12"
              value={formData.businessAddress}
              onChange={(e) =>
                handleInputChange("businessAddress", e.target.value)
              }
            />
          </div>
        </div>
      </div>

      {/* Social Media Section */}
      <div className="space-y-6 border rounded-xl p-5">
        <h3 className="text-lg font-bold text-foreground">Social Media</h3>

        {/* Facebook */}
        <div className="space-y-2">
          <Label
            htmlFor="facebook"
            className="text-sm font-medium text-[#4B5565]"
          >
            Facebook <span className="text-destructive">*</span>
          </Label>
          <div className="relative">
            <IconLink className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-[#9AA4B2]" />
            <Input
              id="facebook"
              type="url"
              placeholder="Enter Facebook URL"
              className="pl-10 h-12"
              value={formData.facebook}
              onChange={(e) => handleInputChange("facebook", e.target.value)}
            />
          </div>
        </div>

        {/* Instagram */}
        <div className="space-y-2">
          <Label
            htmlFor="instagram"
            className="text-sm font-medium text-[#4B5565]"
          >
            Instagram <span className="text-destructive">*</span>
          </Label>
          <div className="relative">
            <IconLink className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-[#9AA4B2]" />
            <Input
              id="instagram"
              type="url"
              placeholder="Enter Instagram URL"
              className="pl-10 h-12"
              value={formData.instagram}
              onChange={(e) => handleInputChange("instagram", e.target.value)}
            />
          </div>
        </div>

        {/* X (Former Twitter) */}
        <div className="space-y-2">
          <Label htmlFor="x" className="text-sm font-medium text-[#4B5565]">
            X(Former twitter) <span className="text-destructive">*</span>
          </Label>
          <div className="relative">
            <IconLink className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-[#9AA4B2]" />
            <Input
              id="x"
              type="url"
              placeholder="Enter X URL"
              className="pl-10 h-12"
              value={formData.x}
              onChange={(e) => handleInputChange("x", e.target.value)}
            />
          </div>
        </div>

        {/* TikTok */}
        <div className="space-y-2">
          <Label
            htmlFor="tiktok"
            className="text-sm font-medium text-[#4B5565]"
          >
            Tiktok <span className="text-destructive">*</span>
          </Label>
          <div className="relative">
            <IconLink className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-[#9AA4B2]" />
            <Input
              id="tiktok"
              type="url"
              placeholder="Enter Tiktok URL"
              className="pl-10 h-12"
              value={formData.tiktok}
              onChange={(e) => handleInputChange("tiktok", e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Contact Form Section */}
      <div className="space-y-6 border rounded-xl p-5">
        <h3 className="text-lg font-bold text-foreground">Contact Form</h3>

        <div className="space-y-4">
          {/* Enable Contact Form */}
          <div className="flex items-center gap-3">
            <Checkbox
              id="enableContactForm"
              checked={formData.enableContactForm}
              onCheckedChange={(checked) =>
                handleInputChange("enableContactForm", checked as boolean)
              }
              className="w-5 h-5"
            />
            <Label
              htmlFor="enableContactForm"
              className="text-sm font-medium text-[#4B5565] cursor-pointer"
            >
              Enable contact form on website
            </Label>
          </div>

          {/* Email Notifications */}
          <div className="flex items-center gap-3">
            <Checkbox
              id="emailNotifications"
              checked={formData.emailNotifications}
              onCheckedChange={(checked) =>
                handleInputChange("emailNotifications", checked as boolean)
              }
              className="w-5 h-5"
            />
            <Label
              htmlFor="emailNotifications"
              className="text-sm font-medium text-[#4B5565] cursor-pointer"
            >
              Send email notifications for inquiries
            </Label>
          </div>
        </div>
      </div>

      {/* WhatsApp Chat Section */}
      <div className="space-y-6 border border-[#40B773] bg-[#FBFFFD] rounded-xl p-6">
        <div>
          <IconBrandWhatsapp className="size-6 text-[#22C55E]" />
          <div className="flex items-center gap-3">
            <div>
              <h3 className="text-lg font-bold text-foreground">
                WhatsApp Chat
              </h3>
              <p className="text-sm text-[#9AA4B2]">
                Add a WhatsApp button so customers can message you directly
              </p>
            </div>
          </div>
        </div>

        {/* Enable WhatsApp Toggle */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label
              htmlFor="enableWhatsApp"
              className="text-sm font-medium text-[#4B5565]"
            >
              Enable WhatsApp chat button
            </Label>
            <Switch
              id="enableWhatsApp"
              checked={formData.enableWhatsApp}
              onCheckedChange={(checked) =>
                handleInputChange("enableWhatsApp", checked as boolean)
              }
            />
          </div>

          {/* WhatsApp Number */}
          {formData.enableWhatsApp && (
            <div className="space-y-2 mt-4">
              <Label
                htmlFor="whatsappNumber"
                className="text-sm font-medium text-[#4B5565]"
              >
                Enter WhatsApp Number
              </Label>
              <Input
                id="whatsappNumber"
                type="tel"
                placeholder="Enter WhatsApp Number"
                className="h-12"
                value={formData.whatsappNumber}
                onChange={(e) =>
                  handleInputChange("whatsappNumber", e.target.value)
                }
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
