import styled from 'styled-components';
import { CSSProp } from 'styles/types';

export const BtnStyled = styled.button`
  font-size: 14pt;
  text-align: center;
  font-weight: 500;
  padding: 10px 10px;
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.mainBrandColor};
  transition: ${({ theme }) =>
    theme.transition({ property: CSSProp.backgroundColor })};
  cursor: pointer;

  &:hover,
  &:focus {
    background-color: ${({ theme }) => theme.colors.accentMainBrandColor};
  }
`;
