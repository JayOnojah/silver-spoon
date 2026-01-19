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
import VerifyOtpDialog from "./verify-otp-dialog";
import SuccessDialog from "./success-dialog";

const BasicInfo = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(true);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    businessName: "",
    country: "",
    countryCode: "+234",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }

    // Validate email on change
    if (field === "email" && typeof value === "string") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (value && !emailRegex.test(value)) {
        setErrors((prev) => ({
          ...prev,
          email: "Please enter a valid email address to continue",
        }));
      }
    }

    // Validate password match on confirm password change
    if (field === "confirmPassword" && typeof value === "string") {
      if (value && value !== formData.password) {
        setErrors((prev) => ({
          ...prev,
          confirmPassword: "Passwords do not match",
        }));
      }
    }

    // Validate password match on password change
    if (field === "password" && typeof value === "string") {
      if (formData.confirmPassword && value !== formData.confirmPassword) {
        setErrors((prev) => ({
          ...prev,
          confirmPassword: "Passwords do not match",
        }));
      } else if (
        formData.confirmPassword &&
        value === formData.confirmPassword
      ) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors.confirmPassword;
          return newErrors;
        });
      }
    }
  };

  const validateField = (field: string, value: string | boolean): string => {
    if (
      field === "firstName" &&
      (!value || (typeof value === "string" && !value.trim()))
    ) {
      return "First name is required";
    }
    if (
      field === "lastName" &&
      (!value || (typeof value === "string" && !value.trim()))
    ) {
      return "Last name is required";
    }
    if (field === "email") {
      if (!value || (typeof value === "string" && !value.trim())) {
        return "Email is required";
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (typeof value === "string" && !emailRegex.test(value)) {
        return "Please enter a valid email address to continue";
      }
    }
    if (
      field === "businessName" &&
      (!value || (typeof value === "string" && !value.trim()))
    ) {
      return "Business name is required";
    }
    if (
      field === "country" &&
      (!value || (typeof value === "string" && !value.trim()))
    ) {
      return "Country is required";
    }
    if (
      field === "phoneNumber" &&
      (!value || (typeof value === "string" && !value.trim()))
    ) {
      return "Phone number is required";
    }
    if (
      field === "password" &&
      (!value || (typeof value === "string" && !value.trim()))
    ) {
      return "Password is required";
    }
    if (field === "confirmPassword") {
      if (!value || (typeof value === "string" && !value.trim())) {
        return "Please confirm your password";
      }
      if (typeof value === "string" && value !== formData.password) {
        return "Passwords do not match";
      }
    }
    if (field === "agreeToTerms" && !value) {
      return "You must agree to the terms and conditions";
    }
    return "";
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors: Record<string, string> = {};
    const newTouched: Record<string, boolean> = {};

    // Validate all fields
    Object.keys(formData).forEach((field) => {
      const error = validateField(
        field,
        formData[field as keyof typeof formData],
      );
      if (error) {
        newErrors[field] = error;
        newTouched[field] = true;
      }
    });

    setErrors(newErrors);
    setTouched(newTouched);

    // If no errors, proceed with form submission
    if (Object.keys(newErrors).length === 0) {
      // Handle form submission here
      console.log("Form submitted:", formData);
      // Open verification dialog
      setIsOpen(true);
    }
  };

  const handleVerify = (code: string) => {
    // Handle OTP verification
    console.log("Verifying code:", code);
    // Add your verification logic here
    // After successful verification, close OTP dialog and open success dialog
    setIsOpen(false);
    setIsSuccessOpen(true);
  };

  const handleGoToDashboard = () => {
    // Navigate to dashboard
    window.location.href = "/dashboard";
  };

  const handleResend = () => {
    // Handle resend OTP
    console.log("Resending OTP to:", formData.email);
    // Add your resend logic here
  };

  return (
    <div className="max-w-163.5 mx-auto px-6 mt-10">
      <VerifyOtpDialog
        open={isOpen}
        onOpenChange={setIsOpen}
        email={formData.email || "your@email.com"}
        onBack={() => setIsOpen(false)}
        onVerify={handleVerify}
        onResend={handleResend}
      />
      <SuccessDialog
        open={isSuccessOpen}
        onOpenChange={setIsSuccessOpen}
        onGoToDashboard={handleGoToDashboard}
      />
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
      <form className="space-y-4" onSubmit={handleSubmit}>
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
                className={cn(
                  "pl-10 h-12 rounded-2xl",
                  errors.firstName && "border-destructive",
                )}
                value={formData.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
                onBlur={() =>
                  setTouched((prev) => ({ ...prev, firstName: true }))
                }
              />
            </div>
            {errors.firstName && touched.firstName && (
              <p className="text-sm text-destructive">{errors.firstName}</p>
            )}
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
                className={cn(
                  "pl-10 h-12 rounded-2xl",
                  errors.lastName && "border-destructive",
                )}
                value={formData.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
                onBlur={() =>
                  setTouched((prev) => ({ ...prev, lastName: true }))
                }
              />
            </div>
            {errors.lastName && touched.lastName && (
              <p className="text-sm text-destructive">{errors.lastName}</p>
            )}
          </div>
        </div>

        {/* Email */}
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium text-[#4B5565]">
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
                errors.email && "border-destructive",
              )}
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              onBlur={() => setTouched((prev) => ({ ...prev, email: true }))}
              aria-invalid={!!errors.email}
            />
          </div>
          {errors.email && touched.email && (
            <p className="text-sm text-destructive">{errors.email}</p>
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
              className={cn(
                "pl-10 h-12 rounded-2xl",
                errors.businessName && "border-destructive",
              )}
              value={formData.businessName}
              onChange={(e) =>
                handleInputChange("businessName", e.target.value)
              }
              onBlur={() =>
                setTouched((prev) => ({ ...prev, businessName: true }))
              }
            />
          </div>
          {errors.businessName && touched.businessName && (
            <p className="text-sm text-destructive">{errors.businessName}</p>
          )}
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
            onValueChange={(value) => {
              handleInputChange("country", value);
              setTouched((prev) => ({ ...prev, country: true }));
            }}
          >
            <SelectTrigger
              className={cn(
                "relative w-full h-12 py-6 rounded-2xl [&>svg]:right-3 [&>svg]:absolute mt-1",
                errors.country && "border-destructive",
              )}
            >
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
          {errors.country && touched.country && (
            <p className="text-sm text-destructive">{errors.country}</p>
          )}
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
              <SelectTrigger className="relative w-24 h-12 py-5.75 rounded-2xl [&>svg]:right-2 [&>svg]:absolute">
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
              className={cn(
                "flex-1 h-12 rounded-2xl",
                errors.phoneNumber && "border-destructive",
              )}
              value={formData.phoneNumber}
              onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
              onBlur={() =>
                setTouched((prev) => ({ ...prev, phoneNumber: true }))
              }
            />
          </div>
          {errors.phoneNumber && touched.phoneNumber && (
            <p className="text-sm text-destructive">{errors.phoneNumber}</p>
          )}
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
              className={cn(
                "pl-10 pr-20 h-12 rounded-2xl",
                errors.password && "border-destructive",
              )}
              value={formData.password}
              onChange={(e) => handleInputChange("password", e.target.value)}
              onBlur={() => setTouched((prev) => ({ ...prev, password: true }))}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-[#9AA4B2] hover:text-foreground"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          {errors.password && touched.password && (
            <p className="text-sm text-destructive">{errors.password}</p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="space-y-2">
          <label
            htmlFor="confirmPassword"
            className="text-sm font-medium text-[#4B5565]"
          >
            Confirm Password <span className="text-destructive">*</span>
          </label>
          <div className="relative mt-1">
            <IconLock className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-[#9AA4B2]" />
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="••••••••••"
              className={cn(
                "pl-10 pr-20 h-12 rounded-2xl",
                errors.confirmPassword && "border-destructive",
              )}
              value={formData.confirmPassword}
              onChange={(e) =>
                handleInputChange("confirmPassword", e.target.value)
              }
              onBlur={() =>
                setTouched((prev) => ({ ...prev, confirmPassword: true }))
              }
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-[#9AA4B2] hover:text-foreground"
            >
              {showConfirmPassword ? "Hide" : "Show"}
            </button>
          </div>
          {errors.confirmPassword && touched.confirmPassword && (
            <p className="text-sm text-destructive">{errors.confirmPassword}</p>
          )}
        </div>

        {/* Terms and Conditions */}
        <div className="space-y-2">
          <div className="flex items-start gap-3">
            <Checkbox
              id="terms"
              checked={formData.agreeToTerms}
              onCheckedChange={(checked) => {
                handleInputChange("agreeToTerms", checked as boolean);
                setTouched((prev) => ({ ...prev, agreeToTerms: true }));
              }}
              className={cn(
                "mt-1",
                errors.agreeToTerms && "border-destructive",
              )}
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
          {errors.agreeToTerms && touched.agreeToTerms && (
            <p className="text-sm text-destructive">{errors.agreeToTerms}</p>
          )}
        </div>

        {/* Create Account Button */}
        <Button
          type="submit"
          className="w-full h-12 text-base font-medium rounded-2xl"
        >
          Create Account
        </Button>
      </form>

      {/* Login Link */}
      <p className="text-center text-sm text-[#9AA4B2] mt-6 pb-5">
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
