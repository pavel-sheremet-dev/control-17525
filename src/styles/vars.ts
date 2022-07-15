import { BreakPoints, CssVars, TransitionOptions } from 'styles/types';

export const getCssVariables = (): CssVars => ({
  delay: 250,
  breakPoints: {
    responce: BreakPoints.responce,
    mobile: BreakPoints.mobile,
    tablet: BreakPoints.tablet,
    desktop: BreakPoints.desktop,
  },
  transition: ({
    property,
    duration = 250,
    type = 'linear',
    delay = 0,
  }: TransitionOptions) => `${property} ${duration}ms ${type} ${delay}ms`,
});
