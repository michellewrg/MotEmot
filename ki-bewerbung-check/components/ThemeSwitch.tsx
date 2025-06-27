import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

function ThemeSwitch() {
  const [theme, setTheme] = useState(() => {
    const stored = localStorage.getItem("theme");
    if (stored) return stored;
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <label className="swap swap-rotate cursor-pointer hover:scale-110 pr-4">
      <input
        type="checkbox"
        onChange={toggleTheme}
        checked={theme === "light"}
      />
      <Sun className="swap-off" size={32} />
      <Moon className="swap-on" size={32} />
    </label>
  );
}

export default ThemeSwitch;
