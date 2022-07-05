import { ThemeContext } from "context/themeContext";
import { useState, memo, useContext } from "react";

import sprite from "assets/images/sprite.svg";
import { ThemeBtn, ThemeIcon } from "./ThemeSwitcher.styled";
import { timeout } from "helpers/asyncHelpers";
import { getCssVariables } from "styles/vars";

const defaulCssDelay = getCssVariables().delay;

const ThemeSwitcher = () => {
  const [opacity, setOpacity] = useState(1);
  const [scale, setScale] = useState(1);
  const { theme, changeTheme } = useContext(ThemeContext);

  const handleClick = async (): Promise<void> => {
    await hideElement();
    changeTheme();
    setOpacity(1);
    setScale(1);
  };

  const hideElement = async (
    cssDelay: number = defaulCssDelay
  ): Promise<boolean> => {
    setOpacity(0);
    setScale(0.7);
    await timeout(cssDelay, 0.5);
    return true;
  };

  return (
    <ThemeBtn type="button" onClick={handleClick}>
      <ThemeIcon opacity={opacity} scale={scale}>
        <use
          href={`${sprite}#${theme === "light" ? "icon-sun" : "icon-moon"}`}
        ></use>
      </ThemeIcon>
    </ThemeBtn>
  );
};

export default memo(ThemeSwitcher);
