"use client";
import React from "react";
import CreateCatalogueDialog from "./create-catalogue-dialog";

const CatalogSetup = () => {
  const [status, setStatus] = React.useState<"create">("create");
  const [isDialogOpen, setIsDialogOpen] = React.useState(true);

  const handleSubmit = (data: { catalogueName: string; description: string }) => {
    // Handle catalogue creation
    console.log("Catalogue data:", data);
    // You can add logic here to save the catalogue
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
