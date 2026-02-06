import { cn } from "@/src/lib/utils";

interface CustomRadioCheckProps {
  checked?: boolean;
}

const CustomRadioCheck = ({ checked = false }: CustomRadioCheckProps) => {
  return (
    <span
      className={cn(
        "w-4 h-4 border-[1.5px] rounded-full flex items-center justify-center shrink-0",
        checked ? "border-primary" : "border-[#9AA4B2]",
      )}
    >
      <div
        className={cn(
          "w-2 h-2 border-[1.5px] rounded-full",
          checked ? "border-primary" : "border-transparent",
        )}
      />
    </span>
  );
};

export default CustomRadioCheck;
