"use client";

import { IconCheck } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";

interface ResetSuccessDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onBackToLogin?: () => void;
}

const ResetSuccessDialog = ({
  open,
  onOpenChange,
  onBackToLogin,
}: ResetSuccessDialogProps) => {
  const handleBackToLogin = () => {
    onBackToLogin?.();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={true}
        className="max-w-125 w-[90vw] rounded-xl p-6 sm:p-8 overflow-y-auto overflow-x-hidden max-h-[90vh] bg-[linear-gradient(180deg,#EBFAED_0%,#FFFFFF_44%)]">
        <DialogHeader className="space-y-6 mt-6 w-full overflow-x-hidden">
          {/* Success Icon */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-[#10B981]/10 rounded-full blur-2xl" />
              <div className="relative bg-[#10B981] rounded-full p-4 w-20 h-20 flex items-center justify-center">
                <IconCheck className="size-10 text-white" strokeWidth={3} />
              </div>
            </div>
          </div>

          {/* Title */}
          <div className="text-center space-y-3 w-full overflow-x-hidden">
            <h2 className="text-3xl font-bold text-foreground">
              Your Password Has Been Reset!
            </h2>
            <p className="text-sm text-[#4B5565] max-w-md mx-auto">
              This is the password you should enter when next you're logging in
              to your creative workspace
            </p>
          </div>

          {/* Back to Login Button */}
          <Button
            onClick={handleBackToLogin}
            className="w-full h-12 text-base font-medium rounded-2xl bg-primary hover:bg-primary/90">
            Back to login
          </Button>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ResetSuccessDialog;
