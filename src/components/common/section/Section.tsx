import Container from "components/common/container/Container";

import { HeadingTitlesTags, StyledSection, Title } from "./Section.styled";

interface IProps {
  title: string;
  titleLevel: HeadingTitlesTags;
  isHidden?: boolean;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

const Section = ({
  title,
  children,
  titleLevel,
  isHidden = false,
  style = {},
}: IProps) => {
  return (
    <StyledSection style={style}>
      <Container>
        {title && (
          <Title as={titleLevel} isHidden={isHidden}>
            {title}
          </Title>
        )}

        {children}
      </Container>
    </StyledSection>
  );
};

export default Section;
