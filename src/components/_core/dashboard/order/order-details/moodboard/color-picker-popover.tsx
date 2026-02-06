"use client";

import { useState, useCallback, useEffect } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/src/components/ui/input";
import { cn } from "@/lib/utils";

function parseHex(hex: string): { r: number; g: number; b: number; a: number } {
  const clean = hex.replace(/^#/, "").replace(/^(.{6}).*/, "$1");
  if (clean.length !== 6) return { r: 0, g: 0, b: 0, a: 1 };
  const r = Number.parseInt(clean.slice(0, 2), 16);
  const g = Number.parseInt(clean.slice(2, 4), 16);
  const b = Number.parseInt(clean.slice(4, 6), 16);
  return { r, g, b, a: 1 };
}

function rgbToHsl(
  r: number,
  g: number,
  b: number,
): { h: number; s: number; l: number } {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      default:
        h = ((r - g) / d + 4) / 6;
    }
  }
  return { h: h * 360, s: s * 100, l: l * 100 };
}

function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  h /= 360;
  s /= 100;
  l /= 100;
  let r: number;
  let g: number;
  let b: number;
  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }
  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

function hexFromRgb(r: number, g: number, b: number): string {
  return (
    "#" +
    [r, g, b]
      .map((x) => {
        const h = Math.max(0, Math.min(255, Math.round(x)));
        return h.toString(16).padStart(2, "0");
      })
      .join("")
  );
}

const SAVED_COLORS = [
  "#F74F25",
  "#F9F0EE",
  "#FFFFFF",
  "#121926",
  "#4F4665",
  "#6B7280",
  "#E5E7EB",
  "#D9D9D9",
  "#F65B39",
  "#EF4444",
  "#22C55E",
  "#3B82F6",
];

export interface ColorPickerPopoverProps {
  value: string;
  onChange: (hex: string) => void;
  label: string;
  triggerClassName?: string;
}

