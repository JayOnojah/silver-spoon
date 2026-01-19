"use client";

import VerifyEmailForm from '@/components/_core/auth/verify-email'

const VerifyEmail = () => {
  const handleVerify = (code: string) => {
    // Handle email verification logic here
    console.log("Verifying code:", code);
  };

  const handleResend = () => {
    // Handle resend verification code logic here
    console.log("Resending verification code");
  };

  return (
    <VerifyEmailForm
      email="Johndoe@Gmail.com"
      onVerify={handleVerify}
      onResend={handleResend}
    />
  )
}

export default VerifyEmail
