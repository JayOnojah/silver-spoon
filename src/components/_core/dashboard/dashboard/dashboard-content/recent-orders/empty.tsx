import { IconGift } from "@tabler/icons-react";

const Empty = () => {
  return (
    <div className="bg-white rounded-xl p-6 border border-[#E5E7EB]">
      <div className="flex flex-col items-center justify-center py-12">
        <div className="bg-[#FFF1EC] rounded-full p-6 mb-4">
          <IconGift className="size-12 text-primary" strokeWidth={1.5} />
        </div>
        <h3 className="text-lg font-bold text-foreground mb-2">
          Your orders will appear here
        </h3>
        <p className="text-sm text-[#9AA4B2] text-center">
          Start by adding customers and creating orders
        </p>
      </div>
    </div>
  );
};

export default Empty;
