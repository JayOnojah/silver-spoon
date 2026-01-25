"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

interface Step {
  id: string;
  number: number;
  title: string;
  description: string;
}

const HowItWorks = () => {
  const [showHowItWorks, setShowHowItWorks] = useState(false);
  const [steps, setSteps] = useState<Step[]>([
    {
      id: "1",
      number: 1,
      title: "Consultation",
      description: "",
    },
    {
      id: "2",
      number: 2,
      title: "Measurement",
      description: "",
    },
    {
      id: "3",
      number: 3,
      title: "Design & Fabric",
      description: "",
    },
  ]);

  const handleStepChange = (
    id: string,
    field: keyof Step,
    value: string | number,
  ) => {
    setSteps(
      steps.map((step) =>
        step.id === id ? { ...step, [field]: value } : step,
      ),
    );
  };

  return (
    <div className="space-y-6">
      {/* How It Works Header with Toggle */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-foreground">How It Works</h3>
        <div className="flex items-center gap-3">
          <Label
            htmlFor="show-how-it-works"
            className="text-sm text-[#4B5565] cursor-pointer"
          >
            Show on website
          </Label>
          <Switch
            id="show-how-it-works"
            checked={showHowItWorks}
            onCheckedChange={setShowHowItWorks}
          />
        </div>
      </div>

      {/* Steps List */}
      <div className="space-y-4">
        {steps.map((step) => (
          <div
            key={step.id}
            className="border border-[#E5E7EB] rounded-xl p-4 space-y-4"
          >
            <div className="flex items-start gap-4">
              {/* Step Number Circle */}
              <div className="bg-primary text-white rounded-full w-10 h-10 flex items-center justify-center shrink-0 font-bold text-lg">
                {step.number}
              </div>

              {/* Step Content */}
              <div className="flex-1 space-y-4">
                {/* Step Title */}
                <div className="space-y-2">
                  <Label className="text-[#4B5565] text-sm">Step Title</Label>
                  <Input
                    value={step.title}
                    onChange={(e) =>
                      handleStepChange(step.id, "title", e.target.value)
                    }
                    placeholder="Enter step title"
                    className="h-11 rounded-xl"
                  />
                </div>

                {/* Step Description */}
                <div className="space-y-2">
                  <Label className="text-[#4B5565] text-sm">Description</Label>
                  <Textarea
                    value={step.description}
                    onChange={(e) =>
                      handleStepChange(step.id, "description", e.target.value)
                    }
                    placeholder={
                      step.number === 1
                        ? "Discuss your vision and requirements"
                        : step.number === 2
                          ? "Precise measurements for perfect fit"
                          : "Choose design and select fabrics"
                    }
                    className="min-h-24 rounded-xl resize-none"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;
