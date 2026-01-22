"use client";

import { useState } from "react";
import { IconCheck, IconChevronDown } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import BusinessSetupDialog from "./business-setup-dialog";
import CatalogSetup from "./catalog";

const Setup = () => {
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [isBusinessDialogOpen, setIsBusinessDialogOpen] = useState(false);
  const [isAddFirstCustomerDialogOpen, setIsAddFirstCustomerDialogOpen] =
    useState(false);
  const [isCatalogueDialogOpen, setIsCatalogueDialogOpen] = useState(false);
  const totalSteps = 5;
  const progress = (completedSteps.length / totalSteps) * 100;

  const steps = [
    {
      id: 1,
      title: "Complete Business Profile",
      description: "Complete business profile to start managing your business.",
      buttonText: "Complete Profile",
      completed: completedSteps.includes(1),
      onclick: () => setIsBusinessDialogOpen(true),
    },
    {
      id: 2,
      title: "Create Your Catalogue",
      description: "Create your first catalogue to organize your products.",
      buttonText: "Create Catalogue",
      completed: completedSteps.includes(2),
      onclick: () => setIsCatalogueDialogOpen(true),
    },
    {
      id: 3,
      title: "Add Your First Customer",
      description: "",
      completed: completedSteps.includes(3),
      onclick: () => setIsBusinessDialogOpen(true),
    },
    {
      id: 4,
      title: "Create Your First Order",
      description: "",
      completed: completedSteps.includes(4),
      onclick: () => setIsBusinessDialogOpen(true),
    },
    {
      id: 5,
      title: "Set Up Your Website",
      description: "",
      completed: completedSteps.includes(5),
      onclick: () => setIsBusinessDialogOpen(true),
    },
  ];

  const handleBusinessSubmit = (data: any) => {
    // Handle business setup submission
    console.log("Business setup data:", data);
    // Mark step 1 as completed
    if (!completedSteps.includes(1)) {
      setCompletedSteps([...completedSteps, 1]);
    }
    // Move to next step (catalog)
    setIsBusinessDialogOpen(false);
  };

  const handleCatalogueSubmit = (data: any) => {
    // Handle catalogue creation
    console.log("Catalogue data:", data);
    // Mark step 2 as completed
    if (!completedSteps.includes(2)) {
      setCompletedSteps([...completedSteps, 2]);
    }
    // Close the step
  };

  return (
    <div className="space-y-6">
      <BusinessSetupDialog
        open={isBusinessDialogOpen}
        onOpenChange={setIsBusinessDialogOpen}
        onSubmit={handleBusinessSubmit}
      />

      <CatalogSetup
        open={isCatalogueDialogOpen}
        onOpenChange={setIsCatalogueDialogOpen}
        onComplete={handleCatalogueSubmit}
      />
      {/* Get Started Card */}
      <div className="rounded p-6 bg-white">
        {/* Title Section */}
        <div className="mb-4">
          <h2 className="text-xl font-bold text-foreground mb-1">
            Let's Help Your Business Get Started 🚀
          </h2>
          <p className="text-sm text-[#4B5565]">
            Complete these essential steps to start managing your business.
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <Progress value={progress} className="h-2" />
        </div>

        {/* Steps Accordion */}
        <Accordion
          type="single"
          collapsible
          defaultValue="item-1"
          className="w-full"
        >
          {steps.map((step) => (
            <AccordionItem
              key={step.id}
              value={`item-${step.id}`}
              className="border-b border-[#E5E7EB] last:border-b-0"
            >
              <AccordionTrigger
                className="hover:no-underline py-4"
                icon={
                  <IconChevronDown className="text-[#4B5565] size-5 shrink-0 transition-transform duration-200 data-[state=open]:rotate-180" />
                }
              >
                <div className="flex items-start gap-3 flex-1">
                  {/* Step Icon */}
                  <div
                    className={cn(
                      "w-6 h-6 rounded-full flex items-center justify-center shrink-0",
                      step.completed
                        ? "bg-primary"
                        : "bg-[#E5E7EB] border border-[#CDD5DF]",
                    )}
                  >
                    {step.completed && (
                      <IconCheck className="size-4 text-white" />
                    )}
                  </div>
                  {/* Step Title */}
                  <div
                    className={cn(
                      "text-sm font-semibold",
                      step.completed
                        ? "text-foreground font-bold"
                        : "text-[#4B5565]",
                    )}
                  >
                    {step.title}
                    <p className="text-xs text-[#9AA4B2] font-normal">
                      {step.description}
                    </p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                {step.description && (
                  <div className="pl-9 space-y-4">
                    {step.buttonText && (
                      <Button
                        onClick={step.onclick}
                        className="bg-primary hover:bg-primary/90 rounded-xl h-10"
                      >
                        {step.buttonText}
                      </Button>
                    )}
                  </div>
                )}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default Setup;
