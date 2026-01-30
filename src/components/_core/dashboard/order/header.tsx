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
        <Button className="sm:w-fit w-full bg-primary hover:bg-primary/90 rounded-xl h-10 px-4">
          <IconPlus className="size-4" />
          New Order
        </Button>
      </div>
    </div>
  );
};

export default Header;
