import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Section from 'components/common/section/Section';
import RedirectTimer from 'components/redirectTimer/RedirectTimer';
import { HeadingTitlesTags } from 'components/common/section/Section.styled';
import { BtnStyled } from 'components/reusableComponents/textBtn/TextBtn.styled';

const NotFoundPage = () => {
  const [isRedirect, setIsRedirect] = useState(false);
  const [time, setTime] = useState(5);
  const navigate = useNavigate();

  const handleClick = () => {
    setTime(0);
    navigate('/', { replace: true });
  };

  useEffect(() => {
    if (!isRedirect) return;
    navigate('/', { replace: true });
  }, [navigate, isRedirect]);

  return (
    <Section
      title="404"
      style={{ fontSize: '20px' }}
      titleLevel={HeadingTitlesTags.h2}
    >
      <BtnStyled type="button" onClick={handleClick}>
        To the main page
      </BtnStyled>
      <p
        style={{ paddingTop: '20px', paddingBottom: '20px', fontSize: '20px' }}
      >
        Oops, your page was not found ¯\_(ツ)_/¯
      </p>
      <RedirectTimer startRedirect={setIsRedirect} time={time} />
    </Section>
  );
};

export default NotFoundPage;
