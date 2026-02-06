"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { FashionSvg, FootwearSvg } from "./svg"; // adjust path if needed
import { Button } from "@/components/ui/button";

type BusinessType = "fashion-designer" | "cobbler" | null;

interface AccountTypeProps {
  setActive: React.Dispatch<React.SetStateAction<"acc-type" | "basic-info">>;
  setBusinessType: React.Dispatch<React.SetStateAction<BusinessType>>;
}

const AccountType = ({ setActive, setBusinessType }: AccountTypeProps) => {
  const [selectedType, setSelectedType] =
    useState<BusinessType>("fashion-designer");

  const handleContinue = () => {
    if (selectedType) {
      setBusinessType(selectedType);
      setActive("basic-info");
    }
  };

  return (
    <div className="flex flex-col h-full justify-center max-w-163.5 mx-auto">
      <h1 className="text-3xl font-extrabold text-foreground mb-1">
        Create Your Account
      </h1>

      <p className="text-sm text-[#9AA4B2] mb-8">Select your business type.</p>

      <span className="font-medium text-[#4B5565] pb-1">
        I am <span className="text-primary">*</span>
      </span>

      <div className="grid sm:grid-cols-2 gap-4 mb-8">
        <button
          type="button"
          onClick={() => setSelectedType("fashion-designer")}
          className={cn(
            "flex flex-col items-center justify-center p-5 rounded-2xl border transition-all duration-200",
            selectedType === "fashion-designer"
              ? "bg-[#FFF1EC] border-primary text-primary shadow-sm"
              : "bg-white border-[#CDD5DF] hover:border-primary/50 hover:shadow-sm",
          )}>
          <div className="mb-4 flex items-center justify-center [&_svg]:size-8">
            <FashionSvg />
          </div>
          <span className="text-sm font-medium text-foreground">
            Fashion Designer
          </span>
        </button>

        <button
          type="button"
          onClick={() => setSelectedType("cobbler")}
          className={cn(
            "flex flex-col items-center justify-center p-5 rounded-2xl border transition-all duration-200",
            selectedType === "cobbler"
              ? "bg-[#FFF1EC] border-primary text-primary shadow-sm"
              : "bg-white border-[#CDD5DF] hover:border-primary/50 hover:shadow-sm",
          )}>
          <div className="mb-4 flex items-center justify-center [&_svg]:size-8">
            <FootwearSvg />
          </div>
          <span className="text-sm font-medium text-foreground">
            Cobbler / Footwear
          </span>
        </button>
      </div>

      <Button
        type="button"
        onClick={handleContinue}
        className="w-full h-12 text-base font-medium rounded-2xl mb-6"
        disabled={!selectedType}>
        Continue
      </Button>

      <p className="text-center text-sm text-[#9AA4B2]">
        Already have an account?{" "}
        <Link
          href="/auth/sign-in"
          className="text-primary hover:underline font-medium">
          Login
        </Link>
      </p>
    </div>
  );
};

export default AccountType;
