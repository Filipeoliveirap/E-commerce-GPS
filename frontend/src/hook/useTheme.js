import { useState, useEffect } from "react";

export function useTheme() {
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("darkMode") === "true"
  );

  const toggleDarkMode = () => setDarkMode(prev => !prev);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  return { darkMode, toggleDarkMode };
}
