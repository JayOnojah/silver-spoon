"use client";

import { useState } from "react";
import { IconPlus, IconTrash } from "@tabler/icons-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface Service {
  id: string;
  title: string;
  description: string;
}

const YourService = () => {
  const [showServices, setShowServices] = useState(true);
  const [services, setServices] = useState<Service[]>([
    {
      id: "1",
      title: "Custom Bridal Wear",
      description: "",
    },
    {
      id: "2",
      title: "Traditional Attire",
      description: "",
    },
    {
      id: "3",
      title: "Corporate Fashion",
      description: "",
    },
    {
      id: "4",
      title: "Alterations & Repairs",
      description: "",
    },
  ]);

  const handleAddService = () => {
    const newService: Service = {
      id: Date.now().toString(),
      title: "",
      description: "",
    };
    setServices([...services, newService]);
  };

  const handleDeleteService = (id: string) => {
    setServices(services.filter((service) => service.id !== id));
  };

  const handleServiceChange = (
    id: string,
    field: keyof Service,
    value: string,
  ) => {
    setServices(
      services.map((service) =>
        service.id === id ? { ...service, [field]: value } : service,
      ),
    );
  };

  return (
    <div className="space-y-6">
      {/* Your Services Header with Toggle */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-foreground">Your Services</h3>
        <div className="flex items-center gap-3">
          <Label
            htmlFor="show-services"
            className="text-sm text-[#4B5565] cursor-pointer"
          >
            Show on website
          </Label>
          <Switch
            id="show-services"
            checked={showServices}
            onCheckedChange={setShowServices}
          />
        </div>
      </div>

      {/* Services List */}
      <div className="space-y-4">
        {services.map((service, index) => (
          <div
            key={service.id}
            className="border border-[#E5E7EB] rounded-xl p-4 space-y-4"
          >
            {/* Service Header with Delete Button */}
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 space-y-2">
                <Label className="text-[#4B5565] text-sm">
                  Service {index + 1} Title
                </Label>
                <Input
                  value={service.title}
                  onChange={(e) =>
                    handleServiceChange(service.id, "title", e.target.value)
                  }
                  placeholder="Enter service title"
                  className="h-11 rounded-xl"
                />
              </div>
              {services.length > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDeleteService(service.id)}
                  className="mt-8 h-9 w-9 text-destructive hover:text-destructive/80 hover:bg-destructive/10 shrink-0"
                >
                  <IconTrash className="size-4" />
                </Button>
              )}
            </div>

            {/* Service Description */}
            <div className="space-y-2">
              <Label className="text-[#4B5565] text-sm">Description</Label>
              <Textarea
                value={service.description}
                onChange={(e) =>
                  handleServiceChange(service.id, "description", e.target.value)
                }
                placeholder="Describe this service"
                className="min-h-24 rounded-xl resize-none"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Add Service Button */}
      <Button
        type="button"
        variant="ghost"
        onClick={handleAddService}
        className="text-primary hover:text-primary/80 hover:bg-primary/10 h-11 px-4 rounded-xl"
      >
        <IconPlus className="size-5 mr-2" />
        Add Service
      </Button>
    </div>
  );
};

export default YourService;
