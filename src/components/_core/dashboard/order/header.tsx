import { Button } from "@/src/components/ui/button";
import { IconPlus } from "@tabler/icons-react";

const Header = () => {
  return (
    <div>
      <div className="flex gap-4 flex-col sm:flex-row items-start justify-between mb-5">
        <div>
          <h1 className="text-3xl font-extrabold text-foreground mb-2">
            Order
          </h1>
        </div>
        {/* Desktop Button */}
        <Button className="hidden sm:flex sm:w-fit bg-primary hover:bg-primary/90 rounded-xl h-10 px-4">
          <IconPlus className="size-4" />
          New Order
        </Button>
      </div>
      {/* Mobile FAB */}
      <Button
        className="sm:hidden fixed bottom-6 right-6 z-50 size-14 rounded-full bg-primary hover:bg-primary/90 shadow-lg"
        size="icon"
      >
        <IconPlus className="size-6 text-white" />
        <span className="sr-only">New Order</span>
      </Button>
    </div>
  );
};

export default Header;
