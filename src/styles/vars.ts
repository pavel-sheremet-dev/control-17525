import { BreakPoints, CssVars, CSSProp } from "styles/types";

export const getCssVariables = (): CssVars => ({
  delay: 250,
  breakPoints: {
    responce: BreakPoints.responce,
    mobile: BreakPoints.mobile,
    tablet: BreakPoints.tablet,
    desktop: BreakPoints.desktop,
  },
  transition: (property: CSSProp, delay = 250, type = "linear") =>
    `${property} ${delay}ms ${type}`,
});
