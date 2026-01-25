"use client";

import { IconCheck, IconPlus } from "@tabler/icons-react";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface OrderSuccessDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddDesigns?: () => void;
  onCreateAnother?: () => void;
}

const OrderSuccessDialog = ({
  open,
  onOpenChange,
  onAddDesigns,
  onCreateAnother,
}: OrderSuccessDialogProps) => {
  const handleAddDesigns = () => {
    onAddDesigns?.();
    onOpenChange(false);
  };

  const handleCreateAnother = () => {
    onCreateAnother?.();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={true}
        className="max-w-125 w-[90vw] rounded-xl p-6 sm:p-8 overflow-y-auto overflow-x-hidden max-h-[90vh] bg-[linear-gradient(180deg,#EBFAED_0%,#FFFFFF_44%)]"
      >
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
              Order Created Successfully 🎉
            </h2>
            <p className="text-sm text-[#4B5565] max-w-md mx-auto">
              You can now add measurements, moodboard, catalogue, expenses, and
              more on the order details page.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 w-full">
            <Button
              onClick={handleAddDesigns}
              className="w-full h-12 text-base font-medium rounded-2xl bg-primary hover:bg-primary/90"
            >
              Proceed to Order Details
            </Button>
            <Button
              onClick={handleCreateAnother}
              variant="outline"
              className="w-full h-12 text-base font-medium rounded-2xl border-primary text-primary hover:bg-primary/10"
            >
              <IconPlus className="size-5 mr-2" />
              Create Another Order
            </Button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default OrderSuccessDialog;
