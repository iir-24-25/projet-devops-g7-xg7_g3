"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

type SidebarState = {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  toggleSidebar: () => void;
  isMobile: boolean;
};

const SidebarContext = createContext<SidebarState | undefined>(undefined);

export function SidebarProvider({ children }: { children: ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if we're on mobile
    const checkMobile = () => {
      // Ensure window is available (for SSR safety)
      if (typeof window === "undefined") return;

      const isMobileView = window.innerWidth < 768;
      setIsMobile(isMobileView);

      // On mobile, sidebar should be collapsed by default
      if (isMobileView && !collapsed) {
        setCollapsed(true);
      }
    };

    // Try to get saved state from localStorage
    const savedState = localStorage.getItem("sidebar-collapsed");
    if (savedState !== null) {
      setCollapsed(savedState === "true");
    }

    // Initial check
    checkMobile();

    // Add resize listener
    window.addEventListener("resize", checkMobile);

    // Cleanup
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, [collapsed]); // Added collapsed as a dependency

  // Save state to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("sidebar-collapsed", String(collapsed));
  }, [collapsed]);

  const toggleSidebar = () => {
    setCollapsed((prev) => !prev); // Use functional update for better state consistency
  };

  return (
    <SidebarContext.Provider value={{ collapsed, setCollapsed, toggleSidebar, isMobile }}>
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
}