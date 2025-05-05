"use client";
import { createContext, useContext, useState } from "react";

// Tạo Context
const SelectedItemContext = createContext();

// Provider để bọc app
export function SelectedItemProvider({ children }) {
  const [selectedItem, setSelectedItem] = useState(0);

  return (
    <SelectedItemContext.Provider value={{ selectedItem, setSelectedItem }}>
      {children}
    </SelectedItemContext.Provider>
  );
}

// Hook để dùng Context
export function useSelectedItem() {
  return useContext(SelectedItemContext);
}