"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import HeroSection from "./hero-section";
import AboutBusiness from "./about-business";
import YourService from "./your-service";
import Product from "./product";
import HowItWorks from "./how-it-works";

const Content = () => {
  const [activeTab, setActiveTab] = useState("hero");


  const tabs = [
    { id: "hero", label: "Hero Section" },
    { id: "about", label: "About Business" },
    { id: "services", label: "Your Services" },
    { id: "products", label: "Products" },
    { id: "how-it-works", label: "How It Works" },
    { id: "features", label: "Features" },
    { id: "testimonials", label: "Customer Testimonials" },
    { id: "faq", label: "FAQ Section" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Website Content
        </h2>
        <p className="text-sm text-[#9AA4B2]">
          Add the key information about your business and services.
        </p>
      </div>

      {/* Tabs Navigation */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full justify-start overflow-x-auto bg-[#FEEDE9] h-auto p-0 border-b border-[#E5E7EB] rounded-none">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.id}
              value={tab.id}
              className={cn(
                "px-4 py-3 rounded-none border-x-0 border-t-0 border-b-2 border-transparent bg-transparent data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none text-[#9AA4B2] font-medium",
                "hover:text-foreground transition-colors",
              )}
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Hero Section Content */}
        <TabsContent value="hero" className="mt-6 space-y-6">
          <HeroSection />
        </TabsContent>

        {/* About Business Content */}
        <TabsContent value="about" className="mt-6 space-y-6">
          <AboutBusiness />
        </TabsContent>

        {/* Your Services Content */}
        <TabsContent value="services" className="mt-6 space-y-6">
          <YourService />
        </TabsContent>

        {/* Products Content */}
        <TabsContent value="products" className="mt-6 space-y-6">
          <Product />
        </TabsContent>

        {/* How It Works Content */}
        <TabsContent value="how-it-works" className="mt-6 space-y-6">
          <HowItWorks />
        </TabsContent>

        {/* Placeholder for other tabs */}
        {tabs
          .filter((tab) => tab.id !== "hero" && tab.id !== "about" && tab.id !== "services" && tab.id !== "products" && tab.id !== "how-it-works")
          .map((tab) => (
            <TabsContent key={tab.id} value={tab.id} className="mt-6">
              <div className="text-center py-12 text-[#9AA4B2]">
                {tab.label} content coming soon...
              </div>
            </TabsContent>
          ))}
      </Tabs>
    </div>
  );
};

export default Content;
