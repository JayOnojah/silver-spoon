"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { IconLock } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import ResetSuccessDialog from "../reset-success-dialog";
import { useState, useEffect, useTransition } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { resetPassword } from "@/src/actions/reset-password";

const ResetPasswordForm = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverMessage, setServerMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  // Auto-clear server message after a while (optional)
  useEffect(() => {
    if (serverMessage) {
      const timer = setTimeout(() => setServerMessage(null), 8000);
      return () => clearTimeout(timer);
    }
  }, [serverMessage]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Clear field-specific error
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }

    // Live password match validation
    if (field === "confirmPassword") {
      if (value && value !== formData.newPassword) {
        setErrors((prev) => ({
          ...prev,
          confirmPassword: "Passwords do not match",
        }));
      }
    }
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

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.newPassword.trim()) {
      newErrors.newPassword = "New password is required";
    } else if (formData.newPassword.length < 8) {
      newErrors.newPassword = "Password must be at least 8 characters";
    }

    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!token) {
      setServerMessage({
        type: "error",
        text: "Invalid or missing reset token. Please request a new reset link.",
      });
      return;
    }

    if (!validateForm()) return;

    setServerMessage(null);

    startTransition(async () => {
      const result = await resetPassword(
        { password: formData.newPassword },
        token,
      );

      if (result.error) {
        setServerMessage({ type: "error", text: result.error });
      } else if (result.success) {
        setServerMessage({ type: "success", text: result.success });
        setIsSuccessOpen(true);
        // Optional: clear form
        setFormData({ newPassword: "", confirmPassword: "" });
      }
    });
  };

  const handleBackToLogin = () => {
    router.push("/sign-in");
  };

  const isFormValid =
    formData.newPassword.trim().length >= 8 &&
    formData.confirmPassword.trim() === formData.newPassword.trim() &&
    !isPending;

  return (
    <div className="flex flex-col h-full justify-center max-w-163.5 mx-auto px-6">
      {/* Title */}
      <h1 className="text-3xl font-bold text-foreground mb-2 text-center">
        Reset password
      </h1>

      {/* Subtitle */}
      <p className="text-sm text-[#4B5565] text-center mb-8">
        Enter and confirm your new password
      </p>

      {/* Server message */}
      {serverMessage && (
        <div
          className={cn(
            "p-4 mb-6 rounded-xl text-sm border text-center",
            serverMessage.type === "success"
              ? "bg-green-50 border-green-200 text-green-800"
              : "bg-red-50 border-red-200 text-red-800",
          )}>
          {serverMessage.text}
        </div>
      )}

      {/* Form */}
      <form className="space-y-4" onSubmit={handleSubmit}>
        {/* New Password */}
        <div className="space-y-2">
          <label
            htmlFor="newPassword"
            className="text-sm font-medium text-[#4B5565]">
            New Password <span className="text-destructive">*</span>
          </label>
          <div className="relative">
            <IconLock className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-[#9AA4B2]" />
            <Input
              id="newPassword"
              type={showNewPassword ? "text" : "password"}
              placeholder="Enter New Password"
              className={cn(
                "pl-10 pr-20 h-12 rounded-2xl",
                errors.newPassword &&
                  "border-destructive focus-visible:ring-destructive",
              )}
              value={formData.newPassword}
              onChange={(e) => handleInputChange("newPassword", e.target.value)}
              disabled={isPending}
            />
            <button
              type="button"
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-[#4B5565] hover:text-foreground"
              disabled={isPending}>
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
            className="text-sm font-medium text-[#4B5565]">
            Confirm password <span className="text-destructive">*</span>
          </label>
          <div className="relative">
            <IconLock className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-[#9AA4B2]" />
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Repeat Password"
              className={cn(
                "pl-10 pr-20 h-12 rounded-2xl",
                errors.confirmPassword &&
                  "border-destructive focus-visible:ring-destructive",
              )}
              value={formData.confirmPassword}
              onChange={(e) =>
                handleInputChange("confirmPassword", e.target.value)
              }
              disabled={isPending}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-[#4B5565] hover:text-foreground"
              disabled={isPending}>
              {showConfirmPassword ? "Hide" : "Show"}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-sm text-destructive">{errors.confirmPassword}</p>
          )}
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full h-12 text-base font-medium rounded-2xl bg-primary hover:bg-primary/90"
          disabled={!isFormValid || isPending}>
          {isPending ? "Resetting..." : "Reset Password"}
        </Button>
      </form>

      {/* Back to Login */}
      <p className="text-center text-sm text-[#9AA4B2] mt-6">
        Remembered your password?{" "}
        <Link
          href="/sign-in"
          className="text-primary hover:underline font-medium">
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
