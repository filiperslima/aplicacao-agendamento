import { Toaster } from "@/components/ui/sonner";
import { createContext } from "react";

interface ToastContextType {}

const ToastContext = createContext<ToastContextType | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  <ToastContext.Provider value={{}}>
    
    
    {children}</ToastContext.Provider>;
}
