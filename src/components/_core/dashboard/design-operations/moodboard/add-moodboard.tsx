"use client";

import { useMemo, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/src/components/ui/button";
import { Plus, UploadCloud } from "lucide-react";

import { CreateNewMoodboard } from "./create-new-moodboard";
import { MoodboardSuccessModal } from "./moodboard-success";
import { PreviewMoodboardStep } from "./preview-moodboard";
import { AddMoodboardDetailsStep } from "./add-details";

interface AddMoodboardModalProps {
  btnName: string;
  btnStyle?: string;
}

type Step = 1 | 2 | 3 | 4 | 5;
type SourceOption = "existing" | "create" | null;

export type AssociatedWith = "order" | "customer" | "personal";
export type LayoutStyle = "grid3" | "grid4" | "masonry";

export const AddMoodboard = ({ btnName, btnStyle }: AddMoodboardModalProps) => {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>(1);

  // Step 1
  const [selectedSource, setSelectedSource] = useState<SourceOption>(null);

  // Shared form state (used by CreateNew + AddDetails)
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [associatedWith, setAssociatedWith] = useState<AssociatedWith>("order");
  const [orderValue, setOrderValue] = useState<string>("");

  // CreateNew-only state
  const [primaryHex, setPrimaryHex] = useState("#FFFFFF");
  const [secondaryHex, setSecondaryHex] = useState("#F9F0EE");
  const [layoutStyle, setLayoutStyle] = useState<LayoutStyle>("grid3");

  // Dummy preview images (same pattern as details page)
  const previewImages = Array(6)
    .fill(null)
    .map((_, i) => ({
      id: `preview-${i + 1}`,
      imageUrl: "/images/pngs/catalogue-detail-img.png",
    }));

  const canCreate = useMemo(() => {
    const baseOk = title.trim().length > 0 && description.trim().length > 0;
    const assocOk = associatedWith !== "order" || orderValue.trim().length > 0;
    return baseOk && assocOk;
  }, [title, description, associatedWith, orderValue]);

  const resetSharedForm = () => {
    setTitle("");
    setDescription("");
    setAssociatedWith("order");
    setOrderValue("");
  };

  const resetCreateOnly = () => {
    setPrimaryHex("#FFFFFF");
    setSecondaryHex("#F9F0EE");
    setLayoutStyle("grid3");
  };

  const resetAll = () => {
    setStep(1);
    setSelectedSource(null);
    resetSharedForm();
    resetCreateOnly();
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(val) => {
        setOpen(val);
        if (!val) resetAll();
      }}
    >
      <DialogTrigger asChild>
        <Button
          className={`bg-[#F74F25] text-white rounded-2xl h-12 font-bold font-sans gap-2 ${btnStyle ?? ""}`}
        >
          <Plus className="h-5 w-5" />
          {btnName}
        </Button>
      </DialogTrigger>

      <DialogContent 
      showCloseButton={step !== 4}
      className="w-[92vw] max-w-180 p-0 gap-0 rounded-4xl border font-sans">
        <div className="relative max-h-[85vh] overflow-y-auto">

          {/* ===================== STEP 1 ===================== */}
          {step === 1 && (
            <div className="md:px-10 px-4 md:pt-8 pt-6 md:pb-8 pb-6">
              <DialogHeader className="text-start space-y-2">
                <DialogTitle className="text-2xl font-black text-[#121926]">
                  Add Moodboard
                </DialogTitle>

                <p className="text-sm font-semibold text-[#475467]">
                  Choose Source<span className="text-[#F74F25]">*</span>
                </p>
              </DialogHeader>

              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedSource("existing");
                    setStep(3); // ✅ go to preview step
                  }}
                  className={[
                    "w-full rounded-2xl border bg-white px-3 py-3 transition",
                    "hover:border-[#B9C0CA]",
                    selectedSource === "existing"
                      ? "border-[#F74F25] ring-2 ring-[#F74F25]/20"
                      : "border-[#D0D5DD]",
                  ].join(" ")}
                >
                  <div className="flex flex-col items-center text-center">
                    <UploadCloud className="h-7 w-7 text-[#F74F25]" />
                    <p className="mt-3 text-[15px] font-extrabold text-[#121926]">
                      From Existing Designs
                    </p>
                    <p className="mt-2 text-sm text-[#667085] max-w-65">
                      Upload your own pre-designed moodboard image
                    </p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setSelectedSource("create");
                    setStep(2); // ✅ create new flow
                  }}
                  className={[
                    "w-full rounded-2xl border bg-white px-3 py-3 transition",
                    "hover:border-[#B9C0CA]",
                    selectedSource === "create"
                      ? "border-[#F74F25] ring-2 ring-[#F74F25]/20"
                      : "border-[#D0D5DD]",
                  ].join(" ")}
                >
                  <div className="flex flex-col items-center text-center">
                    <Plus className="h-7 w-7 text-[#F74F25]" />
                    <p className="mt-3 text-[15px] font-extrabold text-[#121926]">
                      Create New
                    </p>
                    <p className="mt-2 text-sm text-[#667085] max-w-65">
                      Upload your own pre-designed moodboard image
                    </p>
                  </div>
                </button>
              </div>
            </div>
          )}

          {/* ===================== STEP 2 (Create New) ===================== */}
          {step === 2 && (
            <CreateNewMoodboard
              title={title}
              setTitle={setTitle}
              description={description}
              setDescription={setDescription}
              associatedWith={associatedWith}
              setAssociatedWith={setAssociatedWith}
              orderValue={orderValue}
              setOrderValue={setOrderValue}
              primaryHex={primaryHex}
              setPrimaryHex={setPrimaryHex}
              secondaryHex={secondaryHex}
              setSecondaryHex={setSecondaryHex}
              layoutStyle={layoutStyle}
              setLayoutStyle={setLayoutStyle}
              canCreate={canCreate}
              onBack={() => setStep(1)}
              onCreate={() => {
                // later: API call
                console.log({
                  title,
                  description,
                  associatedWith,
                  orderValue,
                  primaryHex,
                  secondaryHex,
                  layoutStyle,
                });

                setStep(5); // success
              }}
            />
          )}

          {/* ===================== STEP 3 (Preview Existing) ===================== */}
          {step === 3 && (
            <PreviewMoodboardStep
              designs={previewImages}
              onBack={() => setStep(1)} // previous step 
              onChange={() => {
                // later: change selected images / upload flow
                console.log("change preview images");
              }}
              onProceed={() => setStep(4)} //proceed to add details step
            />

          )}

          {/* ===================== STEP 4 (Add Details) ===================== */}
          {step === 4 && (
            <AddMoodboardDetailsStep
              title={title}
              setTitle={setTitle}
              description={description}
              setDescription={setDescription}
              associatedWith={associatedWith}
              setAssociatedWith={setAssociatedWith}
              orderValue={orderValue}
              setOrderValue={setOrderValue}
              canCreate={canCreate}
              onBack={() => setStep(3)}
              onCreate={() => {
                // later: API call
                console.log({
                  title,
                  description,
                  associatedWith,
                  orderValue,
                  source: "existing",
                });

                setStep(5);
              }}
            />
          )}

          {/* ===================== STEP 5 (SUCCESS) ===================== */}
          {step === 5 && (
            <MoodboardSuccessModal
              onClose={() => setOpen(false)}
              onAddDesigns={() => {
                // later: route to add designs flow
                setOpen(false);
              }}
              onCreateAnother={() => {
                resetAll();
                setSelectedSource("create");
                setStep(2);
              }}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
