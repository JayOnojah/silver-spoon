import { Button } from "@/src/components/ui/button";
import { Textarea } from "@/src/components/ui/textarea";
import { IconEdit, IconEyeOff } from "@tabler/icons-react";
import { EditSvg } from "../../svg";

const CustomersMeasurement = () => {
  const measurements = [
    { name: "Bust", value: "36" },
    { name: "Waist", value: "28" },
    { name: "Hips", value: "38" },
    { name: "Shoulder", value: "14" },
    { name: "Arm Length", value: "24" },
    { name: "Height", value: "5'6\"" },
  ];
  return (
    <div className="mt-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-foreground">Measurements</h3>
        <Button variant="ghost" className=" text-primary h-10 px-4">
          <EditSvg />
          Edit Measurements
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {measurements.map((measurement, index) => (
          <div key={index} className="bg-[#F9F0EE] rounded-lg p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-[#6B7280] mb-1">
                  {measurement.name}
                </p>
                <p className="text-sm font-semibold text-foreground">
                  <span className="font-bold">{measurement.value}</span>{" "}
                  <span>Inches</span>
                </p>
              </div>
              <button className="text-[#9AA4B2] hover:text-foreground transition-colors flex items-center gap-1">
                <IconEyeOff className="size-4" />
                <span className="text-xs">Hide</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-[#F9F0EE] border border-[#F74F25] p-5 rounded-xl">
        <div className="text-xs text-[#9AA4B2]">Measurement Notes</div>
        <div className="font-bold text-sm text-[#121926]">
          Customer prefers slightly loose fit around waist area
        </div>
      </div>
    </div>
  );
};

export default CustomersMeasurement;
