import React, { createContext, useState, useMemo } from "react";

import dark from "@styles/themes/dark";
import light from "@styles/themes/light";

export interface IThemeContext {
  toggleTheme(): void;
  theme: ITheme;
}

interface ITheme {
  title: string;

  colors: {
    primary: string;
    secondary: string;
    tertiary: string;

    white: string;
    black: string;
    grey: string;
    orange: string;

    success: string;
    info: string;
    warning: string;

    balance: string;
    entries: string;
    outflows: string;
    generic: string;
    recurring: string;
    eventual: string;
  };
}

export const ThemeContext = createContext<IThemeContext>({} as IThemeContext);

export const ThemeProvider: React.FC = ({ children }) => {
  const lastSelectedTheme = useMemo(() => {
    return localStorage.getItem("@todo:theme");
  }, []);

  const [theme, setTheme] = useState<ITheme>(
    lastSelectedTheme === "light" ? light : dark
  );

  const toggleTheme = () => {
    if (theme.title === "dark") {
      setTheme(light);
      localStorage.setItem("@todo:theme", "light");
    } else {
      setTheme(dark);
      localStorage.setItem("@todo:theme", "dark");
    }
  };

  return (
    <ThemeContext.Provider value={{ toggleTheme, theme }}>
      {children}
    </ThemeContext.Provider>
  );
};
