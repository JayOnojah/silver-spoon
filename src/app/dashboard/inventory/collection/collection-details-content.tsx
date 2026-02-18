"use client";
import AddProduct from "@/src/components/_core/dashboard/inventory/add-product";
import AllItem from "@/src/components/_core/dashboard/inventory/all-item";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const CollectionDetailsContent = () => {
  const router = useRouter();
  return (
    <div>
      <button
        onClick={() => router.back()}
        className="flex mb-4 cursor-pointer"
      >
        <ArrowLeft />
        Back
      </button>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold text-[#121926]">Collection Name</h1>
        <AddProduct />
      </div>

      <AllItem />
    </div>
  );
};

export default CollectionDetailsContent;
