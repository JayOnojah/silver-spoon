"use client";

import { useState } from "react";
import { IconCheck } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface Template {
  id: string;
  name: string;
  description: string;
}

const templates: Template[] = [
  {
    id: "1",
    name: "Elegant Minimal",
    description: "Modern & Clean",
  },
  {
    id: "2",
    name: "Elegant Minimal",
    description: "Modern & Clean",
  },
];

const ChooseTemplate = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<string>("1");

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-foreground mb-2">
        Choose Your Template
      </h2>
      <p className="text-sm text-[#9AA4B2] mb-8">
        Select a professionally designed template that matches your brand style
      </p>

      {/* Template Cards */}
      <div className="grid gap-6">
        {templates.map((template) => (
          <div
            key={template.id}
            onClick={() => setSelectedTemplate(template.id)}
            className={cn(
              "relative bg-[#EDEFF2] py-2 cursor-pointer rounded-xl border-2 transition-all",
              selectedTemplate === template.id
                ? "border-primary"
                : "border-[#E5E7EB] hover:border-primary/50",
            )}
          >
            {/* Selection Indicator */}
            {selectedTemplate === template.id && (
              <div className="absolute top-0 left-0 z-10 bg-white rounded-full p-1.5 shadow-md">
                <div className="bg-primary rounded-full p-1">
                  <IconCheck className="size-4 text-white" />
                </div>
              </div>
            )}

            {/* Template Preview Placeholder */}
            <Image
              src={"/images/pngs/template-img.png"}
              alt="template-1"
              width={1000}
              height={300}
            />

            {/* Template Info */}
            <div className="px-6 py-4 border-t bg-white rounded-b-xl">
              <h3 className="font-bold text-foreground">{template.name}</h3>
              <p className="text-sm text-[#9AA4B2]">{template.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChooseTemplate;
