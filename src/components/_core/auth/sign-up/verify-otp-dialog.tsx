"use client";

import React, { useState } from "react";
import Link from "next/link";
import { IconArrowLeft } from "@tabler/icons-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface VerifyOtpDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  email?: string;
  onBack?: () => void;
  onVerify?: (code: string) => void;
  onResend?: () => void;
}

const VerifyOtpDialog = ({
  open,
  onOpenChange,
  email = "Johndoe@Gmail.com",
  onBack,
  onVerify,
  onResend,
}: VerifyOtpDialogProps) => {
  const [verificationCode, setVerificationCode] = useState("");

  const handleVerify = () => {
    if (verificationCode.trim()) {
      onVerify?.(verificationCode);
    }
  };

  const handleBack = () => {
    onBack?.();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="max-w-md rounded-2xl p-6 sm:p-8"
      >
        <DialogHeader className="">
          {/* Header with Back and Badge */}
          <div className="flex items-center justify-between">
            <button
              onClick={handleBack}
              className="flex items-center gap-2 text-[#0D0D0D] hover:text-foreground transition-colors"
            >
              <IconArrowLeft className="size-4" />
              <span className="text-sm">Back</span>
            </button>
            <Badge
              variant="default"
              className="text-[#10B981] bg-white border-none px-3 py-1"
            >
              Almost done!
            </Badge>
          </div>

          {/* Title */}
          <DialogTitle className="text-2xl font-extrabold text-foreground text-center">
            Verify your email
          </DialogTitle>

          {/* Description */}
          <div className="text-center space-y-1">
            <p className="text-sm text-[#4B5565]">
              We have sent a 6-digit verification code to
            </p>
            <p className="text-sm font-medium text-foreground">{email}</p>
          </div>

          {/* Verification Code Input */}
          <div className="space-y-2 mb-6">
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
                "h-12 rounded-2xl text-lg font-medium mt-2",
                "placeholder:text-[#9AA4B2]"
              )}
              maxLength={9} // "123 - 456" format
            />
          </div>

          {/* Verify Button */}
          <Button
            onClick={handleVerify}
            className="w-full h-12 text-base font-medium rounded-2xl bg-primary hover:bg-primary/90"
            disabled={!verificationCode.trim() || verificationCode.replace(/\D/g, "").length !== 6}
          >
            Verify & Continue
          </Button>

          {/* Resend Link */}
          <div className="text-center">
            <p className="text-sm text-[#9AA4B2]">
              Didn't get an email?{" "}
              <button
                onClick={onResend}
                className="text-primary hover:underline font-medium"
              >
                Resend
              </button>
            </p>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default VerifyOtpDialog;
