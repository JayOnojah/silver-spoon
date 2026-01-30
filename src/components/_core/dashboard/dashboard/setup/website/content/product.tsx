"use client";

import { useState } from "react";
import { IconEye } from "@tabler/icons-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface Product {
  id: string;
  title: string;
  category: string;
  price: string;
  image: string;
}

const Product = () => {
  const [showProducts, setShowProducts] = useState(false);
  const [sectionHeadline, setSectionHeadline] = useState("");

  // Dummy product data for preview
  const products: Product[] = Array.from({ length: 8 }, (_, i) => ({
    id: (i + 1).toString(),
    title: "Premium Silk Fabric",
    category: "Ready-to-Wear",
    price: "₦40,000",
    image: "/images/products/product-placeholder.jpg", // Placeholder image path
  }));

  return (
    <div className="space-y-6">
      {/* Products Header with Toggle */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-foreground">Products</h3>
          <p className="text-sm text-[#9AA4B2] mt-1">
            Manage products directly from the inventory page.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Label
            htmlFor="show-products"
            className="text-sm text-[#4B5565] cursor-pointer"
          >
            Show on website
          </Label>
          <Switch
            id="show-products"
            checked={showProducts}
            onCheckedChange={setShowProducts}
          />
        </div>
      </div>

      {/* Section Headline */}
      <div className="space-y-2">
        <Label className="text-[#4B5565] text-sm">
          Section Headline <span className="text-destructive">*</span>
        </Label>
        <Input
          value={sectionHeadline}
          onChange={(e) => setSectionHeadline(e.target.value)}
          placeholder="e.g., Our New Arrivals"
          className="h-11 rounded-xl"
        />
      </div>

      {/* Image Preview Section */}
      <div className="space-y-4 border border-[#E5E7EB] rounded-xl p-4">
        <div className="flex items-center gap-2">
          <IconEye className="size-5 text-[#4B5565]" />
          <Label className="text-[#4B5565] text-sm font-medium">
            Image Preview
          </Label>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {products.map((product) => (
            <div
              key={product.id}
              className=" rounded overflow-hidden bg-white"
            >
              {/* Product Image */}
              <div className="aspect-square bg-[#F9FAFB] relative">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback to placeholder if image doesn't exist
                    e.currentTarget.style.display = "none";
                  }}
                />
                {/* Placeholder if image doesn't load */}
                <div className="absolute inset-0 flex items-center justify-center bg-[#F9FAFB]">
                  <div className="text-center text-[#9AA4B2] text-xs">
                    Product Image
                  </div>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-3 space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-sm text-foreground">
                    {product.title}
                  </h4>
                  <div className="w-2 h-2 rounded-full bg-destructive shrink-0" />
                </div>
                <p className="text-xs text-[#9AA4B2]">{product.category}</p>
                <p className="text-sm font-semibold text-foreground">
                  {product.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Product;
