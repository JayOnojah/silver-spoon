"use client";

import { useState } from "react";
import Link from "next/link";
import {
  IconArrowLeft,
  IconUser,
  IconMail,
  IconLock,
  IconBriefcase,
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

const BasicInfo = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "Johndoe@Gmailcom",
    businessName: "John Stiches",
    country: "Nigeria",
    countryCode: "+234",
    phoneNumber: "8035341009",
    password: "",
    agreeToTerms: true,
  });
  const [emailError, setEmailError] = useState(
    "Please enter a valid email address to continue",
  );

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Validate email on change
    if (field === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (value && typeof value === "string" && !emailRegex.test(value)) {
        setEmailError("Please enter a valid email address to continue");
      } else {
        setEmailError("");
      }
    }
  };

  const isFormValid =
    formData.firstName.trim() &&
    formData.lastName.trim() &&
    formData.email.trim() &&
    !emailError &&
    formData.businessName.trim() &&
    formData.country &&
    formData.phoneNumber.trim() &&
    formData.password.trim() &&
    formData.agreeToTerms;

  return (
    <div className="max-w-163.5 mx-auto px-6 mt-10">
      {/* Back Link */}
      <Link
        href="/auth/sign-up"
        className="flex items-center gap-2 text-[#0D0D0D] hover:text-foreground mb-2 w-fit transition-colors"
      >
        <IconArrowLeft className="size-4" />
        <span className="text-sm">Back</span>
      </Link>

      {/* Title */}
      <h1 className="text-3xl font-bold text-foreground mb-2">
        Basic Information
      </h1>

      {/* Subtitle */}
      <p className="text-sm text-[#9AA4B2] mb-8">
        Enter your information to set things up.
      </p>

      {/* Form */}
      <form className="space-y-4">
        {/* First Name */}
        <div className="flex flex-col xl:flex-row gap-4 ">
          <div className="space-y-2 flex-1">
            <label
              htmlFor="firstName"
              className="text-sm font-medium text-[#4B5565]"
            >
              First Name <span className="text-destructive">*</span>
            </label>
            <div className="relative mt-1">
              <IconUser className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-[#9AA4B2]" />
              <Input
                id="firstName"
                type="text"
                placeholder="John"
                className="pl-10 h-12 rounded-2xl"
                value={formData.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
              />
            </div>
          </div>

          {/* Last Name */}
          <div className="space-y-2 flex-1">
            <label
              htmlFor="lastName"
              className="text-sm font-medium text-[#4B5565]"
            >
              Last Name <span className="text-destructive">*</span>
            </label>
            <div className="relative mt-1">
              <IconUser className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-[#9AA4B2]" />
              <Input
                id="lastName"
                type="text"
                placeholder="Doe"
                className="pl-10 h-12 rounded-2xl"
                value={formData.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Email */}
        <div className="space-y-2">
          <label
            htmlFor="email"
            className="text-sm font-medium text-[#4B5565]"
          >
            Your Email <span className="text-destructive">*</span>
          </label>
          <div className="relative mt-1">
            <IconMail className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-[#9AA4B2]" />
            <Input
              id="email"
              type="email"
              placeholder="Johndoe@Gmailcom"
              className={cn(
                "pl-10 h-12 rounded-2xl",
                emailError && "border-destructive",
              )}
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              aria-invalid={!!emailError}
            />
          </div>
          {emailError && (
            <p className="text-sm text-destructive">{emailError}</p>
          )}
        </div>

        {/* Business Name */}
        <div className="space-y-2">
          <label
            htmlFor="businessName"
            className="text-sm font-medium text-[#4B5565]"
          >
            Business Name <span className="text-destructive">*</span>
          </label>
          <div className="relative mt-1">
            <IconBriefcase className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-[#9AA4B2]" />
            <Input
              id="businessName"
              type="text"
              placeholder="John Stiches"
              className="pl-10 h-12 rounded-2xl"
              value={formData.businessName}
              onChange={(e) =>
                handleInputChange("businessName", e.target.value)
              }
            />
          </div>
        </div>

        {/* Country */}
        <div className="space-y-2">
          <label
            htmlFor="country"
            className="text-sm font-medium text-[#4B5565]"
          >
            Country <span className="text-destructive">*</span>
          </label>
          <Select
            value={formData.country}
            onValueChange={(value) => handleInputChange("country", value)}
          >
            <SelectTrigger className="w-full h-12 py-6 rounded-2xl [&>svg]:right-3 [&>svg]:absolute mt-1">
              <SelectValue placeholder="Select country" />
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
        </div>

        {/* Phone Number */}
        <div className="space-y-2">
          <label
            htmlFor="phoneNumber"
            className="text-sm font-medium text-[#4B5565]"
          >
            Phone Number <span className="text-destructive">*</span>
          </label>
          <div className="flex gap-2 mt-1">
            <Select
              value={formData.countryCode}
              onValueChange={(value) => handleInputChange("countryCode", value)}
            >
              <SelectTrigger className="w-24 h-12 py-5.75 rounded-2xl [&>svg]:right-2">
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
              placeholder="8035341009"
              className="flex-1 h-12 rounded-2xl"
              value={formData.phoneNumber}
              onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
            />
          </div>
        </div>

        {/* Password */}
        <div className="space-y-2">
          <label
            htmlFor="password"
            className="text-sm font-medium text-[#4B5565]"
          >
            Your Password <span className="text-destructive">*</span>
          </label>
          <div className="relative mt-1">
            <IconLock className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-[#9AA4B2]" />
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••••"
              className="pl-10 pr-20 h-12 rounded-2xl"
              value={formData.password}
              onChange={(e) => handleInputChange("password", e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-[#9AA4B2] hover:text-foreground"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        {/* Terms and Conditions */}
        <div className="flex items-start gap-3">
          <Checkbox
            id="terms"
            checked={formData.agreeToTerms}
            onCheckedChange={(checked) =>
              handleInputChange("agreeToTerms", checked as boolean)
            }
            className="mt-1"
          />
          <label
            htmlFor="terms"
            className="text-sm text-[#4B5565] leading-relaxed cursor-pointer"
          >
            I agree to the{" "}
            <Link
              href="/terms"
              className="text-primary hover:underline font-medium"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy"
              className="text-primary hover:underline font-medium"
            >
              Privacy Policy
            </Link>
          </label>
        </div>

        {/* Create Account Button */}
        <Button
          type="submit"
          className="w-full h-12 text-base font-medium rounded-2xl"
          disabled={!isFormValid}
        >
          Create Account
        </Button>
      </form>

      {/* Login Link */}
      <p className="text-center text-sm text-[#9AA4B2] mt-6">
        Already have an account?{" "}
        <Link
          href="/sign-in"
          className="text-primary hover:underline font-medium"
        >
          Login
        </Link>
      </p>
    </div>
  );
};

export default BasicInfo;
