import { createContext } from "react";
import { ThemeTitle } from "styles/types";

interface IThemeContext {
  theme: ThemeTitle;
  changeTheme(): void;
}

const ThemeContext = createContext<IThemeContext>({
  theme: ThemeTitle.light,
  changeTheme: () => {},
});

export { ThemeContext };
