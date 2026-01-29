"use client";

import { useMemo, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/src/components/ui/button";
import { Plus, UploadCloud, X } from "lucide-react";
import { CreateNewMoodboard } from "./create-new-moodboard";

interface AddMoodboardModalProps {
  btnName: string;
}

type Step = 1 | 2;
type SourceOption = "existing" | "create" | null;
export type AssociatedWith = "order" | "customer" | "personal";
export type LayoutStyle = "grid3" | "grid4" | "masonry";

export const AddMoodboard = ({ btnName }: AddMoodboardModalProps) => {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>(1);

  // Step 1
  const [selectedSource, setSelectedSource] = useState<SourceOption>(null);

  // Step 2 (Create New) state kept here so it persists if user goes back
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [associatedWith, setAssociatedWith] = useState<AssociatedWith>("order");
  const [orderValue, setOrderValue] = useState<string>("");
  const [primaryHex, setPrimaryHex] = useState("#FFFFFF");
  const [secondaryHex, setSecondaryHex] = useState("#F9F0EE");
  const [layoutStyle, setLayoutStyle] = useState<LayoutStyle>("grid3");

  const canCreate = useMemo(() => {
    const baseOk = title.trim().length > 0 && description.trim().length > 0;
    const assocOk = associatedWith !== "order" || orderValue.trim().length > 0;
    return baseOk && assocOk;
  }, [title, description, associatedWith, orderValue]);

  const resetAll = () => {
    setStep(1);
    setSelectedSource(null);

    setTitle("");
    setDescription("");
    setAssociatedWith("order");
    setOrderValue("");
    setPrimaryHex("#FFFFFF");
    setSecondaryHex("#F9F0EE");
    setLayoutStyle("grid3");
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
        <Button className="bg-[#F74F25] text-white rounded-2xl h-12 font-bold font-sans gap-2">
          <Plus className="h-5 w-5" />
          {btnName}
        </Button>
      </DialogTrigger>

      <DialogContent className="w-[92vw] max-w-180 p-0 gap-0 rounded-4xl border font-sans">
        <div className="relative max-h-[85vh] overflow-y-auto">
          {/* Close X */}
          <DialogClose asChild>
            <button
              type="button"
              aria-label="Close"
              className="absolute right-4 top-4 md:right-6 md:top-6 inline-flex h-9 w-9 items-center justify-center rounded-full hover:bg-black/5"
            >
            </button>
          </DialogClose>

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
                    // later: set for "existing designs" flow
                  }}
                  className={[
                    "w-[full] rounded-2xl border bg-white px-3 py-3 transition",
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
                    setStep(2);
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

          {/* ===================== STEP 2 (moved out) ===================== */}
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
                // later: submit/create + go to next step
                console.log({
                  title,
                  description,
                  associatedWith,
                  orderValue,
                  primaryHex,
                  secondaryHex,
                  layoutStyle,
                });
              }}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};


