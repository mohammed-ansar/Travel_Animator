'use client';
import React, { createContext, useState, useContext, ReactNode } from "react";

type UIContextType = {
  showExportCard: boolean;
  setShowExportCard: (value: boolean) => void;
  showProgressCard: boolean;
  setShowProgressCard: (value: boolean) => void;
};

const UIContext = createContext<UIContextType | undefined>(undefined);

export const UIProvider = ({ children }: { children: ReactNode }) => {
  const [showExportCard, setShowExportCard] = useState(false);
  const [showProgressCard, setShowProgressCard] = useState(false);

  return (
    <UIContext.Provider
      value={{ showExportCard, setShowExportCard, showProgressCard, setShowProgressCard }}
    >
      {children}
    </UIContext.Provider>
  );
};

export const useUIContext = () => {
  const context = useContext(UIContext);
  if (!context) {
    throw new Error("useUIContext must be used within a UIProvider");
  }
  return context;
};
