"use client";

import {
  IconUser,
  IconMail,
  IconLock,
  IconBriefcase,
  IconArrowLeft,
} from "@tabler/icons-react";

import {
  Select,
  SelectItem,
  SelectValue,
  SelectTrigger,
  SelectContent,
} from "@/components/ui/select";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import SuccessDialog from "./success-dialog";
import { Input } from "@/components/ui/input";
import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import VerifyOtpDialog from "./verify-otp-dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { createAccount } from "@/src/actions/create-account";
import { googleLogin } from "@/src/actions/account-login";
import { newVerification } from "@/src/actions/new-verification";
import { resendVerification } from "@/src/actions/resend-verification";

type BusinessType = "fashion-designer" | "cobbler" | null;

interface BasicInfoProps {
  businessType: BusinessType;
}

const BasicInfo = ({ businessType }: BasicInfoProps) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [serverError, setServerError] = useState<string | null>(null);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isOtpOpen, setIsOtpOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);

  const [otpError, setOtpError] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);

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

    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }

    // Live validations (same as before)
    if (field === "email" && typeof value === "string" && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        setErrors((prev) => ({
          ...prev,
          email: "Please enter a valid email address",
        }));
      }
    }

    if (field === "confirmPassword" && typeof value === "string") {
      if (value && value !== formData.password) {
        setErrors((prev) => ({
          ...prev,
          confirmPassword: "Passwords do not match",
        }));
      }
    }
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
    // same as before...
    if (typeof value === "string" && !value.trim() && field !== "countryCode") {
      if (field === "firstName") return "First name is required";
      if (field === "lastName") return "Last name is required";
      if (field === "email") return "Email is required";
      if (field === "businessName") return "Business name is required";
      if (field === "country") return "Country is required";
      if (field === "phoneNumber") return "Phone number is required";
      if (field === "password") return "Password is required";
      if (field === "confirmPassword") return "Please confirm your password";
    }

    if (field === "email" && typeof value === "string" && value.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) return "Invalid email address";
    }

    if (
      field === "confirmPassword" &&
      typeof value === "string" &&
      value.trim()
    ) {
      if (value !== formData.password) return "Passwords do not match";
    }

    if (field === "agreeToTerms" && !value) {
      return "You must agree to the terms";
    }

    return "";
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setServerError(null);

    const newErrors: Record<string, string> = {};
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key as keyof typeof formData]);
      if (error) newErrors[key] = error;
    });

    setErrors(newErrors);
    setTouched(Object.fromEntries(Object.keys(formData).map((k) => [k, true])));

    if (Object.keys(newErrors).length > 0) return;

    if (!businessType) {
      setServerError("Please go back and select your business type");
      return;
    }

    const payload = {
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      email: formData.email.trim().toLowerCase(),
      phone: `${formData.countryCode}${formData.phoneNumber.trim()}`,
      businessName: formData.businessName.trim(),
      businessType: businessType === "fashion-designer" ? "tailor" : "cobbler",
      password: formData.password,
      agreeToTerms: formData.agreeToTerms,
    };

    startTransition(async () => {
      const result = await createAccount(payload);

      if (result?.error) {
        setServerError(result.error);
      } else {
        // Account created → trigger OTP dialog
        setOtpError(null); // reset any previous OTP errors
        setIsOtpOpen(true);
      }
    });
  };

  const handleVerify = async (code: string) => {
    if (!formData.email) return;

    setIsVerifying(true);
    setOtpError(null);

    const cleanCode = code.replace(/\D/g, "");

    const verifyResult = await newVerification(formData.email, cleanCode);

    setIsVerifying(false);

    if (verifyResult.error) {
      setOtpError(verifyResult.error);
      return;
    }

    setIsOtpOpen(false);
    setIsSuccessOpen(true);
  };

  const handleResend = async () => {
    if (!formData.email) return;

    setIsResending(true);
    setOtpError(null);

    const result = await resendVerification(formData.email);

    setIsResending(false);

    if (result.error) {
      setOtpError(result.error);
    } else {
      setOtpError("New code sent! Check your email.");
    }
  };

  return (
    <div className="max-w-163.5 mx-auto px-6 mt-10">
      <VerifyOtpDialog
        open={isOtpOpen}
        onOpenChange={setIsOtpOpen}
        email={formData.email || "your@email.com"}
        onBack={() => setIsOtpOpen(false)}
        onVerify={handleVerify}
        onResend={handleResend}
        error={otpError ?? undefined}
        isVerifying={isVerifying}
        isResending={isResending}
      />

      <SuccessDialog
        open={isSuccessOpen}
        onOpenChange={setIsSuccessOpen}
        onAccountSignIn={() => router.push("/sign-in")}
      />

      <button
        type="button"
        onClick={() => window.history.back()}
        className="flex items-center gap-2 text-[#0D0D0D] hover:text-foreground mb-2 w-fit transition-colors">
        <IconArrowLeft className="size-4" />
        <span className="text-sm">Back</span>
      </button>

      <h1 className="text-3xl font-bold text-foreground mb-2">
        Basic Information
      </h1>
      <p className="text-sm text-[#9AA4B2] mb-8">
        Enter your information to set things up.
      </p>

      <form className="space-y-4" onSubmit={handleSubmit}>
        {/* First + Last Name */}
        <div className="flex flex-col xl:flex-row gap-4">
          {/* First Name */}
          <div className="space-y-2 flex-1">
            <label
              htmlFor="firstName"
              className="text-sm font-medium text-[#4B5565]">
              First Name <span className="text-destructive">*</span>
            </label>
            <div className="relative mt-1">
              <IconUser className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-[#9AA4B2]" />
              <Input
                id="firstName"
                placeholder="John"
                className={cn(
                  "pl-10 h-12 rounded-2xl",
                  errors.firstName && "border-destructive",
                )}
                value={formData.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
                onBlur={() => setTouched((p) => ({ ...p, firstName: true }))}
              />
            </div>
            {touched.firstName && errors.firstName && (
              <p className="text-sm text-destructive">{errors.firstName}</p>
            )}
          </div>

          {/* Last Name */}
          <div className="space-y-2 flex-1">
            <label
              htmlFor="lastName"
              className="text-sm font-medium text-[#4B5565]">
              Last Name <span className="text-destructive">*</span>
            </label>
            <div className="relative mt-1">
              <IconUser className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-[#9AA4B2]" />
              <Input
                id="lastName"
                placeholder="Doe"
                className={cn(
                  "pl-10 h-12 rounded-2xl",
                  errors.lastName && "border-destructive",
                )}
                value={formData.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
                onBlur={() => setTouched((p) => ({ ...p, lastName: true }))}
              />
            </div>
            {touched.lastName && errors.lastName && (
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
            className="text-sm font-medium text-[#4B5565]">
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
            className="text-sm font-medium text-[#4B5565]">
            Country <span className="text-destructive">*</span>
          </label>
          <Select
            value={formData.country}
            onValueChange={(value) => {
              handleInputChange("country", value);
              setTouched((prev) => ({ ...prev, country: true }));
            }}>
            <SelectTrigger
              className={cn(
                "relative w-full h-12 py-6 rounded-2xl [&>svg]:right-3 [&>svg]:absolute mt-1",
                errors.country && "border-destructive",
              )}>
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
            className="text-sm font-medium text-[#4B5565]">
            Phone Number <span className="text-destructive">*</span>
          </label>
          <div className="flex gap-2 mt-1">
            <Select
              value={formData.countryCode}
              onValueChange={(value) =>
                handleInputChange("countryCode", value)
              }>
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
            className="text-sm font-medium text-[#4B5565]">
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
              className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-[#9AA4B2] hover:text-foreground">
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
            className="text-sm font-medium text-[#4B5565]">
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
              className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-[#9AA4B2] hover:text-foreground">
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
              className="text-sm text-[#4B5565] leading-relaxed cursor-pointer">
              I agree to the{" "}
              <Link
                href="/terms"
                className="text-primary hover:underline font-medium">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="text-primary hover:underline font-medium">
                Privacy Policy
              </Link>
            </label>
          </div>
          {errors.agreeToTerms && touched.agreeToTerms && (
            <p className="text-sm text-destructive">{errors.agreeToTerms}</p>
          )}
        </div>

        {serverError && (
          <div className="text-destructive text-sm text-center py-3 border border-destructive/30 rounded-lg bg-destructive/5">
            {serverError}
          </div>
        )}

        <Button
          type="submit"
          disabled={isPending}
          className="w-full h-12 text-base font-medium rounded-2xl">
          {isPending ? "Creating account..." : "Create Account"}
        </Button>
      </form>

      {/* OR Separator */}
      <div className="flex items-center gap-4 my-6">
        <div className="flex-1 h-px bg-border"></div>
        <span className="text-sm text-[#9AA4B2]">OR</span>
        <div className="flex-1 h-px bg-border"></div>
      </div>

      {/* Google Login Button */}
      <Button
        variant="outline"
        className="w-full h-12 text-base font-medium border-[#CDD5DF]"
        onClick={async () => googleLogin()}
      >
        <svg className="size-5 mr-2" viewBox="0 0 24 24">
          <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
          />
          <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
          />
          <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
          />
          <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
          />
        </svg>
        Continue with Google
      </Button>

      <p className="text-center text-sm text-[#9AA4B2] mt-6 pb-5">
        Already have an account?{" "}
        <Link
          href="/sign-in"
          className="text-primary hover:underline font-medium">
          Login
        </Link>
      </p>
    </div>
  );
};

export default BasicInfo;
