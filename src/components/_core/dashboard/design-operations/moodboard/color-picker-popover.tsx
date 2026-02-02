"use client";

import React, { useMemo, useState } from "react";
import { RgbaColorPicker } from "react-colorful";
import { ChevronDown } from "lucide-react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"; 

type Rgba = { r: number; g: number; b: number; a: number };

const SAVED_COLORS = [
  "#EF4444", "#F97316", "#FACC15", "#4ADE80", "#2DD4BF", "#3B82F6", "#6366F1",
  "#EC4899", "#F43F5E", "#D946EF", "#8B5CF6", "#0EA5E9", "#10B981", "#84CC16",
];

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

function normalizeHex(input: string) {
  const v = (input ?? "").trim();
  const withHash = v.startsWith("#") ? v : `#${v}`;
  // keep #RRGGBB
  return withHash.slice(0, 7).toUpperCase();
}

function hexToRgba(hex: string, alpha = 1): Rgba {
  const h = normalizeHex(hex).replace("#", "");
  const r = parseInt(h.slice(0, 2) || "00", 16);
  const g = parseInt(h.slice(2, 4) || "00", 16);
  const b = parseInt(h.slice(4, 6) || "00", 16);
  return { r, g, b, a: clamp(alpha, 0, 1) };
}

function rgbaToHex({ r, g, b }: Rgba) {
  const toHex = (n: number) => clamp(Math.round(n), 0, 255).toString(16).padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
}

type Props = {
  value: string; // "#FFFFFF"
  onChange: (hex: string) => void;
  swatchClassName?: string; // to control size (used h-12 w-16)
};

export function ColorPickerPopover({ value, onChange, swatchClassName = "" }: Props) {
  
  const [alpha, setAlpha] = useState(1);

  const safeHex = useMemo(() => normalizeHex(value || "#FFFFFF"), [value]);
  const rgba = useMemo(() => hexToRgba(safeHex, alpha), [safeHex, alpha]);

  const alphaPercent = Math.round(alpha * 100);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          aria-label="Pick color"
          className={[
            "rounded-xl border border-[#D0D5DD] cursor-pointer",
            swatchClassName || "h-12 w-16",
          ].join(" ")}
          style={{ backgroundColor: safeHex }}
        />
      </PopoverTrigger>

      <PopoverContent
        className="w-70 rounded-xl p-4 shadow-lg"
        align="start"
        sideOffset={10}
        collisionPadding={16}
      >
        {/* big picker (square + hue + alpha slider) */}
        <div className="rounded-lg overflow-hidden">
          <RgbaColorPicker
            color={rgba}
            onChange={(next) => {
              setAlpha(next.a);
              onChange(rgbaToHex(next));
            }}
            style={{ width: "100%", height: 180 }}
          />
        </div>

        {/* Hex row + 100% (in design) */}
        <div className="mt-4 grid grid-cols-[80px_1fr_60px] gap-2 items-center">
          <div className="h-10 rounded-lg border border-[#D0D5DD] px-2 flex items-center justify-between text-sm text-[#475467] bg-white">
            <span>Hex</span>
            <ChevronDown className="h-4 w-4 text-[#98A2B3]" />
          </div>

          <input
            value={safeHex}
            onChange={(e) => onChange(normalizeHex(e.target.value))}
            className="h-10 rounded-lg border border-[#D0D5DD] px-2 text-sm text-[#121926] outline-none bg-white w-full"
          />

          <div className="h-10 rounded-lg border border-[#D0D5DD] px-2 flex items-center justify-center text-sm text-[#475467] bg-white">
            {alphaPercent}%
          </div>
        </div>

        {/* saved colors */}
        <p className="mt-4 text-xs font-semibold text-[#667085]">Saved colors:</p>

        <div className="mt-2 grid grid-cols-7 gap-2">
          {SAVED_COLORS.map((c) => {
            const isActive = safeHex.toLowerCase() === c.toLowerCase();
            return (
              <button
                key={c}
                type="button"
                onClick={() => onChange(c)}
                className={[
                  "h-8 w-8 rounded-full border border-black/10",
                  isActive ? "ring-2 ring-[#98A2B3]" : "",
                ].join(" ")}
                style={{ backgroundColor: c }}
                aria-label={`Choose ${c}`}
              />
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
}
