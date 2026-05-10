"use client";

import { Toaster } from "sonner";

export default function AppToaster() {
  return (
    <Toaster
      position="top-center"
      richColors
      closeButton
      duration={4000}
      toastOptions={{
        classNames: {
          toast: "font-sans",
        },
      }}
    />
  );
}
