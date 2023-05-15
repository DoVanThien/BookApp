import React, { createContext, useState } from "react";
import { lightTheme, darkTheme } from "../constants/Theme";

interface ThemeContextProps {
  theme: {
    primary: string;
    secondary: string;
    backgroundColor: string;
    textColor: string;
    backgroundInputColor: string;
    gray: string;
    authorColor: string;
    inforColor: string;
    red: string;
    textRed: string;
    backgroundModal: string;
    buttonTextSmall: string;
    buttonTextMedium: string;
    buttonTextLarge: string;
  };
  toggleTheme: () => void;
}

const initialThemeContext: ThemeContextProps = {
  theme: lightTheme,
  toggleTheme: () => {},
};

export const ThemeContext =
  createContext<ThemeContextProps>(initialThemeContext);

interface Props {
  initialTheme: typeof lightTheme;
}

export const ThemeProvider = ({
  initialTheme,
  children,
}: Props & { children: React.ReactNode }) => {
  const [theme, setTheme] = useState(initialTheme);

  const toggleTheme = () => {
    setTheme((theme) => (theme === lightTheme ? darkTheme : lightTheme));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// export const MyThemeProvider = ThemeProvider;
