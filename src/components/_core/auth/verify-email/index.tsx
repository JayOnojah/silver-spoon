"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface VerifyEmailFormProps {
  email?: string;
  onVerify?: (code: string) => void;
  onResend?: () => void;
}

const VerifyEmailForm = ({
  email = "Johndoe@Gmail.com",
  onVerify,
  onResend,
}: VerifyEmailFormProps) => {
  const [verificationCode, setVerificationCode] = useState("");

  const handleVerify = () => {
    if (
      verificationCode.trim() &&
      verificationCode.replace(/\D/g, "").length === 6
    ) {
      onVerify?.(verificationCode);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleVerify();
  };

  return (
    <div className="flex flex-col h-full justify-center max-w-163.5 mx-auto px-6">
      {/* Title */}
      <h1 className="text-3xl font-bold text-foreground mb-2 text-center">
        Verify your email
      </h1>

      {/* Description */}
      <div className="text-center space-y-1 mb-8">
        <p className="text-sm text-[#4B5565]">
          We have sent a 6-digit verification code to
        </p>
        <p className="text-sm font-medium text-foreground">{email}</p>
      </div>

      {/* Form */}
      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Verification Code Input */}
        <div className="space-y-2">
          <label
            htmlFor="verificationCode"
            className="text-sm font-medium text-[#4B5565]"
          >
            Verification code <span className="text-destructive">*</span>
          </label>
          <Input
            id="verificationCode"
            type="text"
            placeholder="# 123 - 456"
            value={verificationCode}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, "").slice(0, 6);
              // Format as "123 - 456" if 6 digits
              if (value.length === 6) {
                const formatted = `${value.slice(0, 3)} - ${value.slice(3)}`;
                setVerificationCode(formatted);
              } else {
                setVerificationCode(value);
              }
            }}
            className={cn(
              "h-12 rounded-2xl text-lg font-medium mt-1",
              "placeholder:text-[#9AA4B2]",
            )}
            maxLength={9} // "123 - 456" format
          />
        </div>

        {/* Verify Button */}
        <Link href={"/reset-password"}>
          <Button
            type="submit"
            className="w-full h-12 text-base font-medium rounded-2xl bg-primary hover:bg-primary/90"
            disabled={
              !verificationCode.trim() ||
              verificationCode.replace(/\D/g, "").length !== 6
            }
          >
            Verify & Continue
          </Button>
        </Link>
      </form>

      {/* Resend Link */}
      <div className="text-center mt-6">
        <p className="text-sm text-[#9AA4B2]">
          Didn't get an email?{" "}
          <button
            type="button"
            onClick={onResend}
            className="text-primary hover:underline font-medium"
          >
            Resend
          </button>
        </p>
      </div>

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
    </div>
  );
};

export default VerifyEmailForm;
