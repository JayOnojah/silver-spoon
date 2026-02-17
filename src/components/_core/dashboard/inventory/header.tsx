import { Button } from "@/src/components/ui/button";
import { Eye } from "lucide-react";
import AddProduct from "./add-product";

const Header = () => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
      <h1 className="text-2xl font-bold text-[#121926]">Inventory</h1>
      <div className="flex items-center gap-3">
        <Button
          type="button"
          variant="outline"
          className="border-primary text-primary hover:bg-primary/10 hover:text-primary rounded-xl h-10 px-4 gap-2"
        >
          <Eye className="size-4" />
          View Storefront
        </Button>
        <AddProduct />
      </div>
    </div>
  );
};

export default Header;
