import styled from 'styled-components';
import { CSSProp } from 'styles/types';

interface ILabelProps {
  isError: boolean;
}

export const LabelStyled = styled.label<ILabelProps>`
  display: flex;
  align-items: center;
  justify-content: center;

  & svg {
    flex-shrink: 0;
    fill: transparent;
    transition: ${({ theme }) =>
      theme.transition({ property: CSSProp.fill, duration: 100 })};
  }

  & .checkbox {
    margin-right: 10px;
    border: 1px solid
      ${({ theme, isError }) =>
        isError ? theme.colors.required : theme.colors.defaultFontColor};
    background-color: ${({ theme, isError }) =>
      isError ? theme.colors.requiredBg : 'transparent'};
    transition: ${({ theme }) =>
        theme.transition({ property: CSSProp.borderColor, duration: 100 })},
      ${({ theme }) =>
        theme.transition({ property: CSSProp.backgroundColor, duration: 100 })};
  }

  & input:checked {
    & + .checkbox {
      border-color: ${({ theme }) => theme.colors.mainBrandColor};
    }
    & + .checkbox svg {
      fill: ${({ theme }) => theme.colors.mainBrandColor};
    }
  }
`;