export function ColorPickerPopover({
  value,
  onChange,
  label,
  triggerClassName,
}: ColorPickerPopoverProps) {
  const rgb = parseHex(value);
  const { h, s, l } = rgbToHsl(rgb.r, rgb.g, rgb.b);
  const [open, setOpen] = useState(false);
  const [localH, setLocalH] = useState(h);
  const [localS, setLocalS] = useState(s);
  const [localL, setLocalL] = useState(l);
  const [localHex, setLocalHex] = useState(value.toUpperCase().replace("#", ""));

  const syncFromHex = useCallback((hex: string) => {
    const parsed = parseHex(hex);
    const hsl = rgbToHsl(parsed.r, parsed.g, parsed.b);
    setLocalH(hsl.h);
    setLocalS(hsl.s);
    setLocalL(hsl.l);
    setLocalHex(hex.replace(/^#/, "").toUpperCase().slice(0, 6));
  }, []);

  const commitHsl = useCallback(
    (newH: number, newS: number, newL: number) => {
      const [r, g, b] = hslToRgb(newH, newS, newL);
      const hex = hexFromRgb(r, g, b);
      onChange(hex);
      setLocalHex(hex.replace(/^#/, "").toUpperCase());
    },
    [onChange],
  );

  const handleSatLight = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = 1 - (e.clientY - rect.top) / rect.height;
    const newS = x * 100;
    const newL = y * 100;
    setLocalS(newS);
    setLocalL(newL);
    commitHsl(localH, newS, newL);
  };

  useEffect(() => {
    if (open) syncFromHex(value);
  }, [open, value, syncFromHex]);

  const onOpenChange = (next: boolean) => {
    setOpen(next);
    if (!next) syncFromHex(value);
  };

  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        <div
          className={cn(
            "flex items-center gap-2 cursor-pointer min-w-0",
            triggerClassName,
          )}
        >
          <div
            className="size-10 shrink-0 rounded-lg border border-[#E5E7EB]"
            style={{ backgroundColor: value }}
          />
          <Input
            value={`#${localHex}`}
            onChange={(e) => {
              const v = e.target.value;
              setLocalHex(v.replace(/^#/, "").toUpperCase().slice(0, 6));
              if (/^#[0-9A-Fa-f]{6}$/.test(v)) {
                onChange(v);
                syncFromHex(v);
              }
            }}
            onFocus={() => setOpen(true)}
            className="h-10 rounded-lg border-[#D0D5DD] font-mono text-sm w-24"
          />
        </div>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="w-64 p-4 rounded-lg border border-[#E5E7EB] bg-white shadow-lg"
        sideOffset={8}
      >
        <p className="text-xs font-medium text-[#6B7280] mb-2">{label}</p>
        <div
          className="relative w-full h-32 rounded-md mb-3 overflow-hidden cursor-crosshair border border-[#E5E7EB]"
          style={{
            background: `linear-gradient(to top, #000, transparent), linear-gradient(to right, #fff, hsl(${localH}, 100%, 50%))`,
          }}
          onMouseDown={(e) => {
            e.preventDefault();
            handleSatLight(e);
            const move = (ev: MouseEvent) => {
              const rect = (e.target as HTMLElement).getBoundingClientRect();
              const x = (ev.clientX - rect.left) / rect.width;
              const y = 1 - (ev.clientY - rect.top) / rect.height;
              const newS = Math.max(0, Math.min(100, x * 100));
              const newL = Math.max(0, Math.min(100, y * 100));
              setLocalS(newS);
              setLocalL(newL);
              commitHsl(localH, newS, newL);
            };
            const up = () => {
              window.removeEventListener("mousemove", move);
              window.removeEventListener("mouseup", up);
            };
            window.addEventListener("mousemove", move);
            window.addEventListener("mouseup", up);
          }}
        />
        <div
          className="h-2 rounded-full mb-3 cursor-pointer border border-[#E5E7EB] overflow-hidden"
          style={{
            background: `linear-gradient(to right, #f00, #ff0, #0f0, #0ff, #00f, #f0f, #f00)`,
          }}
          onMouseDown={(e) => {
            e.preventDefault();
            const rect = e.currentTarget.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const newH = Math.max(0, Math.min(360, x * 360));
            setLocalH(newH);
            commitHsl(newH, localS, localL);
            const move = (ev: MouseEvent) => {
              const x = (ev.clientX - rect.left) / rect.width;
              const newH = Math.max(0, Math.min(360, x * 360));
              setLocalH(newH);
              commitHsl(newH, localS, localL);
            };
            const up = () => {
              window.removeEventListener("mousemove", move);
              window.removeEventListener("mouseup", up);
            };
            window.addEventListener("mousemove", move);
            window.addEventListener("mouseup", up);
          }}
        />
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs text-[#6B7280] w-8">Hex</span>
          <Input
            value={localHex}
            onChange={(e) => {
              const v = e.target.value.replace(/[^0-9A-Fa-f]/g, "").slice(0, 6);
              setLocalHex(v.toUpperCase());
              if (v.length === 6) {
                const hex = `#${v}`;
                onChange(hex);
                syncFromHex(hex);
              }
            }}
            className="h-8 font-mono text-xs flex-1"
          />
        </div>
        <p className="text-xs font-medium text-[#6B7280] mb-1.5">
          Saved colors
        </p>
        <div className="flex flex-wrap gap-1.5">
          {SAVED_COLORS.map((hex) => (
            <button
              key={hex}
              type="button"
              onClick={() => {
                onChange(hex);
                syncFromHex(hex);
              }}
              className={cn(
                "size-6 rounded-full border-2 shrink-0 transition-colors",
                value.toLowerCase() === hex.toLowerCase()
                  ? "border-[#4F4665] ring-1 ring-offset-1 ring-[#4F4665]"
                  : "border-transparent hover:border-[#CDD5DF]",
              )}
              style={{ backgroundColor: hex }}
              aria-label={`Pick ${hex}`}
            />
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
