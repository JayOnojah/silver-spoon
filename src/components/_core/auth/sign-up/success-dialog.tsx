"use client";

import { IconCheck, IconWorld } from "@tabler/icons-react";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  CartSvg,
  CatalogueSvg,
  MoodBoardsSvg,
  MultipleUserSvg,
  NoteSvg,
  PlaySvg,
} from "./svg";

interface SuccessDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onGoToDashboard?: () => void;
}

const features = [
  {
    icon: MultipleUserSvg,
    title: "Managing customers",
    description: "Import or create your first customer profiles.",
  },
  {
    icon: IconWorld,
    title: "Set up your website",
    description: "Create your online storefront & catalogue.",
  },
  {
    icon: CartSvg,
    title: "Orders",
    description: "Create and manage orders for your customers.",
  },
  {
    icon: CatalogueSvg,
    title: "Catalogue",
    description: "Showcase your styles and products effortlessly.",
  },
  {
    icon: MoodBoardsSvg,
    title: "Moodboards",
    description: "Collect and organize your creative ideas in one place.",
  },
  {
    icon: NoteSvg,
    title: "Notes",
    description: "Save quick thoughts and project details as you work.",
  },
];

const SuccessDialog = ({
  open,
  onOpenChange,
  onGoToDashboard,
}: SuccessDialogProps) => {
  const handleGoToDashboard = () => {
    onGoToDashboard?.();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={true}
        className="max-w-200! rounded-xl p-4 sm:p-6 overflow-y-auto max-h-[90vh] bg-[linear-gradient(180deg,#EBFAED_0%,#FFFFFF_44%)]"
      >
        <DialogHeader className="space-y-6">
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-[#10B981]/10 rounded-full blur-2xl" />
              <div className="relative bg-[#10B981] rounded-full p-4 w-20 h-20 flex items-center justify-center">
                <IconCheck className="size-10 text-white" strokeWidth={3} />
              </div>
            </div>
          </div>
        </DialogHeader>

        {/* Title */}
        <div className="text-center space-y-3">
          <h2 className="text-3xl font-bold text-foreground">
            Your account has been created successfully
          </h2>
          <p className="text-sm text-[#4B5565] max-w-2xl mx-auto">
            You're all set! Before you dive in, explore tools that help you run
            and grow your creative business.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={index}
                className="border border-[#CDD5DF] rounded-md p-3 bg-[#F8FAFC] hover:border-primary/50 transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="text-primary">
                    <IconComponent className="size-6 text-primary" />
                  </div>
                </div>
                <h3 className="text-sm font-semibold text-[#364152] mb-2">
                  {feature.title}
                </h3>
                <p className="text-xs text-[#697586] mb-4">
                  {feature.description}
                </p>
                <button className="text-primary hover:text-primary/80 p-0 h-auto font-medium text-xs flex gap-2 items-center">
                  How It Works
                  <PlaySvg />
                </button>
              </div>
            );
          })}
        </div>

        {/* Footer Link */}
        <div className="text-center pt-4">
          <button
            onClick={handleGoToDashboard}
            className="text-primary hover:underline font-medium text-sm"
          >
            I'll watch this later, take me to the dashboard
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SuccessDialog;
