"use client";

import React from "react";
import { Check, Plus } from "lucide-react";
import { Button } from "@/src/components/ui/button";

type Props = {
  onClose: () => void;
  onAddDesigns: () => void;
  onCreateAnother: () => void;
};

export function MoodboardSuccessModal({
  onClose,
  onAddDesigns,
  onCreateAnother,
}: Props) {
  return (
    <div className="relative px-4 py-8 md:px-10 md:py-10 font-sans">
      {/* Background (subtle grid + soft green tint like File) */}
      <div
        aria-hidden="true"
        className="absolute inset-0 rounded-3xl"
        style={{
          background:
            "linear-gradient(180deg, rgba(236, 253, 243, 0.9) 0%, rgba(255,255,255,1) 55%), repeating-linear-gradient(0deg, rgba(16,24,40,0.04) 0px, rgba(16,24,40,0.04) 1px, transparent 1px, transparent 18px), repeating-linear-gradient(90deg, rgba(16,24,40,0.04) 0px, rgba(16,24,40,0.04) 1px, transparent 1px, transparent 18px)",
        }}
      />

      {/* Close */}
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute right-5 top-5 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full"
      >
      </button>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center">
        {/* Green circle + check */}
        <div className="mt-2 flex h-24 w-24 items-center justify-center rounded-full bg-[#40B773] md:h-24 md:w-24">
          <Check className="h-10 w-10 text-white" />
        </div>

        <h2 className="mt-6 text-[28px] leading-8 md:text-3xl md:leading-9 font-black text-[#121926]">
          Moodboard Created
          <br />
          Successfully🎉
        </h2>

        <p className="mt-3 max-w-105 text-base md:text-[15px] text-[#9AA4B2]">
          Add your inspiration now or come back anytime.
        </p>

        <div className="mt-8 w-full max-w-130 space-y-4">
          {/* Primary */}
          <Button
            type="button"
            onClick={onAddDesigns}
            className="w-full h-12 rounded-2xl bg-[#F74F25] text-white font-bold hover:bg-[#F74F25]/90"
          >
            Add Designs To Moodboard
          </Button>

          {/* Secondary */}
          <Button
            type="button"
            variant="outline"
            onClick={onCreateAnother}
            className="w-full h-12 rounded-2xl border-[#F74F25] text-[#F74F25] font-bold hover:bg-[#F74F25]/5"
          >
            <Plus className="mr-2 h-5 w-5" />
            Create Another Moodboard
          </Button>
        </div>
      </div>
    </div>
  );
}
