"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { IconMail } from "@tabler/icons-react";
import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { forgotPassword } from "@/src/actions/forgot-password";

const ForgotPasswordForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const isFormValid =
    email.trim().length > 0 && /\S+@\S+\.\S+/.test(email.trim());

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isFormValid) return;

    setMessage(null);

    startTransition(async () => {
      const result = await forgotPassword({
        email: email.trim().toLowerCase(),
      });

      if (result.error) {
        setMessage({ type: "error", text: result.error });
      } else if (result.success) {
        setMessage({ type: "success", text: result.success });
        // Optional: redirect after short delay so user sees the message
        // setTimeout(() => {
        //   router.push("/check-email?type=reset");
        // or router.replace("/sign-in") if you prefer
        // }, 2200);
      }
    });
  };

  return (
    <div className="flex flex-col h-full justify-center max-w-163.5 mx-auto px-6">
      {/* Title */}
      <h1 className="text-3xl font-bold text-foreground mb-2">
        Reset Password
      </h1>
      <p className="text-sm text-[#9AA4B2] mb-8">
        Enter your email and we'll send you a link to reset your password.
      </p>

      {/* Messages */}
      {message && (
        <div
          className={`p-4 mb-6 rounded-xl text-sm border ${
            message.type === "success"
              ? "bg-green-50 border-green-200 text-green-800"
              : "bg-red-50 border-red-200 text-red-800"
          }`}>
          {message.text}
        </div>
      )}

      {/* Form */}
      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Email Input */}
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium text-[#4B5565]">
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
              disabled={isPending}
              autoComplete="email"
              required
            />
          </div>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full h-12 text-base font-medium rounded-2xl bg-primary hover:bg-primary/90"
          disabled={!isFormValid || isPending}>
          {isPending ? (
            <span className="flex items-center justify-center gap-2">
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8h8a8 8 0 01-16 0z"
                />
              </svg>
              Sending...
            </span>
          ) : (
            "Send verification code"
          )}
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
    </div>
  );
};

export default ForgotPasswordForm;
