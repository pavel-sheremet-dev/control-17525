export enum ThemeTitle {
  light = "light",
  dark = "dark",
}

export enum BreakPoints {
  responce = "479px",
  mobile = "480px",
  tablet = "768px",
  desktop = "1280px",
}

export enum CSSProp {
  color = "color",
  backgroundColor = "background-color",
  fill = "fill",
  stroke = "stroke",
  transform = "transform",
  outlineColor = "outline-color",
}

export type Palette = {
  themeTitle: string;
  colors: {
    [x: string]: string;
  };
};

export type CssVars = {
  delay: number;
  breakPoints: {
    responce: BreakPoints.responce;
    mobile: BreakPoints.mobile;
    tablet: BreakPoints.tablet;
    desktop: BreakPoints.desktop;
  };
  transition(property: CSSProp, delay?: number, type?: string): string;
};

export type Theme = Palette & CssVars;
