import { useContext } from 'react';
import { Format, PageFormatContext } from 'context/PageFormatContext';

import Section from 'components/common/section/Section';
import BackgoundElements from 'components/backgoundElements/BackgoundElements';
import Suptitle from 'components/reusableComponents/suptitle/Suptitle';
import GoogleButton from 'components/auth/googleButton/GoogleButton';
import Separator from 'components/reusableComponents/separator/Separator';

import RedirectBox from 'components/auth/redirectBox/RedirectBox';

import { HeadingTitlesTags } from 'components/common/section/Section.styled';

import { RoutesId } from 'routes/types';

import { getRouteById } from 'routes/config';
import { ContentBox, SideBox } from 'pages/signUpPage/SignUpPage.styled';
import SignInForm from 'components/auth/signIn/SignInForm';

const SignUpPage = () => {
  const redirectRoute = getRouteById(RoutesId.SIGN_UP);
  const pageFormat = useContext(PageFormatContext);

  const isMobile =
    pageFormat === Format.mobile || pageFormat === Format.responce;

  return (
    <Section
      title="Registration page"
      titleLevel={HeadingTitlesTags.h2}
      isHidden
      background={<BackgoundElements />}
    >
      <ContentBox>
        <SideBox className="left">
          <Suptitle text="Create your account with" className={'sup-title'} />
          <GoogleButton className="google" />
          <Separator className="separate" text="or" />
          <SignInForm />
          <RedirectBox
            text={`Don't have an account?`}
            className={'redirect-box'}
            redirectRoute={redirectRoute}
          />
        </SideBox>

        {!isMobile && <SideBox></SideBox>}
      </ContentBox>
    </Section>
  );
};

export default SignUpPage;
