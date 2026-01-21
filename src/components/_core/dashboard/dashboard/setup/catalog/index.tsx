"use client";
import React from "react";
import CreateCatalogueDialog from "./create-catalogue-dialog";

interface CatalogSetupProps {
  onComplete?: (data: { catalogueName: string; description: string }) => void;
}

const CatalogSetup = ({ onComplete }: CatalogSetupProps) => {
  const [status, setStatus] = React.useState<"create">("create");
  const [isDialogOpen, setIsDialogOpen] = React.useState(true);

  const handleSubmit = (data: { catalogueName: string; description: string }) => {
    // Handle catalogue creation
    console.log("Catalogue data:", data);
    // Call parent's onComplete handler
    onComplete?.(data);
  };

  return (
    <div>
      {status === "create" && (
        <CreateCatalogueDialog
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
};

export default CatalogSetup;
