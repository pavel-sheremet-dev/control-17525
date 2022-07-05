import styled from "styled-components";

export enum HeadingTitlesTags {
  h1 = "h1",
  h2 = "h2",
  h3 = "h3",
  h4 = "h4",
  h5 = "h5",
  h6 = "h6",
}

interface ITitleProps {
  isHidden: boolean;
  as: HeadingTitlesTags;
}

export const StyledSection = styled.section`
  padding-top: 20px;
  padding-bottom: 20px;
`;

export const Title = styled.h2<ITitleProps>`
  font-size: 16pt;
  margin-bottom: 20px;

  ${({ isHidden }) =>
    isHidden &&
    `
    position: absolute;
    width: 1px;
    height: 1px;
    margin: -1px;
    border: 0;
    padding: 0;
    white-space: nowrap;
    clip-path: inset(100%);
    clip: rect(0 0 0 0);
    overflow: hidden;
  `};
`;
