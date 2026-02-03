import { IconAlertCircle, IconCalendar } from "@tabler/icons-react";

const ImportantDates = () => {
  return (
    <div className="bg-white rounded-xl p-6">
      <h3 className="text-lg font-bold text-foreground mb-4">
        Important Dates
      </h3>

      <div className="space-y-3">
        <div className="bg-[#EFF6FF] border border-[#BFDBFE] rounded-lg p-4 space-y-1.5">
          <h6 className="font-semibold text-[#9AA4B2] text-xs">Order Date</h6>
          <p className="text-sm text-[#121926] font-bold">Dec 15, 2025</p>
        </div>

        <div className="bg-[#FAF5FF] border border-[#E9D5FF] rounded-lg p-4 space-y-1.5">
          <h6 className="font-semibold text-[#9AA4B2] text-xs">
            Fitting Appointment
          </h6>
          <p className="text-sm text-[#121926] font-bold">
            Dec 15, 2025 • 2:00 PM
          </p>
        </div>

        <div className="bg-[#FEE2E2] border border-[#FCA5A5] rounded-lg p-4 space-y-1.5">
          <h6 className="font-semibold text-[#9AA4B2] text-xs">Due Date</h6>
          <p className="text-sm text-[#121926] font-bold">
            Dec 15, 2025 • 2:00 PM
          </p>
          <div className="flex items-center gap-1 text-[#DC2626]">
            <IconAlertCircle className="size-4" />
            <span className="text-xs">6 days remaining</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImportantDates;
