"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

type DesignImage = {
  id: string;
  imageUrl: string;
};

type Props = {
  designs: DesignImage[];
  onBack: () => void;
  onChange: () => void;
  onProceed: () => void;
};

export function PreviewMoodboardStep({ designs, onBack, onChange, onProceed }: Props) {
  return (
    <div className="px-5 pb-7 pt-7 md:px-10 md:pb-10">
      <button
        type="button"
        onClick={onBack}
        className="mb-2 inline-flex items-center gap-2 text-sm font-semibold text-[#121926]/80 hover:text-[#121926]"
      >
        <ArrowLeft className="h-5 w-5" />
        <span className="hidden md:inline">Back</span>
      </button>

      <h2 className="text-[28px] md:text-2xl font-black text-[#121926]">
        Preview Moodboard
      </h2>

      <div className="mt-5 rounded-2xl border border-[#D0D5DD] p-4">
        <div className="grid grid-cols-3 gap-3">
          {designs.slice(0, 6).map((d) => (
            <div
              key={d.id}
              className="overflow-hidden rounded-xl border border-[#F3D8D0] bg-[#FFF5F1]"
            >
              <div className="relative h-26 w-full md:h-30">
                <Image
                  src={d.imageUrl}
                  alt="preview design"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 33vw, 180px"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-7 space-y-4">
        <Button
          type="button"
          variant="outline"
          onClick={onChange}
          className="h-12 w-40 rounded-2xl border-[#F74F25] text-[#F74F25] font-bold hover:bg-[#F74F25]/5"
        >
          Change
        </Button>

        <Button
          type="button"
          onClick={onProceed}
          className="h-14 w-full rounded-2xl bg-[#F74F25] text-white font-bold hover:bg-[#F74F25]/90"
        >
          Proceed
        </Button>
      </div>
    </div>
  );
}
