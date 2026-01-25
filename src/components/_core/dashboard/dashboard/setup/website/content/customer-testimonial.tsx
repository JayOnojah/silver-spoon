"use client";

import { useState } from "react";
import { IconCheck, IconPlus } from "@tabler/icons-react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

const CustomerTestimonial = () => {
  const [showTestimonials, setShowTestimonials] = useState(false);
  const [testimonials, setTestimonials] = useState<any[]>([]);

  const handleAddTestimonial = () => {
    // TODO: Open add testimonial dialog/modal
    console.log("Add testimonial");
  };

  return (
    <div className="space-y-6">
      {/* Testimonials Header with Toggle */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-foreground">Testimonials</h3>
        <div className="flex items-center gap-3">
          <Label
            htmlFor="show-testimonials"
            className="text-sm text-[#4B5565] cursor-pointer"
          >
            Show on website
          </Label>
          <Switch
            id="show-testimonials"
            checked={showTestimonials}
            onCheckedChange={setShowTestimonials}
          />
        </div>
      </div>

      {/* Empty State */}
      {testimonials.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 px-4">
          <div className="bg-white rounded-xl p-8 w-full max-w-md space-y-4">
            {/* Icon */}
            <div className="flex justify-center">
              <div className="size-20 rounded-full border-2 border-primary bg-white flex items-center justify-center">
                <IconCheck className="size-10 text-primary" strokeWidth={2} />
              </div>
            </div>

            {/* Message */}
            <div className="text-center space-y-2">
              <h3 className="text-base font-bold text-foreground">
                No testimonials added yet
              </h3>
              <p className="text-sm text-[#9AA4B2]">
                Testimonials help build trust and credibility. Add feedback from
                your clients to showcase the quality of your services.
              </p>
            </div>

            {/* Add Testimonial Button */}
            <div className="flex justify-center pt-2">
              <Button
                type="button"
                onClick={handleAddTestimonial}
                className="h-11 text-base font-medium rounded-xl bg-primary hover:bg-primary/90 px-6"
              >
                <IconPlus className="size-5 mr-2" />
                Add Testimonial
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Testimonials list will go here */}
          <p className="text-sm text-[#9AA4B2] text-center">
            Testimonials list coming soon...
          </p>
        </div>
      )}
    </div>
  );
};

export default CustomerTestimonial;
