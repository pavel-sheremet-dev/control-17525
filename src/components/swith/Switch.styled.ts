import styled from 'styled-components';

interface IProps {
  width: number;
}

export const StyledSwitch = styled.label<IProps>`
  display: flex;
  align-items: center;
  justify-content: space-between;

  & p {
    margin-right: 20px;
    padding: 10px;
  }

  & .switchHolder {
    width: ${({ width }) => `${width}px`};
    height: ${({ width }) => `${width / 1.7}px`};
    border-radius: ${({ width }) => `${width / 1.7 / 2}px`};
    background-color: ${({ theme }) => theme.colors.backgroundColor3};
    display: flex;
    align-items: center;
    transition: background-color ${({ theme }) => `${theme.delay / 2}ms`} linear;
  }

  & .switcher {
    width: 47%;
    height: 80%;
    margin: 6%;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.colors.backgroundColor1};
    transition: transform ${({ theme }) => `${theme.delay / 2}ms`} linear;
  }

  & input:checked {
    & + .switchHolder {
      background-color: ${({ theme }) => theme.colors.mainBrandColor};
    }
    & + .switchHolder .switcher {
      transform: translateX(87%);
    }
  }
`;
