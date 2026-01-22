"use client";
import React from "react";
import CreateCatalogueDialog from "./create-catalogue-dialog";
import CatalogueSuccessDialog from "./success";
import AddDesignDialog from "./add-design-dialog";

interface CatalogSetupProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onComplete?: (data: { catalogueName: string; description: string }) => void;
}

const CatalogSetup = ({
  open,
  onOpenChange,
  onComplete,
}: CatalogSetupProps) => {
  const [isSuccessOpen, setIsSuccessOpen] = React.useState(false);
  const [isAddDesignOpen, setIsAddDesignOpen] = React.useState(false);
  const [catalogueData, setCatalogueData] = React.useState<{
    catalogueName: string;
    description: string;
  } | null>(null);

  const handleSubmit = (data: {
    catalogueName: string;
    description: string;
  }) => {
    console.log(data);
    setCatalogueData(data);
    setIsSuccessOpen(true);
    onComplete?.(data);
    onOpenChange?.(false);
  };

  const handleDialogChange = (newOpen: boolean) => {
    onOpenChange?.(newOpen);
  };

  const handleAddDesigns = () => {
    setIsSuccessOpen(false);
    setIsAddDesignOpen(true);
  };

  const handleCreateAnother = () => {
    // Reset and open create dialog again
    setIsSuccessOpen(false);
    onOpenChange?.(true);
  };

  return (
    <div>
      <CreateCatalogueDialog
        open={open ?? false}
        onOpenChange={handleDialogChange}
        onSubmit={handleSubmit}
      />
      <CatalogueSuccessDialog
        open={isSuccessOpen}
        onOpenChange={setIsSuccessOpen}
        onAddDesigns={handleAddDesigns}
        onCreateAnother={handleCreateAnother}
      />
      <AddDesignDialog
        open={isAddDesignOpen}
        onOpenChange={setIsAddDesignOpen}
        catalogueName={catalogueData?.catalogueName}
        catalogueDescription={catalogueData?.description}
      />
    </div>
  );
};

export default CatalogSetup;
