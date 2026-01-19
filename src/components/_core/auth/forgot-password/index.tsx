"use client";

import { useState } from "react";
import Link from "next/link";
import { IconMail } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState("");

  // Validate that email is filled
  const isFormValid = email.trim().length > 0;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isFormValid) {
      // Handle password reset logic here
      console.log("Sending verification code to:", email);
    }
  };

  return (
    <div className="flex flex-col h-full justify-center max-w-163.5 mx-auto px-6">
      {/* Title */}
      <h1 className="text-3xl font-bold text-foreground mb-6">
        Reset Password
      </h1>

      {/* Form */}
      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Email Input */}
        <div className="space-y-2">
          <label
            htmlFor="email"
            className="text-sm font-medium text-[#4B5565]"
          >
            Your email <span className="text-destructive">*</span>
          </label>
          <div className="relative">
            <IconMail className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-[#9AA4B2]" />
            <Input
              id="email"
              type="email"
              placeholder="Enter Your Email Address"
              className="pl-10 h-12 rounded-2xl"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Send Verification Code Button */}
        <Link href="/verify-email">
          <Button
            type="submit"
            className="w-full h-12 text-base font-medium rounded-2xl bg-primary hover:bg-primary/90"
            disabled={!isFormValid}
          >
            Send verification code
          </Button>
        </Link>
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
    </div>
  );
};

export default ForgotPasswordForm;

