import React, { useContext, useEffect } from "react";

import { Switch } from "@/components/ui/switch";

import { SettingsContext } from "@/context/SettingsContext";
import { Moon, Sun } from "lucide-react";

function Settings() {
  const { darkMode, setDarkMode } = useContext(SettingsContext);

  useEffect(() => {
    document.body.classList.toggle("dark-mode", darkMode);
    document.body.classList.toggle("light-mode", !darkMode);
  }, [darkMode]);

  return (
    <div className="flex items-center space-x-2">
      <Sun className="h-4 w-4 text-yellow-500" />
      <Switch
        id="night-mode"
        checked={darkMode}
        onCheckedChange={setDarkMode}
      />
      <Moon className="h-4 w-4 text-blue-500" />
    </div>
  );
}

export default Settings;
