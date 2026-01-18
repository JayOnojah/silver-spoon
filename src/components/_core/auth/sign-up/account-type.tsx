"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FashionSvg, FootwearSvg } from "./svg";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type BusinessType = "fashion-designer" | "cobbler" | null;
interface IProps {
  setActive: React.Dispatch<React.SetStateAction<"acc-type" | "basic-info">>;
}
const AccountType = ({ setActive }: IProps) => {
  const [selectedType, setSelectedType] =
    useState<BusinessType>("fashion-designer");

  return (
    <div className="flex flex-col h-full justify-center max-w-163.5 mx-auto">
      {/* Title */}
      <h1 className="text-3xl font-extrabold text-foreground mb-1">
        Create Your Account
      </h1>

      {/* Subtitle */}
      <p className="text-sm text-[#9AA4B2] mb-8">Select your business type.</p>

      {/* Business Type Cards */}
      <span className="font-medium text-[#4B5565] pb-1">
        I am <span className="text-primary">*</span>
      </span>
      <div className="grid sm:grid-cols-2 gap-4 mb-8">
        {/* Fashion Designer Card */}
        <button
          type="button"
          onClick={() => setSelectedType("fashion-designer")}
          className={cn(
            "flex flex-col items-center justify-center p-5 rounded-2xl border transition-all",
            selectedType === "fashion-designer"
              ? "bg-[#FFF1EC] border-primary text-primary"
              : "bg-white border-[#CDD5DF] hover:border-primary/50",
          )}
        >
          <div className="mb-4 flex items-center justify-center [&_svg]:size-8">
            <FashionSvg />
          </div>
          <span className="text-sm font-medium text-foreground">
            Fashion Designer
          </span>
        </button>

        {/* Cobbler/Footwear Card */}
        <button
          type="button"
          onClick={() => setSelectedType("cobbler")}
          className={cn(
            "flex flex-col items-center justify-center p-5 rounded-xl border transition-all",
            selectedType === "cobbler"
              ? "bg-[#FFF1EC] border-primary text-primary"
              : "bg-white border-[#CDD5DF] hover:border-primary/50",
          )}
        >
          <div className="mb-4 flex items-center justify-center [&_svg]:size-8">
            <FootwearSvg />
          </div>
          <span className="text-sm font-medium text-foreground">
            Cobbler/Footwear
          </span>
        </button>
      </div>

      {/* Continue Button */}
      <Button
        type="button"
        onClick={() => setActive("basic-info")}
        className="w-full h-12 text-base font-medium rounded-2xl mb-6"
        disabled={!selectedType}
      >
        Continue
      </Button>

      {/* Login Link */}
      <p className="text-center text-sm text-[#9AA4B2]">
        Already have an account?{" "}
        <Link
          href="/auth/sign-in"
          className="text-primary hover:underline font-medium"
        >
          Login
        </Link>
      </p>
    </div>
  );
};

export default AccountType;
