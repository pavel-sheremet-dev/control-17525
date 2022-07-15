import styled from 'styled-components';
import { CSSProp } from 'styles/types';

interface IProps {
  columnDirection: boolean;
}

export const StyledNavigation = styled.nav<IProps>`
  & ul {
    display: ${({ columnDirection }) => (columnDirection ? 'block' : 'flex')};
  }

  & li:last-child {
    & a {
      background-color: ${({ theme }) => theme.colors.mainBrandColor};
      color: ${({ theme }) => theme.colors.white};
    }

    & a:hover,
    & a:focus {
      background-color: ${({ theme }) => theme.colors.accentMainBrandColor};
    }
  }

  & a {
    font-size: 14pt;
    text-align: center;
    font-weight: 500;
    padding: 10px 10px;
    width: 100%;

    &:hover,
    &:focus {
      background-color: ${({ theme }) => theme.colors.backgroundColor2};
    }
    transition: ${({ theme }) =>
      theme.transition({ property: CSSProp.backgroundColor })};
  }
`;
