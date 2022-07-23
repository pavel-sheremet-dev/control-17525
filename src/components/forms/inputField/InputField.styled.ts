import { CSSProp } from 'styles/types';

import styled from 'styled-components';

interface IInputProps {
  isError: boolean;
}

export const LabelStyled = styled.label`
  display: block;
  width: 100%;
  font-style: normal;
  font-weight: 500;
  font-size: 12pt;
  line-height: 1.21;

  & .required {
    color: ${({ theme }) => theme.colors.required};
  }
`;

export const InputStyled = styled.input<IInputProps>`
  display: block;
  margin-top: 8px;
  margin-bottom: 3px;
  padding: 5px 8px;
  width: 100%;
  height: 42px;
  outline: none;
  font-weight: 400;
  font-size: 12pt;
  line-height: 1.21;
  color: inherit;
  background-color: ${({ theme }) => theme.colors.google};
  ${({ isError, theme }) =>
    isError ? ` outline: 1px solid ${theme.colors.required};` : ''};
  border: none;
  transition: ${({ theme }) =>
    theme.transition({ property: CSSProp.backgroundColor })};

  &:focus {
    background-color: ${({ theme }) => theme.colors.googleHover};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.inputPlaceholder};
  }

  &[type='password'] {
    font-family: Verdana;
    letter-spacing: 0.125em;
  }

  &[type='password']::placeholder {
    font-family: initial;
    letter-spacing: initial;
  }

  &[type='number']::-webkit-outer-spin-button,
  &[type='number']::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &[type='number'] {
    -moz-appearance: textfield;
  }
`;
