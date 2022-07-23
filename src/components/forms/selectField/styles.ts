import { StylesConfig, Theme } from 'react-select';
import { DefaultTheme } from 'styled-components';
import { CSSProp } from 'styles/types';
import { IOption } from './SelectField';

type IsMulti = false;

export const getCustomStyles = (
  theme: DefaultTheme,
): StylesConfig<IOption, IsMulti> => ({
  option: (provided, state) => ({
    ...provided,
    color: state.isSelected
      ? theme.colors.white
      : theme.colors.defaultFontColor,
    padding: 10,
  }),
  control: (provided, state) => ({
    ...provided,
    boxShadow: 'none',
    border: 0,
    backgroundColor: state.isFocused
      ? theme.colors.googleHover
      : theme.colors.google,
    borderRadius: 0,
    transition: theme.transition({ property: CSSProp.backgroundColor }),
  }),
  indicatorsContainer: () => ({
    color: theme.colors.mainBrandColor,
  }),
});

export const getSelectTheme = (selectTheme: Theme, theme: DefaultTheme) => ({
  ...selectTheme,
  borderRadius: 0,
  colors: {
    ...selectTheme.colors,
    primary: theme.colors.mainBrandColor,
    neutral0: theme.colors.google,
    neutral50: theme.colors.inputPlaceholder,
    neutral60: theme.colors.mainBrandColor,
    neutral40: theme.colors.mainBrandColor,
    neutral80: theme.colors.defaultFontColor,
    primary25: theme.colors.googleHover,
  },
  spacing: {
    ...selectTheme.spacing,
    controlHeight: 42,
    menuGutter: 0,
  },
});
