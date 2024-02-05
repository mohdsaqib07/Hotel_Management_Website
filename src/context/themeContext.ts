import React, { createContext, SetStateAction, Dispatch } from "react";

type ThemeContextType = {
	darkTheme: boolean;
	setDarkTheme: Dispatch<SetStateAction<boolean>>;
};

const ThemeContext = createContext<ThemeContextType>({
	darkTheme: false,
	setDarkTheme: () => null,
});

export default ThemeContext;
