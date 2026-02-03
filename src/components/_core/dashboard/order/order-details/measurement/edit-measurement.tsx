"use client";

import { useState } from "react";
import { IconPlus, IconTrash } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Measurement {
  id: string;
  type: string;
  value: string;
  unit: string;
}

interface EditMeasurementProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const EditMeasurement = ({ open, onOpenChange }: EditMeasurementProps) => {
  const [measurements, setMeasurements] = useState<Measurement[]>([
    { id: "1", type: "", value: "", unit: "Inches" },
    { id: "2", type: "", value: "", unit: "Inches" },
  ]);
  const [notes, setNotes] = useState("");

  const handleAddMeasurement = () => {
    const newId = String(measurements.length + 1);
    setMeasurements([
      ...measurements,
      { id: newId, type: "", value: "", unit: "Inches" },
    ]);
  };

  const handleRemoveMeasurement = (id: string) => {
    if (measurements.length > 1) {
      setMeasurements(measurements.filter((m) => m.id !== id));
    }
  };

  const handleMeasurementChange = (
    id: string,
    field: keyof Measurement,
    value: string,
  ) => {
    setMeasurements(
      measurements.map((m) => (m.id === id ? { ...m, [field]: value } : m)),
    );
  };

  const handleSave = () => {
    // Handle save logic here
    console.log("Measurements:", measurements);
    console.log("Notes:", notes);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Customer Measurement</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Measurement Sections */}
          {measurements.map((measurement, index) => (
            <div
              key={measurement.id}
              className="space-y-2 border rounded-xl p-3"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-base font-semibold text-[#9AA4B2]">
                  Measurement {index + 1}
                </h3>
                {measurements.length > 1 && (
                  <button
                    onClick={() => handleRemoveMeasurement(measurement.id)}
                    className="text-[#9AA4B2] hover:text-[#EF4444] transition-colors"
                    type="button"
                  >
                    <IconTrash className="size-5" />
                  </button>
                )}
              </div>

              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-sm font-semibold text-[#4B5565] block">
                    Measurement Type <span className="text-[#EF4444]">*</span>
                  </label>
                  <Input
                    placeholder="e.g., Sleeve_lenght"
                    value={measurement.type}
                    onChange={(e) =>
                      handleMeasurementChange(
                        measurement.id,
                        "type",
                        e.target.value,
                      )
                    }
                    className="h-10"
                  />
                </div>

                <div className="flex gap-2">
                  <div className="space-y-1 flex-1">
                    <label className="text-sm font-semibold text-[#4B5565] block">
                      Value <span className="text-[#EF4444]">*</span>
                    </label>
                    <Input
                      placeholder="Enter Value"
                      value={measurement.value}
                      onChange={(e) =>
                        handleMeasurementChange(
                          measurement.id,
                          "value",
                          e.target.value,
                        )
                      }
                      className="h-10"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-sm font-semibold text-[#4B5565] block">
                      Unit
                    </label>
                    <Select
                      value={measurement.unit}
                      onValueChange={(value) =>
                        handleMeasurementChange(measurement.id, "unit", value)
                      }
                    >
                      <SelectTrigger className="h-10 p-5">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Inches">Inches</SelectItem>
                        <SelectItem value="Centimeters">Centimeters</SelectItem>
                        <SelectItem value="Feet">Feet</SelectItem>
                        <SelectItem value="Meters">Meters</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Add Another Measurement */}
          <button
            onClick={handleAddMeasurement}
            className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors text-sm font-medium"
            type="button"
          >
            <IconPlus className="size-4" />
            <span>Another Measurement</span>
          </button>

          {/* Notes Section */}
          <div className="space-y-2">
            <label className="text-sm font-semibold mb-1 block text-[#4B5565]">
              Notes <span className="text-[#9AA4B2] font-normal">(Optional)</span>
            </label>
            <Textarea
              placeholder="e.g., Customer prefers slightly loose fit around waist area"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="min-h-25"
            />
          </div>

          {/* Save Button */}
          <div className="flex w-full pt-4">
            <Button
              onClick={handleSave}
              className="w-full bg-primary hover:bg-primary/90 text-white rounded-xl h-10 px-6"
            >
              Save Changes
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditMeasurement;
