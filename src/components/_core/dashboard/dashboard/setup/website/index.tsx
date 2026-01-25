"use client";

import { useState } from "react";
import {
  IconX,
  IconEye,
  IconCheck,
  IconFileText,
  IconSettings,
  IconTypography,
  IconPhoto,
  IconPhone,
  IconWorld,
} from "@tabler/icons-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import ChooseTemplate from "./choose-template";
import Branding from "./branding";
import Content from "./content";
import Gallery from "./gallery";
import ContactInfo from "./contact-info";
import DomainSettings from "./domin-settings";

interface WebsiteSetupProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave?: () => void;
  onPreview?: () => void;
}

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  {
    id: "template",
    label: "Choose Template",
    icon: <IconFileText className="size-5" />,
  },
  {
    id: "branding",
    label: "Branding",
    icon: <IconSettings className="size-5" />,
  },
  {
    id: "content",
    label: "Content",
    icon: <IconTypography className="size-5" />,
  },
  {
    id: "gallery",
    label: "Gallery",
    icon: <IconPhoto className="size-5" />,
  },
  {
    id: "contact",
    label: "Contact Info",
    icon: <IconPhone className="size-5" />,
  },
  {
    id: "domain",
    label: "Domain & Settings",
    icon: <IconWorld className="size-5" />,
  },
];

interface Template {
  id: string;
  name: string;
  description: string;
}

const templates: Template[] = [
  {
    id: "1",
    name: "Elegant Minimal",
    description: "Modern & Clean",
  },
  {
    id: "2",
    name: "Elegant Minimal",
    description: "Modern & Clean",
  },
];

const WebsiteSetup = ({
  open,
  onOpenChange,
  onSave,
  onPreview,
}: WebsiteSetupProps) => {
  const [selectedTemplate, setSelectedTemplate] = useState<string>("1");
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
            <div className="w-64 px-6 pb-6 flex flex-col shrink-0">
              <nav className="flex rounded-xl bg-white flex-col p-4 gap-1">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveNav(item.id)}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-colors",
                      activeNav === item.id
                        ? "bg-[#FEEDE9] text-primary font-bold"
                        : "text-foreground hover:bg-primary/10",
                    )}
                  >
                    {item.icon}
                    <span className="text-xs whitespace-nowrap">
                      {item.label}
                    </span>
                  </button>
                ))}
              </nav>
            </div>

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
