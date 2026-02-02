"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type ActiveBusiness = {
  id: string;
  name: string;
  handle: string;
  type: "tailor" | "cobbler" | "other";
  role: "owner" | "admin";
  logo?: string | null;
};

type BusinessContextType = {
  activeBusiness: ActiveBusiness | null;
  setActiveBusiness: (business: ActiveBusiness | null) => void;
  isLoading: boolean;
};

const BusinessContext = createContext<BusinessContextType | undefined>(
  undefined,
);

export function BusinessProvider({ children }: { children: React.ReactNode }) {
  const [activeBusiness, setActiveBusinessState] =
    useState<ActiveBusiness | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize active business from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("activeBusiness");

    if (stored) {
      try {
        const parsed = JSON.parse(stored) as ActiveBusiness;
        setActiveBusinessState(parsed);
      } catch (error) {
        console.error("Failed to parse stored business:", error);
        localStorage.removeItem("activeBusiness");
      }
    }
    setIsLoading(false);
  }, []);

  const setActiveBusiness = (business: ActiveBusiness | null) => {
    setActiveBusinessState(business);

    if (business) {
      localStorage.setItem("activeBusiness", JSON.stringify(business));
    } else {
      localStorage.removeItem("activeBusiness");
    }
  };

  return (
    <BusinessContext.Provider
      value={{
        activeBusiness,
        setActiveBusiness,
        isLoading,
      }}>
      {children}
    </BusinessContext.Provider>
  );
}

export function useActiveBusiness() {
  const context = useContext(BusinessContext);

  if (context === undefined) {
    throw new Error("useActiveBusiness must be used within a BusinessProvider");
  }

  return context;
}

// Helper hook to check if user has specific permissions
export function useBusinessPermissions() {
  const { activeBusiness } = useActiveBusiness();

  const canManageStaff =
    activeBusiness?.role === "owner" || activeBusiness?.role === "admin";
  const canManageOrders =
    activeBusiness?.role === "owner" || activeBusiness?.role === "admin";
  const canManageSettings =
    activeBusiness?.role === "owner" || activeBusiness?.role === "admin";
  const canViewReports =
    activeBusiness?.role === "owner" || activeBusiness?.role === "admin";

  return {
    canManageStaff,
    canViewReports,
    canManageOrders,
    canManageSettings,
    role: activeBusiness?.role,
    isOwner: activeBusiness?.role === "owner",
    isAdmin: activeBusiness?.role === "admin",
  };
}
