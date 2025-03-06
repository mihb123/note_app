"use client"; // Cần thiết vì notistack sử dụng state

import { SnackbarProvider } from "notistack";

export function Providers({ children }) {
  return <SnackbarProvider maxSnack={3}>{children}</SnackbarProvider>;
}