import styled from 'styled-components';
import { ReactComponent as Cat } from 'assets/images/svg/cat.svg';
import { useEffect, useState } from 'react';
import { CSSProp } from 'styles/types';

interface IProps {
  className?: string;
}

const Avatar = ({ className }: IProps) => {
  const [translateY, setTranslateY] = useState(5);

  useEffect(() => {
    setTranslateY(0);
  }, []);

  return (
    <AvatarStyled className={className} offsetY={translateY}>
      <Cat />
    </AvatarStyled>
  );
};

export default Avatar;

interface IPropsStyled {
  offsetY: number;
}

export const AvatarStyled = styled.div<IPropsStyled>`
  height: 185px;
  width: 185px;
  padding: 40px 10px 0 10px;
  overflow: hidden;
  /* background-color: ${({ theme }) => theme.colors.mainBrandColor}; */
  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.colors.defaultFontColor};

  & svg {
    transform: translateY(${({ offsetY }) => `${offsetY}%`});
    transition: ${({ theme }) =>
      theme.transition({ property: CSSProp.transform })};
  }
`;
