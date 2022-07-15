import styled from 'styled-components';
import { CSSProp } from 'styles/types';

interface Iprops {
  isLoading: boolean;
}

export const LinkStyled = styled.a<Iprops>`
  width: 150px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-color: ${({ theme }) => theme.colors.google};
  box-shadow: ${({ theme }) => theme.shadows.google};
  border-radius: 5px;
  transition: ${({ theme }) =>
    theme.transition({ property: CSSProp.backgroundColor })};
  pointer-events: ${({ isLoading }) => (isLoading ? 'none' : 'visible')};

  &:hover,
  &:focus,
  &:active {
    background-color: ${({ theme }) => theme.colors.googleHover};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.googleDisabled};
  }

  & svg {
    margin-right: 10px;
    width: 25px;
    height: 25px;
  }

  & span {
    font-size: 16pt;
    font-weight: 700;
    margin-bottom: -0.4rem;
  }
`;
