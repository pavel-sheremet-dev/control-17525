import React from "react";
import { StyledContainer } from "./Container.styled";
import PropTypes from "prop-types";

interface Props {
  style?: React.CSSProperties;
  children: React.ReactNode;
}

const Container = ({ style = {}, children }: Props) => {
  return <StyledContainer style={style}>{children}</StyledContainer>;
};

Container.propTypes = {
  children: PropTypes.node,
};

export default Container;
