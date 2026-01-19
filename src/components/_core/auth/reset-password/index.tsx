"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { IconLock } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import ResetSuccessDialog from "../reset-success-dialog";

const ResetPasswordForm = () => {
  const router = useRouter();
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }

    // Validate password match on confirm password change
    if (field === "confirmPassword") {
      if (value && value !== formData.newPassword) {
        setErrors((prev) => ({
          ...prev,
          confirmPassword: "Passwords do not match",
        }));
      }
    }

    // Validate password match on new password change
    if (field === "newPassword") {
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors: Record<string, string> = {};

    setErrors(newErrors);

    // If no errors, proceed with password reset
    if (Object.keys(newErrors).length === 0) {
      // Handle password reset logic here
      console.log("Resetting password:", formData);
      // Open success dialog
      setIsSuccessOpen(true);
    }
  };

  const handleBackToLogin = () => {
    router.push("/sign-in");
  };

  const isFormValid =
    formData.newPassword.trim() &&
    formData.confirmPassword.trim() &&
    formData.newPassword === formData.confirmPassword &&
    Object.keys(errors).length === 0;

  return (
    <div className="flex flex-col h-full justify-center max-w-163.5 mx-auto px-6">
      {/* Title */}
      <h1 className="text-3xl font-bold text-foreground mb-2 text-center">
        Reset password
      </h1>

      {/* Subtitle */}
      <p className="text-sm text-[#4B5565] text-center mb-8">
        Enter your new password and confirm
      </p>

      {/* Form */}
      <form className="space-y-3" onSubmit={handleSubmit}>
        {/* New Password */}
        <div className="space-y-2">
          <label
            htmlFor="newPassword"
            className="text-sm font-medium text-[#4B5565]"
          >
            New Password <span className="text-destructive">*</span>
          </label>
          <div className="relative mt-1">
            <IconLock className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-[#9AA4B2]" />
            <Input
              id="newPassword"
              type={showNewPassword ? "text" : "password"}
              placeholder="Enter New Password"
              className={cn(
                "pl-10 pr-20 h-12 rounded-2xl",
                errors.newPassword && "border-destructive",
              )}
              value={formData.newPassword}
              onChange={(e) => handleInputChange("newPassword", e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-[#4B5565] hover:text-foreground"
            >
              {showNewPassword ? "Hide" : "Show"}
            </button>
          </div>
          {errors.newPassword && (
            <p className="text-sm text-destructive">{errors.newPassword}</p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="space-y-2">
          <label
            htmlFor="confirmPassword"
            className="text-sm font-medium text-[#4B5565]"
          >
            Confirm password <span className="text-destructive">*</span>
          </label>
          <div className="relative mt-1">
            <IconLock className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-[#9AA4B2]" />
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Repeat Password"
              className={cn(
                "pl-10 pr-20 h-12 rounded-2xl",
                errors.confirmPassword && "border-destructive",
              )}
              value={formData.confirmPassword}
              onChange={(e) =>
                handleInputChange("confirmPassword", e.target.value)
              }
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-[#4B5565] hover:text-foreground"
            >
              {showConfirmPassword ? "Hide" : "Show"}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-sm text-destructive">{errors.confirmPassword}</p>
          )}
        </div>

        {/* Reset Password Button */}
        <Button
          type="submit"
          className="w-full h-12 text-base font-medium rounded-2xl bg-primary hover:bg-primary/90"
          disabled={!isFormValid}
        >
          Reset Password
        </Button>
      </form>

      {/* Login Link */}
      <p className="text-center text-sm text-[#9AA4B2] mt-6">
        Remembered your password?{" "}
        <Link
          href="/sign-in"
          className="text-primary hover:underline font-medium"
        >
          Login
        </Link>
      </p>

      {/* Success Dialog */}
      <ResetSuccessDialog
        open={isSuccessOpen}
        onOpenChange={setIsSuccessOpen}
        onBackToLogin={handleBackToLogin}
      />
    </div>
  );
};

export default ResetPasswordForm;
