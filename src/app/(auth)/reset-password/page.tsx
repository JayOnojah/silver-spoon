import { Suspense } from "react";
import ResetPasswordForm from "@/components/_core/auth/reset-password";

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          <p className="text-lg text-muted-foreground">
            Loading password reset form...
          </p>
        </div>
      }>
      <ResetPasswordForm />
    </Suspense>
  );
}
