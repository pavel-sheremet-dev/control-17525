import { light } from "./light";
import { dark } from "./dark";
import { getCssVariables } from "styles/vars";
import { Theme, ThemeTitle } from "styles/types";

const themes = { light, dark };

const getTheme = (theme: ThemeTitle): Theme => ({
  ...themes[theme],
  ...getCssVariables(),
});

export default getTheme;
