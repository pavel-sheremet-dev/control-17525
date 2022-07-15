import styled from 'styled-components';
import { CSSProp } from 'styles/types';

export const StyledButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  width: 42px;
  height: 42px;
  background-color: transparent;
  cursor: pointer;
  transform: scale(${({ disabled }) => (disabled ? 0 : 1)});
  &:hover,
  &:focus {
    background-color: ${({ theme }) => theme.colors.backgroundColor2};
  }
  transition: ${({ theme }) =>
      theme.transition({ property: CSSProp.backgroundColor })},
    ${({ theme }) => theme.transition({ property: CSSProp.transform })};

  & svg {
    width: 30px;
    height: 30px;
    color: ${({ theme }) => theme.colors.defaultFontColor};
  }
`;
