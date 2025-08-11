import { useEffect, useCallback } from "react";
import { useLocalStorage } from "./useLocalStorage";

type Theme = "light" | "dark";

export function useTheme() {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [theme, setTheme] = useLocalStorage<Theme>(
    "theme",
    prefersDark ? "dark" : "light"
  );

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  }, [setTheme]);

  return { theme, toggleTheme };
}
