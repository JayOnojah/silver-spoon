"use client";

import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogContent,
} from "@/components/ui/dialog";

import { cn } from "@/lib/utils";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { IconArrowLeft } from "@tabler/icons-react";

interface VerifyOtpDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  email?: string;
  onBack?: () => void;
  onVerify?: (code: string) => void;
  onResend?: () => void;
  error?: string | null;
  isVerifying?: boolean;
  isResending?: boolean;
}

const VerifyOtpDialog = ({
  open,
  onOpenChange,
  email = "Johndoe@Gmail.com",
  onBack,
  onVerify,
  onResend,
  error,
  isVerifying = false,
  isResending = false,
}: VerifyOtpDialogProps) => {
  const [verificationCode, setVerificationCode] = useState("");

  const cleanCode = verificationCode.replace(/\D/g, "");

  const handleVerifyClick = () => {
    if (cleanCode.length === 6) {
      onVerify?.(cleanCode); // send only digits
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
        className="max-w-md rounded-2xl p-6 sm:p-8">
        <DialogHeader>
          {/* Header with Back and Badge */}
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={handleBack}
              className="flex items-center gap-2 text-[#0D0D0D] hover:text-foreground transition-colors">
              <IconArrowLeft className="size-4" />
              <span className="text-sm">Back</span>
            </button>
            <Badge
              variant="default"
              className="text-[#10B981] bg-white border-none px-3 py-1">
              Almost done!
            </Badge>
          </div>

          {/* Title */}
          <DialogTitle className="text-2xl font-extrabold text-foreground text-center mb-2">
            Verify your email
          </DialogTitle>

          {/* Description */}
          <div className="text-center space-y-1 mb-6">
            <p className="text-sm text-[#4B5565]">
              We have sent a 6-digit verification code to
            </p>
            <p className="text-sm font-medium text-foreground">{email}</p>
          </div>

          {/* Error message */}
          {error && (
            <div className="text-sm text-destructive bg-destructive/10 border border-destructive/30 rounded-lg p-3 mb-4 text-center">
              {error}
            </div>
          )}

          {/* Verification Code Input */}
          <div className="space-y-2 mb-6">
            <label
              htmlFor="verificationCode"
              className="text-sm font-medium text-[#4B5565]">
              Verification code <span className="text-destructive">*</span>
            </label>
            <Input
              id="verificationCode"
              type="text"
              placeholder="123456"
              value={verificationCode}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "").slice(0, 6);
                setVerificationCode(value);
              }}
              className={cn(
                "h-12 rounded-2xl text-center text-lg font-medium mt-1",
                "placeholder:text-[#9AA4B2]",
                error && "border-destructive focus-visible:ring-destructive",
              )}
              maxLength={6}
              disabled={isVerifying}
            />
          </div>

          {/* Verify Button */}
          <Button
            onClick={handleVerifyClick}
            disabled={isVerifying || cleanCode.length !== 6 || !onVerify}
            className="w-full h-12 text-base font-medium rounded-2xl">
            {isVerifying ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Verifying...
              </>
            ) : (
              "Verify & Continue"
            )}
          </Button>

          {/* Resend Link */}
          <div className="text-center mt-4">
            <p className="text-sm text-[#9AA4B2]">
              Didn't get an email?{" "}
              <button
                type="button"
                onClick={onResend}
                disabled={isResending}
                className={cn(
                  "text-primary hover:underline font-medium",
                  isResending && "opacity-60 cursor-not-allowed",
                )}>
                {isResending ? "Resending..." : "Resend"}
              </button>
            </p>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default VerifyOtpDialog;
