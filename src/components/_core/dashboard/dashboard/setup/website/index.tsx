"use client";

import { useState } from "react";
import { IconX, IconEye } from "@tabler/icons-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import ChooseTemplate from "./choose-template";
import Branding from "./branding";
import Content from "./content";
import Gallery from "./gallery";
import ContactInfo from "./contact-info";
import DomainSettings from "./domin-settings";
import SideNav from "./side-nav";

interface WebsiteSetupProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave?: () => void;
  onPreview?: () => void;
}

const WebsiteSetup = ({
  open,
  onOpenChange,
  onSave,
  onPreview,
}: WebsiteSetupProps) => {
  const [activeNav, setActiveNav] = useState<string>("template");

  const renderContent = () => {
    switch (activeNav) {
      case "template":
        return <ChooseTemplate />;
      case "branding":
        return <Branding />;
      case "content":
        return <Content />;
      case "gallery":
        return <Gallery />;
      case "contact":
        return <ContactInfo />;
      case "domain":
        return <DomainSettings />;
      default:
        return <ChooseTemplate />;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="fixed bg-[#FFF1EC] inset-0 max-w-none! w-full! h-full! translate-x-0! translate-y-0! rounded-none! p-0 pr-6 gap-0 overflow-hidden"
      >
        <div className="flex flex-col h-screen w-full">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 shrink-0">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onOpenChange(false)}
                className="h-9 w-9"
              >
                <IconX className="size-5" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-foreground">
                  Website Builder
                </h1>
                <p className="text-sm text-[#9AA4B2]">
                  Create your professional online presence
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                onClick={onPreview}
                className="h-10 px-4 rounded-xl border-primary/30 text-primary hover:bg-primary/10"
              >
                <IconEye className="size-4 mr-2" />
                Preview
              </Button>
              <Button
                onClick={onSave}
                className="h-10 px-6 rounded-xl bg-primary hover:bg-primary/90"
              >
                Save Changes
              </Button>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex flex-1 min-h-0 overflow-hidden">
            {/* Sidebar */}
            <SideNav activeNav={activeNav} setActiveNav={setActiveNav} />

            {/* Main Content Area */}
            <div className="flex-1 bg-white rounded-xl overflow-y-auto overflow-x-hidden p-8 h-[calc(100dvh-80px)]">
              {renderContent()}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WebsiteSetup;
