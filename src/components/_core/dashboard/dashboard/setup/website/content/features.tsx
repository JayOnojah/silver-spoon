"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

interface Feature {
  id: string;
  title: string;
  description: string;
  selected: boolean;
}

const Features = () => {
  const [showFeatures, setShowFeatures] = useState(false);
  const [features, setFeatures] = useState<Feature[]>([
    {
      id: "1",
      title: "Quality Guarantee",
      description: "30-day satisfaction guarantee",
      selected: true,
    },
    {
      id: "2",
      title: "Payment Plans",
      description: "Flexible payment options",
      selected: true,
    },
    {
      id: "3",
      title: "Free Alterations",
      description: "First fitting included",
      selected: false,
    },
    {
      id: "4",
      title: "Home Delivery",
      description: "Convenient delivery service",
      selected: false,
    },
  ]);

  const handleFeatureToggle = (id: string) => {
    setFeatures(
      features.map((feature) =>
        feature.id === id
          ? { ...feature, selected: !feature.selected }
          : feature,
      ),
    );
  };

  const handleFeatureChange = (
    id: string,
    field: keyof Feature,
    value: string,
  ) => {
    setFeatures(
      features.map((feature) =>
        feature.id === id ? { ...feature, [field]: value } : feature,
      ),
    );
  };

  return (
    <div className="space-y-6">
      {/* Features Header with Toggle */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-foreground">Features</h3>
        <div className="flex items-center gap-3">
          <Label
            htmlFor="show-features"
            className="text-sm text-[#4B5565] cursor-pointer"
          >
            Show on website
          </Label>
          <Switch
            id="show-features"
            checked={showFeatures}
            onCheckedChange={setShowFeatures}
          />
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {features.map((feature) => (
          <div
            key={feature.id}
            className="flex gap-4 border border-[#E5E7EB] rounded-xl p-4 hover:border-primary/50 transition-colors"
          >
            {/* Checkbox */}
            <Checkbox
              checked={feature.selected}
              onCheckedChange={() => handleFeatureToggle(feature.id)}
              className={cn(
                "w-6 h-6 rounded shrink-0",
                feature.selected
                  ? "data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                  : "border-[#E5E7EB]",
              )}
            />

            <div className="flex-1 space-y-2">
              {/* Feature Title */}
              <Input
                value={feature.title}
                onChange={(e) => {
                  handleFeatureChange(feature.id, "title", e.target.value);
                }}
                placeholder="Feature title"
                className="h-9 rounded-xl font-bold border-0 p-0 focus-visible:ring-0 focus-visible:ring-offset-0"
              />

              {/* Feature Description */}
              <Input
                value={feature.description}
                onChange={(e) => {
                  handleFeatureChange(
                    feature.id,
                    "description",
                    e.target.value,
                  );
                }}
                placeholder="Feature description"
                className="h-9 rounded-xl text-sm text-[#9AA4B2] border-0 p-0 focus-visible:ring-0 focus-visible:ring-offset-0"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;
