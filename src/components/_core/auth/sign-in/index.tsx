"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useTransition } from "react";
import {accountLogin, googleLogin} from "@/src/actions/account-login";
import { IconMail, IconLock, IconArrowLeft } from "@tabler/icons-react";

const SignInForm = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const isFormValid = email.trim().length > 0 && password.trim().length > 0;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    startTransition(async () => {
      const result = await accountLogin({ email, password });

      if (result.error) {
        setError(result.error);
        return;
      }

      if (result.success && result.redirectTo) {
        router.push(result.redirectTo);
        router.refresh();
      }
    });
  }

  return (
    <div className="flex flex-col h-full justify-center max-w-163.5 mx-auto px-6">
      <Link
        href="/"
        className="flex items-center gap-2 text-[#0D0D0D] hover:text-foreground mb-2 w-fit transition-colors">
        <IconArrowLeft className="size-4" />
        <span className="text-sm">Back</span>
      </Link>

      <h1 className="text-3xl font-bold text-foreground mb-4">
        Welcome Back, Creative! 👋
      </h1>

      {/* ← Add error display */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Email */}
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium text-[#4B5565]">
            Your email *
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
            />
          </div>
        </div>

        {/* Password */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label
              htmlFor="password"
              className="text-sm font-medium text-[#4B5565]">
              Your password *
            </label>
            <Link
              href="/forgot-password"
              className="text-sm text-primary font-medium hover:scale-95 transition-all duration-300 underline">
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <IconLock className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-[#9AA4B2]" />
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter Password"
              className="pl-10 pr-20 h-12 rounded-2xl"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isPending}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-[#9AA4B2] hover:text-foreground"
              disabled={isPending}>
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        {/* Login Button – now type="submit" */}
        <Button
          type="submit"
          className="w-full h-12 text-base font-medium rounded-2xl"
          disabled={!isFormValid || isPending}>
          {isPending ? "Logging in..." : "Login"}
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

      {/* Sign Up Link */}
      <p className="text-center text-sm text-[#9AA4B2] mt-6">
        Don't have an account?{" "}
        <Link
          href="/sign-up"
          className="text-primary hover:underline font-medium">
          Sign Up
        </Link>
      </p>
    </div>
  );
};

export default SignInForm;
