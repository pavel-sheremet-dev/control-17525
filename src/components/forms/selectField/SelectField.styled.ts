import styled from 'styled-components';

interface ISelectProps {
  isError: boolean;
}

export const SelectWrapper = styled.div<ISelectProps>`
  & .label {
    display: block;
    width: 100%;
    margin-bottom: 8px;
    font-style: normal;
    font-weight: 500;
    font-size: 12pt;
    line-height: 1.21;
  }

  & .wrapper {
    ${({ isError, theme }) =>
      isError ? ` outline: 1px solid ${theme.colors.required};` : ''};
  }

  & .required {
    color: ${({ theme }) => theme.colors.required};
  }
`;
