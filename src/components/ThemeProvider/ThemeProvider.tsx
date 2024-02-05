"use client";
import { useState, useEffect } from "react";
import ThemeContext from "@/context/themeContext";
type ThemeContextProviderProps = {
  children: React.ReactNode;
};

const ThemeContextProvider = ({ children }: ThemeContextProviderProps) => {
  const themeFromStorage: boolean =
    typeof localStorage !== "undefined" && localStorage?.getItem("hotel-theme")
      ? JSON.parse(localStorage.getItem("hotel-theme")!)
      : false;
  const [darkTheme, setDarkTheme] = useState<boolean>(themeFromStorage);

  const [renderComponent, setRenderComponent] = useState<boolean>(false);
  useEffect(() => {
    setRenderComponent(true);
  }, []);
  if (!renderComponent) return <></>;

  return (
    <ThemeContext.Provider value={{ darkTheme, setDarkTheme }}>
      <div className={`${darkTheme ? "dark" : ""} min-h-screen`}>
        <div className="dark:text-[#f5f5f5] dark:bg-slate-950 text-[#1E1E1E]">
          {children}
        </div>
      </div>
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;
