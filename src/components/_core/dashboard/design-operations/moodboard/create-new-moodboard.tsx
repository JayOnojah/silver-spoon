"use client";

import React from "react";
import { ArrowLeft, Check } from "lucide-react";

import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Textarea } from "@/src/components/ui/textarea";
import { Label } from "@/src/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/src/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";

import type { AssociatedWith, LayoutStyle } from "./add-moodboard";

type Props = {
  title: string;
  setTitle: (v: string) => void;

  description: string;
  setDescription: (v: string) => void;

  associatedWith: AssociatedWith;
  setAssociatedWith: (v: AssociatedWith) => void;

  orderValue: string;
  setOrderValue: (v: string) => void;

  primaryHex: string;
  setPrimaryHex: (v: string) => void;

  secondaryHex: string;
  setSecondaryHex: (v: string) => void;

  layoutStyle: LayoutStyle;
  setLayoutStyle: (v: LayoutStyle) => void;

  canCreate: boolean;
  onBack: () => void;
  onCreate: () => void;
};

export function CreateNewMoodboard({
  title,
  setTitle,
  description,
  setDescription,
  associatedWith,
  setAssociatedWith,
  orderValue,
  setOrderValue,
  primaryHex,
  setPrimaryHex,
  secondaryHex,
  setSecondaryHex,
  layoutStyle,
  setLayoutStyle,
  canCreate,
  onBack,
  onCreate,
}: Props) {
  return (
    <div className="md:px-8 px-4 md:pt-6 pt-6 md:pb-8 pb-6">
      {/* Back */}
      <button
        type="button"
        onClick={onBack}
        className="mb-2 inline-flex items-center gap-2 text-sm font-semibold text-[#121926]/80 hover:text-[#121926]"
      >
        <ArrowLeft className="h-5 w-5" />
        <span className="hidden md:inline">Back</span>
      </button>

      <div className="text-start space-y-1">
        <h2 className="text-[28px] md:text-[30px] font-black text-[#121926]">
          Create New Moodboard
        </h2>

        <p className="text-sm md:text-base text-[#9AA4B2]">
          Provide basic order Information. You can add designs after
        </p>
      </div>

      <div className="mt-6 space-y-5">
        {/* Title */}
        <div className="space-y-2">
          <Label className="text-[#475467] font-semibold">
            Title <span className="text-[#F74F25]">*</span>
          </Label>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter Title"
            className="h-12 rounded-xl border-[#D0D5DD]"
          />
        </div>

        {/* Description */}
        <div className="space-y-2">
          <Label className="text-[#475467] font-semibold">
            Description <span className="text-[#F74F25]">*</span>
          </Label>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter Short Description..."
            className="min-h-27.5 rounded-xl border-[#D0D5DD] resize-none"
          />
        </div>

        {/* Associated With */}
        <div className="space-y-3">
          <Label className="text-[#475467] font-semibold">
            Associated With<span className="text-[#F74F25]">*</span>
          </Label>

          <RadioGroup
            value={associatedWith}
            onValueChange={(v) => setAssociatedWith(v as AssociatedWith)}
            className="flex flex-wrap gap-6"
          >
            <label className="flex items-center gap-2 font-semibold text-[#121926] text-base">
              <RadioGroupItem value="order" className="border-[#F74F25] text-[#F74F25]" />
              An Order
            </label>

            <label className="flex items-center gap-2 font-semibold text-[#121926] text-base">
              <RadioGroupItem value="customer" />
              A Customer
            </label>

            <label className="flex items-center gap-2 font-semibold text-[#121926] text-base">
              <RadioGroupItem value="personal" />
              A Personal Project
            </label>
          </RadioGroup>
        </div>

        {/* Select Order */}
        {associatedWith === "order" && (
          <div className="space-y-2">
            <Select value={orderValue} onValueChange={setOrderValue}>
              <SelectTrigger className="h-12 rounded-xl border-[#D0D5DD] w-full">
                <SelectValue placeholder="Select Order" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="order-001">Order 001</SelectItem>
                <SelectItem value="order-002">Order 002</SelectItem>
                <SelectItem value="order-003">Order 003</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}

        {/* Theme Color */}
        <div className="rounded-xl border border-[#D0D5DD] p-4">
          <p className="font-bold text-[#475467]">
            Theme Color<span className="text-[#F74F25]">*</span>
          </p>

          <div className="mt-3 grid gap-4 md:grid-cols-2">
            {/* Primary */}
            <div className="space-y-2">
              <Label className="text-[#475467] font-semibold text-xs">
                Primary Background Color<span className="text-[#F74F25]">*</span>
              </Label>

              <div className="flex items-center gap-3">
                <div
                  className="h-12 w-16 rounded-xl border border-[#D0D5DD]"
                  style={{ backgroundColor: primaryHex }}
                />
                <Input
                  value={primaryHex}
                  onChange={(e) => setPrimaryHex(e.target.value)}
                  className="h-12 rounded-xl border-[#D0D5DD]"
                />
              </div>
            </div>

            {/* Secondary */}
            <div className="space-y-2">
              <Label className="text-[#475467] font-semibold text-xs">
                Secondary Background Color<span className="text-[#F74F25]">*</span>
              </Label>

              <div className="flex items-center gap-3">
                <div
                  className="h-12 w-16 rounded-xl border border-[#D0D5DD]"
                  style={{ backgroundColor: secondaryHex }}
                />
                <Input
                  value={secondaryHex}
                  onChange={(e) => setSecondaryHex(e.target.value)}
                  className="h-12 rounded-xl border-[#D0D5DD]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Layout Style */}
        <div className="space-y-3">
          <Label className="text-[#475467] font-semibold">
            Layout Style <span className="text-[#F74F25]">*</span>
          </Label>

          <div className="grid gap-4 md:grid-cols-2">
            <LayoutCard

              title="3-Column Grid"
              selected={layoutStyle === "grid3"}
              onClick={() => setLayoutStyle("grid3")}
              variant="grid3"
            />
            <LayoutCard
              title="4-Column Grid"
              selected={layoutStyle === "grid4"}
              onClick={() => setLayoutStyle("grid4")}
              variant="grid4"
            />
            <LayoutCard
              title="Masonry"
              selected={layoutStyle === "masonry"}
              onClick={() => setLayoutStyle("masonry")}
              variant="masonry"
              className="md:col-span-1"
            />
          </div>
        </div>

        {/* Footer button */}
        <div className="pt-2">
          <Button
            type="button"
            disabled={!canCreate}
            className={[
              "w-full h-12 rounded-2xl font-bold",
              canCreate
                ? "bg-[#F74F25] text-white hover:bg-[#F74F25]/90"
                : "bg-[#F74F25]/40 text-white",
            ].join(" ")}
            onClick={onCreate}
          >
            Create Moodboard
          </Button>
        </div>
      </div>
    </div>
  );
}

function LayoutCard({
  title,
  selected,
  onClick,
  variant,
  className = "",
}: {
  title: string;
  selected: boolean;
  onClick: () => void;
  variant: "grid3" | "grid4" | "masonry";
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "relative w-full rounded-xl border bg-white p-4 text-left transition",
        selected ? "border-[#F74F25]" : "border-[#D0D5DD] hover:border-[#B9C0CA]",
        className,
      ].join(" ")}
    >
      {selected && (
        <span className="absolute -left-3 -top-3 inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#F74F25] text-white">
          <Check className="h-4 w-4" />
        </span>
      )}

      <div className="flex gap-3">
        {variant === "grid3" && (
          <>
            <div className="h-14 flex-1 rounded-xs bg-[#D9D9D9]" />
            <div className="h-14 flex-1 rounded-xs bg-[#D9D9D9]" />
            <div className="h-14 flex-1 rounded-xs bg-[#D9D9D9]" />
          </>
        )}

        {variant === "grid4" && (
          <>
            <div className="h-14 flex-1 rounded-xs bg-[#D9D9D9]" />
            <div className="h-14 flex-1 rounded-xs bg-[#D9D9D9]" />
            <div className="h-14 flex-1 rounded-xs bg-[#D9D9D9]" />
            <div className="h-14 flex-1 rounded-xs bg-[#D9D9D9]" />
          </>
        )}

        {variant === "masonry" && (
          <>
            <div className="h-14 w-[22%] rounded-xs bg-[#D9D9D9]" />
            <div className="h-14 w-[22%] rounded-xs bg-[#D9D9D9]" />
            <div className="flex h-14 w-[22%] flex-col gap-2">
              <div className="h-[48%] rounded-xs bg-[#D9D9D9]" />
              <div className="h-[48%] rounded-xs bg-[#D9D9D9]" />
            </div>
            <div className="h-14 w-[22%] rounded-xs bg-[#D9D9D9]" />
          </>
        )}
      </div>

      <p className="mt-3 font-semibold text-[#121926]">{title}</p>
    </button>
  );
}
