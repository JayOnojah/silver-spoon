import { Button } from "@/src/components/ui/button";
import { ShoppingBag, Plus } from "lucide-react";
import AddProduct from "./add-product";

interface EmptyStateProps {
  onAddProduct?: () => void;
}

export function EmptyState({ onAddProduct }: EmptyStateProps) {
  return (
    <div className="bg-white rounded-xl border border-[#E5E7EB] p-12 flex flex-col items-center justify-center text-center">
      <div className="size-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
        <ShoppingBag className="size-8 text-primary" />
      </div>
      <h3 className="text-lg font-bold text-[#121926] mb-2">No products yet</h3>
      <p className="text-sm text-[#6B7280] mb-6 max-w-sm">
        Add your first product to start managing your inventory and selling on
        your storefront.
      </p>
      <AddProduct />
    </div>
  );
}
