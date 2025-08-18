import React from "react";
import { createContext, useState } from "react";

export const SettingsContext = createContext(null);

export function SettingsProvider({ children }) {
  const [darkMode, setDarkMode] = useState(false);
  const value = { darkMode, setDarkMode };
  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
}


