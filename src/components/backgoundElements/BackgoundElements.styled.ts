import styled from 'styled-components';
import { CSSProp } from 'styles/types';

interface IProps {
  opacity?: number;
  delay?: number;
}

export const Line = styled.div<IProps>`
  position: absolute;
  pointer-events: none;
  z-index: -1;
  opacity: ${({ opacity }) => opacity ?? 0.9};
  transition: ${({ theme, delay }) =>
    theme.transition({ property: CSSProp.opacity, delay })};
`;

export const AngleLine1 = styled(Line)`
  top: 0;
  left: 0;
  width: 67%;
  height: 259px;
  border-bottom: 10px solid ${({ theme }) => theme.colors.mainBrandColor};
  border-right: 10px solid ${({ theme }) => theme.colors.mainBrandColor};
  border-bottom-right-radius: 70px;
`;

export const AngleLine2 = styled(Line)`
  bottom: 0;
  left: 0;
  width: 90%;
  height: 155px;
  border-top: 10px solid ${({ theme }) => theme.colors.mainBrandColor};
  border-right: 10px solid ${({ theme }) => theme.colors.mainBrandColor};
  border-top-right-radius: 70px;
`;

export const HorizontalLine = styled(Line)`
  bottom: 0;
  left: 0;
  width: 100%;
  height: 340px;
  border-top: 10px solid ${({ theme }) => theme.colors.mainBrandColor};
`;
