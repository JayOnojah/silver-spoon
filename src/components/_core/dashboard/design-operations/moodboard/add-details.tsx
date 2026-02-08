"use client";

import { ArrowLeft } from "lucide-react";

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

import type { AssociatedWith } from "./add-moodboard";

type Props = {
  title: string;
  setTitle: (v: string) => void;

  description: string;
  setDescription: (v: string) => void;

  associatedWith: AssociatedWith;
  setAssociatedWith: (v: AssociatedWith) => void;

  orderValue: string;
  setOrderValue: (v: string) => void;

  canCreate: boolean;

  onBack: () => void;
  onCreate: () => void;
};

export function AddMoodboardDetailsStep({
  title,
  setTitle,
  description,
  setDescription,
  associatedWith,
  setAssociatedWith,
  orderValue,
  setOrderValue,
  canCreate,
  onBack,
  onCreate,
}: Props) {
  return (
    <div className="md:px-10 px-4 md:pt-6 pt-6 md:pb-8 pb-6">
      {/* Header row */}
      <div className="flex items-center justify-between mb-2">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#121926] hover:opacity-80"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back</span>
        </button>

        <span className="text-sm font-semibold text-[#12B76A]">
          Almost done!
        </span>
      </div>

      <div className="text-start space-y-2">
        <h2 className="text-[28px] md:text-[32px] font-black text-[#121926]">
          Add Moodboard Details
        </h2>

        <p className="text-sm md:text-base text-[#9AA4B2] max-w-130">
          Give your moodboard a title and a short description so it’s easy to
          find and understand later.
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
            <label className="flex items-center gap-2 font-semibold text-[#121926] text-sm">
              <RadioGroupItem
                value="order"
                className="border-[#F74F25] text-[#F74F25]"
              />
              An Order
            </label>

            <label className="flex items-center gap-2 font-semibold text-[#121926] text-sm">
              <RadioGroupItem value="customer" />
              A Customer
            </label>

            <label className="flex items-center gap-2 font-semibold text-[#121926] text-sm">
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
                {/* dummy items */}
                <SelectItem value="order-001">Order 001</SelectItem>
                <SelectItem value="order-002">Order 002</SelectItem>
                <SelectItem value="order-003">Order 003</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}

        {/* Create button */}
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
