import styled from 'styled-components';

export const StyledContainer = styled.div`
  /* outline: 1px solid green; */
  position: relative;
  margin: 0 auto;
  padding: 0 15px;
  width: 100vw;

  @media screen and (min-width: ${({ theme }) => theme.breakPoints.mobile}) {
    width: 480px;
  }
  @media screen and (min-width: ${({ theme }) => theme.breakPoints.tablet}) {
    width: 768px;
  }
  @media screen and (min-width: ${({ theme }) => theme.breakPoints.desktop}) {
    width: 1280px;
  }
`;
