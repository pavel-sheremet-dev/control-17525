import styled, { DefaultTheme } from "styled-components";

interface IProps {
  isRightHand: boolean;
  isOpen: boolean;
  theme: DefaultTheme;
}

// export const StyledMobileMenu = styled.div.attrs(
//   ({ theme, isRightHand, isOpen }: IProps): IAttrs => {
//     const opacityValue = isOpen ? 0.6 : 0;
//     const positionProperty = isRightHand ? "right: 0;\n" : "left: 0;\n";
//     const border = `border-${isRightHand ? "left" : "right"}: 1px solid ${
//       theme.colors.defaultFontColor
//     }`;
//     const buttonposition = `margin-${isRightHand ? "left" : "right"}: auto;\n`;
//     const transform = isRightHand ? "" : "-";
//     const transformValue = isOpen ? 0 : `${transform}102%`;

//     return {
//       positionProperty,
//       theme,
//       transformValue,
//       opacityValue,
//       border,
//       buttonposition,
//     };
//   }
// )`
//   position: fixed;
//   z-index: 80;
//   top: 0;
//   left: 0;
//   width: 100vw;
//   height: 100vh;

//   & button {
//     margin-bottom: 15px;
//     text-align: right;
//     ${({ buttonposition }) => buttonposition};
//   }

//   & .box {
//     position: absolute;
//     z-index: 100;
//     top: 0;
//     ${({ positionProperty }) => positionProperty};
//     ${({ border }) => border};

//     background-color: ${({ theme }) => theme.colors.backgroundColor1};
//     width: 80%;
//     max-width: 250px;
//     height: 100%;
//     padding: 15px;
//     transform: translateX(${({ transformValue }) => transformValue});
//     transition: transform ${({ theme }) => `${theme.delay}ms`} linear;
//     text-align: center;
//   }

//   & .backdrop {
//     background-color: #000000;
//     opacity: ${({ opacityValue }) => opacityValue};
//     position: absolute;
//     top: 0;
//     left: 0;
//     width: 100%;
//     height: 100%;
//     z-index: 90;
//     transition: opacity ${({ theme }) => `${theme.delay}ms`} linear;
//   }
// `;

export const StyledMobileMenu = styled.div<IProps>`
  position: fixed;
  z-index: 80;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;

  & button {
    margin-bottom: 15px;
    text-align: right;
    ${({ isRightHand }) => `margin-${isRightHand ? "left" : "right"}: auto`};
  }

  & .box {
    position: absolute;
    z-index: 100;
    top: 0;
    ${({ isRightHand }) => (isRightHand ? "right: 0" : "left: 0")};
    ${({ isRightHand, theme }) =>
      `border-${isRightHand ? "left" : "right"}: 1px solid ${
        theme.colors.defaultFontColor
      }`};

    background-color: ${({ theme }) => theme.colors.backgroundColor1};
    width: 80%;
    max-width: 250px;
    height: 100%;
    padding: 15px;
    transform: translateX(
      ${({ isRightHand, isOpen }) => {
        const transform = isRightHand ? "" : "-";
        return isOpen ? 0 : `${transform}102%`;
      }}
    );
    transition: transform ${({ theme }) => `${theme.delay}ms`} linear;
    text-align: center;
  }

  & .backdrop {
    background-color: #000000;
    opacity: ${({ isOpen }) => (isOpen ? 0.6 : 0)};
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 90;
    transition: opacity ${({ theme }) => `${theme.delay}ms`} linear;
  }
`;
