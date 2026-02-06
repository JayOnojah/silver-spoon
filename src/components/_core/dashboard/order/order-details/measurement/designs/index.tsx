"use client";

import { useState } from "react";
import Empty from "./empty";
import FilledDesign, { type ReferenceDesign } from "./filled";
import SelectDesignType, { type CatalogueDesign } from "./select-design-type";
import ExistingDesign from "./existing-design";
import { DUMMY_REFERENCE_DESIGNS } from "./dummy-data";

const PLACEHOLDER_IMAGE = "/images/pngs/catalogue-detail-img.png";

const Designs = () => {
  const [designs, setDesigns] = useState<ReferenceDesign[]>(DUMMY_REFERENCE_DESIGNS);
  const [addDesignOpen, setAddDesignOpen] = useState(false);
  const [existingDesignOpen, setExistingDesignOpen] = useState(false);
  const [selectedCatalogue, setSelectedCatalogue] =
    useState<CatalogueDesign | null>(null);

  const handleAddDesign = () => {
    setAddDesignOpen(true);
  };

  const handleProceed = (
    source: "existing" | "new",
    selectedCatalogue?: CatalogueDesign,
    newFiles?: File[],
  ) => {
    if (source === "existing" && selectedCatalogue) {
      setSelectedCatalogue(selectedCatalogue);
      setExistingDesignOpen(true);
    } else if (source === "new" && newFiles?.length) {
      setDesigns((prev) => [
        ...prev,
        ...newFiles.map((file) => ({
          id: crypto.randomUUID(),
          imageUrl: URL.createObjectURL(file),
          alt: file.name,
        })),
      ]);
    }
  };

  const handleAddSelected = (selectedIds: string[]) => {
    setDesigns((prev) => [
      ...prev,
      ...selectedIds.map((id) => ({
        id,
        imageUrl: PLACEHOLDER_IMAGE,
        alt: `Reference design`,
      })),
    ]);
    setExistingDesignOpen(false);
    setSelectedCatalogue(null);
  };

  const handleExistingDesignBack = () => {
    setExistingDesignOpen(false);
    setSelectedCatalogue(null);
    setAddDesignOpen(true);
  };

  const handleRemoveDesign = (id: string) => {
    setDesigns((prev) => {
      const item = prev.find((d) => d.id === id);
      if (item?.imageUrl.startsWith("blob:")) URL.revokeObjectURL(item.imageUrl);
      return prev.filter((d) => d.id !== id);
    });
  };

  const isEmpty = designs.length === 0;

  const catalogueInfo = selectedCatalogue
    ? {
        id: selectedCatalogue.id,
        title: selectedCatalogue.title,
        description: selectedCatalogue.description,
        designCount: selectedCatalogue.designCount,
        lastUpdated: selectedCatalogue.lastUpdated,
      }
    : null;

  return (
    <>
      <SelectDesignType
        open={addDesignOpen}
        onOpenChange={setAddDesignOpen}
        onProceed={handleProceed}
      />
      <ExistingDesign
        open={existingDesignOpen}
        onOpenChange={(open) => {
          setExistingDesignOpen(open);
          if (!open) setSelectedCatalogue(null);
        }}
        catalogue={catalogueInfo}
        onBack={handleExistingDesignBack}
        onAddSelected={handleAddSelected}
      />
      {isEmpty ? (
        <Empty onAddDesign={handleAddDesign} />
      ) : (
        <FilledDesign
          designs={designs}
          onAddDesign={handleAddDesign}
          onRemoveDesign={handleRemoveDesign}
        />
      )}
    </>
  );
};

export default Designs;
