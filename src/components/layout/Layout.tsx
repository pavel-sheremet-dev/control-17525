import React, { useState, useEffect, useCallback } from "react";

import { PositionContext } from "context/positionContext";
import { ThemeContext } from "context/themeContext";
import { Format, PageFormatContext } from "context/PageFormatContext";
import { BreakPoints, ThemeTitle } from "styles/types";

const breakPoints = {
  responce: Number.parseInt(BreakPoints.responce),
  mobile: Number.parseInt(BreakPoints.mobile),
  tablet: Number.parseInt(BreakPoints.tablet),
  desktop: Number.parseInt(BreakPoints.desktop),
};

interface Iprops {
  children?: React.ReactNode;
}

const Layout = ({ children }: Iprops) => {
  const [pageFormat, setPageFormat] = useState<null | Format>(null);

  const [isRightHand, setIsRightHand] = useState(() =>
    Boolean(localStorage.getItem("right-hand"))
  );

  const [theme, setTheme] = useState(() => {
    const ls = localStorage.getItem("theme") ?? ThemeTitle.light;
    if (ls === ThemeTitle.light) {
      return ThemeTitle.light;
    } else {
      return ThemeTitle.dark;
    }
  });

  useEffect(() => {
    const onHandleResize = () => {
      const viewport = window.innerWidth;

      if (viewport < breakPoints.mobile && pageFormat !== Format.responce) {
        setPageFormat(Format.responce);
        return;
      }
      if (
        viewport >= breakPoints.mobile &&
        viewport < breakPoints.tablet &&
        pageFormat !== Format.mobile
      ) {
        setPageFormat(Format.mobile);
        return;
      }
      if (
        viewport >= breakPoints.tablet &&
        viewport < breakPoints.desktop &&
        pageFormat !== Format.tablet
      ) {
        setPageFormat(Format.tablet);
        return;
      }
      if (viewport >= breakPoints.desktop && pageFormat !== Format.desktop) {
        setPageFormat(Format.desktop);
        return;
      }
    };
    window.addEventListener("resize", onHandleResize);
    onHandleResize();
  }, [pageFormat]);

  useEffect(() => {
    localStorage.setItem("right-hand", String(isRightHand));
  }, [isRightHand]);

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleHand = (value: boolean): void => {
    setIsRightHand(value);
  };

  const changeTheme = useCallback(
    () =>
      setTheme((prev) =>
        prev === ThemeTitle.light ? ThemeTitle.dark : ThemeTitle.light
      ),
    []
  );

  return (
    <PageFormatContext.Provider value={pageFormat}>
      <PositionContext.Provider value={{ isRightHand, toggleHand }}>
        <ThemeContext.Provider value={{ theme, changeTheme }}>
          {children}
        </ThemeContext.Provider>
      </PositionContext.Provider>
    </PageFormatContext.Provider>
  );
};

export default Layout;
