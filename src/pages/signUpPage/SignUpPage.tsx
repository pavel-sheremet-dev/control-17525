import SignUpForm from 'components/auth/signUpForm/SignUpForm';
import Section from 'components/common/section/Section';
import { HeadingTitlesTags } from 'components/common/section/Section.styled';
import { SideBox, ContentBox } from './SignUpPage.styled';
import { ReactComponent as Boy } from 'assets/images/svg/boy.svg';
import { ReactComponent as Girl } from 'assets/images/svg/girl.svg';
import { ReactComponent as Girl3 } from 'assets/images/svg/girl3.svg';

import GoogleButton from 'components/auth/googleButton/GoogleButton';

import { getRouteById } from 'routes/config';
import { RoutesId } from 'routes/types';
import RedirectBox from 'components/auth/redirectBox/RedirectBox';
import Separator from 'components/reusableComponents/separator/Separator';
import Suptitle from 'components/reusableComponents/suptitle/Suptitle';
import { Format, PageFormatContext } from 'context/PageFormatContext';
import { useContext } from 'react';
import BackgoundElements from 'components/backgoundElements/BackgoundElements';
import Sticker from 'components/stickers/Stickers';

const SignUpPage = () => {
  const redirectRoute = getRouteById(RoutesId.SIGN_IN);
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

          <SignUpForm />

          <RedirectBox
            text={'Already registered?'}
            className={'redirect-box'}
            redirectRoute={redirectRoute}
          />
        </SideBox>

        {!isMobile && (
          <SideBox>
            <div
              style={{
                width: '300px',
                position: 'absolute',
                display: 'flex',
                alignItems: 'center',
                top: '7%',
                left: '4vw',
              }}
            >
              <Boy />
              <Sticker
                text={`Сдавайте ваши отчёты удобно`}
                style={{
                  color: 'white',
                }}
              />
            </div>
            <div
              style={{
                width: '350px',
                position: 'absolute',
                display: 'flex',
                alignItems: 'center',
                top: '38%',
                left: '3vw',
              }}
            >
              <Sticker
                text={'Контролируйте свои успехи'}
                style={{
                  backgroundColor: '#2a231e',
                  marginRight: '10px',
                  color: 'white',
                }}
              />
              <Girl />
            </div>
            <div
              style={{
                width: '350px',
                position: 'absolute',
                display: 'flex',
                alignItems: 'center',
                top: '65%',
                left: '2vw',
              }}
            >
              <Girl3 />
              <Sticker
                text={`Записывайтесь удобно на стенд`}
                style={{
                  backgroundColor: '#9d5f67',
                  marginLeft: '10px',
                  color: 'white',
                }}
              />
            </div>
          </SideBox>
        )}
      </ContentBox>
    </Section>
  );
};

export default SignUpPage;
