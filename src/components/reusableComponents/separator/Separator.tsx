import { CSSProperties } from 'react';
import styled from 'styled-components';

interface IProps {
  text: string;
  style?: CSSProperties;
  className?: string;
}

const Separator = ({ text, style, className }: IProps) => {
  return (
    <SeparatorStyled style={style} className={className}>
      {text}
    </SeparatorStyled>
  );
};

export default Separator;

const SeparatorStyled = styled.p`
  position: relative;
  margin: 0 auto;
  text-align: center;
  display: inline-flex;
  font-size: 12pt;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: -110px;
    width: 100px;
    background-color: grey;
    height: 1px;
  }

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    right: -110px;
    width: 100px;
    background-color: grey;
    height: 1px;
  }
`;
