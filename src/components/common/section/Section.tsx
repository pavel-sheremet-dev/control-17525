import Container from 'components/common/container/Container';
import { Format, PageFormatContext } from 'context/PageFormatContext';
import { useContext } from 'react';

import { HeadingTitlesTags, StyledSection, Title } from './Section.styled';

interface IProps {
  title: string;
  titleLevel: HeadingTitlesTags;
  isHidden?: boolean;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  background?: React.ReactNode;
}

const Section = ({
  title,
  children,
  titleLevel,
  isHidden = false,
  style = {},
  background,
}: IProps) => {
  const pageFormat = useContext(PageFormatContext);

  const isMobile =
    pageFormat === Format.mobile || pageFormat === Format.responce;

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
      {background && !isMobile && <>{background}</>}
    </StyledSection>
  );
};

export default Section;
