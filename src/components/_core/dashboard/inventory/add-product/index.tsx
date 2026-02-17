"use client";

import { Button } from "@/src/components/ui/button";
import { Plus } from "lucide-react";
import React from "react";
import SelectCollection from "./select-collection";
import ProductDetails from "./product-details";

const AddProduct = () => {
  const [isOpenCollection, setIsOpenCollection] = React.useState(false);
  const [isOpenProductDetails, setIsOpenProductDetails] = React.useState(false);
  const [selectedCollectionId, setSelectedCollectionId] = React.useState<string | null>(null);

  const handleProceedFromCollection = (collectionId: string) => {
    setSelectedCollectionId(collectionId);
    setIsOpenCollection(false);
    setIsOpenProductDetails(true);
  };

  const handleBackFromDetails = () => {
    setIsOpenProductDetails(false);
    setIsOpenCollection(true);
  };

  const handleCreateProduct = (/* data: ProductDetailsFormData */) => {
    // TODO: submit product with selectedCollectionId
    setIsOpenProductDetails(false);
    setSelectedCollectionId(null);
  };

  return (
    <>
      <Button
        type="button"
        onClick={() => setIsOpenCollection(true)}
        className="bg-primary text-white hover:bg-primary/90 rounded-xl h-10 px-4 gap-2"
      >
        <Plus className="size-4" />
        New Product
      </Button>
      <SelectCollection
        open={isOpenCollection}
        onOpenChange={setIsOpenCollection}
        onProceed={handleProceedFromCollection}
      />
      <ProductDetails
        open={isOpenProductDetails}
        onOpenChange={setIsOpenProductDetails}
        collectionId={selectedCollectionId ?? undefined}
        onBack={handleBackFromDetails}
        onCreate={handleCreateProduct}
      />
    </>
  );
};

export default AddProduct
