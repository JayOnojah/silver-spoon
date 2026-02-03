import { Button } from "@/src/components/ui/button";
import { IconMail, IconMapPin, IconPhone } from "@tabler/icons-react";
import React from "react";

const CustomerInfo = () => {
  return (
    <div className="bg-white rounded-xl p-6">
      <h3 className="text-lg font-bold text-foreground mb-4">
        Customer Information
      </h3>

      <div className="space-y-4">
        <div className="flex items-center gap-3 border-b border-[#E5E7EB] pb-4">
          <div className="size-12 rounded-full bg-primary flex items-center justify-center text-white font-bold">
            SJ
          </div>
          <div>
            <p className="font-semibold text-foreground">Sarah Johns</p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm text-[#4B5565]">
            <IconMail className="size-4 text-[#9AA4B2]" />
            <span>einstein.oyakhilome1@gmail.com</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-[#4B5565]">
            <IconPhone className="size-4 text-[#9AA4B2]" />
            <span>0906847344409</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-[#4B5565]">
            <IconMapPin className="size-4 text-[#9AA4B2]" />
            <span>15 Victoria Island, Lagos</span>
          </div>
        </div>

        <Button
          variant="outline"
          className="w-full border-primary text-primary hover:bg-primary hover:text-white rounded-md h-10"
        >
          View Profile
        </Button>
      </div>
    </div>
  );
};

export default CustomerInfo;
