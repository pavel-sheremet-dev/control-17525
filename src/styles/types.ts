export enum ThemeTitle {
  light = 'light',
  dark = 'dark',
}

export enum BreakPoints {
  responce = '479px',
  mobile = '480px',
  tablet = '768px',
  desktop = '1280px',
}

export enum CSSProp {
  color = 'color',
  backgroundColor = 'background-color',
  fill = 'fill',
  stroke = 'stroke',
  transform = 'transform',
  outlineColor = 'outline-color',
  borderColor = 'border-color',
  opacity = 'opacity',
}

export type Palette = {
  themeTitle: ThemeTitle;
  colors: {
    defaultFontColor: string;
    white: string;
    mainBrandColor: string;
    accentMainBrandColor: string;
    secondaryBrandColor: string;
    backgroundColor1: string;
    backgroundColor1Tr: string;
    backgroundColor2: string;
    backgroundColor3: string;
    backgroundColor4: string;
    fontColor1: string;
    fontColor2: string;
    required: string;
    requiredBg: string;
    color1: string;
    color2: string;
    color3: string;
    color4: string;
    color5: string;
    color6: string;
    google: string;
    googleHover: string;
    googleDisabled: string;
    inputText: string;
    inputPlaceholder: string;
    inputBackGround: string;
  };
  shadows: {
    google: string;
    input: string;
  };
};

export type TransitionOptions = {
  property: CSSProp;
  duration?: number;
  type?: string;
  delay?: number;
};

export type CssVars = {
  delay: number;
  breakPoints: {
    responce: BreakPoints.responce;
    mobile: BreakPoints.mobile;
    tablet: BreakPoints.tablet;
    desktop: BreakPoints.desktop;
  };
  transition(options: TransitionOptions): string;
};

export type Theme = Palette & CssVars;
