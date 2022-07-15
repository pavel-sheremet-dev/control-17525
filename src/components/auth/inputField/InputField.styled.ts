import styled from 'styled-components';

interface IInputProps {
  isError: boolean;
}

export const LabelStyled = styled.label`
  display: block;
  width: 100%;
  margin-bottom: 7px;
  font-style: normal;
  font-weight: 600;
  font-size: 12pt;
  line-height: 1.21;

  @media screen and (min-width: ${({ theme }) => theme.breakPoints.tablet}) {
    font-weight: 500;
  }

  & .required,
  & .error {
    color: ${({ theme }) => theme.colors.required};
  }

  & .error {
    display: block;
    font-size: 12px;
    line-height: 1.25;
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
`;
