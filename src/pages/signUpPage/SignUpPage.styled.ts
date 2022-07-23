import styled from 'styled-components';

export const ContentBox = styled.div`
  @media screen and (min-width: ${({ theme }) => theme.breakPoints.tablet}) {
    display: grid;
    grid-template-columns: 0.5fr 0.5fr;
  }
  @media screen and (min-width: ${({ theme }) => theme.breakPoints.desktop}) {
    grid-template-columns: 0.35fr 0.65fr;
  }
`;

export const SideBox = styled.div`
  position: relative;

  & .sup-title {
    margin-bottom: 20px;
  }

  & .google {
    margin-bottom: 20px;
  }

  & .separate {
    margin-bottom: 20px;
  }

  & .avatar {
    margin-bottom: auto;
  }

  & .redirect-box {
    margin-top: 20px;
  }

  & .is-register {
    font-size: 11pt;
    display: inline-flex;
  }

  & .signin {
    font-size: 10pt;
    font-weight: 500;
    text-decoration: underline;
    color: ${({ theme }) => theme.colors.mainBrandColor};
  }

  &.left {
    display: flex;
    min-height: 655px;
    flex-direction: column;
    align-items: center;
    flex-shrink: 0;
    background-color: ${({ theme }) => theme.colors.backgroundColor1};
  }
`;
