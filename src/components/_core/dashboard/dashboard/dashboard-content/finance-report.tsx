import { IconCurrencyDollar } from "@tabler/icons-react";

interface FinanceReportProps {
  isFilled?: boolean;
}

const FinanceReport = ({ isFilled }: FinanceReportProps) => {
  if (!isFilled) {
    return (
      <div className="bg-white rounded-xl p-6 border border-[#E5E7EB]">
        <div className="flex flex-col items-center justify-center py-8">
          <div className="bg-[#FFF1EC] rounded-lg p-4 mb-4">
            <IconCurrencyDollar className="size-8 text-primary" />
          </div>
          <h3 className="text-base font-bold text-foreground mb-2">
            No Finance Report Yet
          </h3>
          <p className="text-sm text-[#9AA4B2] text-center">
            Financial snapshots will be displayed here
          </p>
        </div>
      </div>
    );
  }

  const rows = [
    {
      label: "Revenue This Month",
      value: "₦450,000",
      valueClassName: "text-[#16A34A]",
      progress: 72,
      indicatorColor: "#16A34A",
      trackColor: "#EAF7EE",
    },
    {
      label: "Unpaid Balances",
      value: "₦450,000",
      valueClassName: "text-[#EF4444]",
      progress: 42,
      indicatorColor: "#EF4444",
      trackColor: "#FDECEC",
    },
    {
      label: "Completed Orders",
      value: "48 orders",
      valueClassName: "text-[#2563EB]",
      progress: 35,
      indicatorColor: "#2563EB",
      trackColor: "#EAF1FF",
    },
  ] as const;

  return (
    <div className="bg-white rounded-xl p-6 border border-[#E5E7EB]">
      <h3 className="text-base font-bold text-foreground mb-4">
        Financial Snapshot
      </h3>

      <div className="space-y-5">
        {rows.map((row) => (
          <div key={row.label}>
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-[#9AA4B2]">{row.label}</p>
              <p className={`text-sm font-semibold ${row.valueClassName}`}>
                {row.value}
              </p>
            </div>

            <div
              className="h-2 w-full overflow-hidden rounded-full"
              style={{ backgroundColor: row.trackColor }}
            >
              <div
                className="h-full rounded-full"
                style={{
                  width: `${row.progress}%`,
                  backgroundColor: row.indicatorColor,
                }}
              />
            </div>
          </div>
        ))}

        <div className="flex items-center justify-between pt-1">
          <p className="text-sm text-[#9AA4B2]">Business health</p>
          <span className="inline-flex items-center rounded-full bg-[#E8F7EE] px-3 py-1 text-xs font-semibold text-[#16A34A]">
            Excellent
          </span>
        </div>
      </div>
    </div>
  );
};

export default FinanceReport;
