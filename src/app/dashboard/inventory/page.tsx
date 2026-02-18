"use client";

import React from "react";
import Header from "@/src/components/_core/dashboard/inventory/header";
import InventoryMetrics from "@/src/components/_core/dashboard/inventory/metric";
import { Button } from "@/src/components/ui/button";
import InventoryContent from "@/src/components/_core/dashboard/inventory";

const FILLED_METRICS = {
  totalItems: 30,
  totalBalance: 285_000,
  outOfStock: 2,
  draft: 1,
};

const Inventory = () => {
  const [isFilled, setIsFilled] = React.useState(false);

  const handleAddProduct = () => {
    // TODO: open New Product modal / navigate
  };

  return (
    <>
      <Header />
      <InventoryMetrics
        totalItems={isFilled ? FILLED_METRICS.totalItems : 0}
        totalBalance={isFilled ? FILLED_METRICS.totalBalance : 0}
        outOfStock={isFilled ? FILLED_METRICS.outOfStock : 0}
        draft={isFilled ? FILLED_METRICS.draft : 0}
      />
      <InventoryContent
        isFilled={isFilled}
        onAddProduct={handleAddProduct}
      />
      <Button
        onClick={() => setIsFilled(!isFilled)}
        className="fixed bottom-6 right-6 rounded shadow-lg hover:shadow-xl"
      >
        Show {isFilled ? "Empty" : "Filled"} State
      </Button>
    </>
  );
};

export default Inventory;
