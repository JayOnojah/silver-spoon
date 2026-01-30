import { Button } from "@/src/components/ui/button";
import { IconGift, IconPlus } from "@tabler/icons-react";
import React from "react";

const Empty = () => {
  const pipelineStages = [
    { id: "new", label: "New Orders", count: 0 },
    { id: "progress", label: "In Progress", count: 0 },
    { id: "fitting", label: "Fitting", count: 0 },
    { id: "ready", label: "Ready", count: 0 },
  ];
  return (
    <div>
      <h3 className="text-lg font-bold text-foreground mb-2">Production Pipeline</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {pipelineStages.map((stage) => (
          <div
            key={stage.id}
            className="bg-[#F9FAFB] flex flex-col items-center rounded-xl p-4 border border-[#E5E7EB]"
          >
            <p className="text-sm font-bold text-[#9AA4B2] mb-2">
              {stage.label}
            </p>
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#9AA4B2]">
              <span className="text-lg font-bold text-white">
                {stage.count}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-col items-center justify-center py-12">
        <div className="bg-[#FFF1EC] rounded-full p-6 mb-4">
          <IconGift className="size-12 text-primary" strokeWidth={1.5} />
        </div>
        <p className="text-sm text-[#9AA4B2] text-center mb-6">
          No orders yet. Create your first order to see it here!
        </p>
        <Button className="bg-primary hover:bg-primary/90 rounded-xl h-12 px-6">
          <IconPlus className="size-5 mr-2" />
          New Order
        </Button>
      </div>
    </div>
  );
};

export default Empty;
