import { CSSProperties } from 'react';
import styled from 'styled-components';

interface IProps {
  text: string;
  style?: CSSProperties;
  className?: string;
}

const Suptitle = ({ text, style, className }: IProps) => {
  return (
    <SuptitleStyled style={style} className={className}>
      {text}
    </SuptitleStyled>
  );
};

export default Suptitle;

const SuptitleStyled = styled.p`
  text-align: center;
  font-size: 18pt;
  line-height: 1.5;
`;
