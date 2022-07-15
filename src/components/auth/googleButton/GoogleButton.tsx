import { useState } from 'react';

import { ReactComponent as GoogleIcon } from 'assets/images/svg/google-icon.svg';
import { Loader } from 'components/common/loader/Loader';

import { LinkStyled } from './GoogleButton.styled';

interface IProps {
  className?: string;
}

const GoogleButton = ({ className }: IProps) => {
  const url = process.env.REACT_APP_API_BASE_URL;
  const [isLoading, setIsLoading] = useState(false);

  const disableLink = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    setIsLoading(true);
  };

  return (
    <>
      {isLoading && <Loader />}
      <LinkStyled
        isLoading={isLoading}
        href={`${url}/api/users/google`}
        onClick={e => disableLink(e)}
        className={className}
      >
        <GoogleIcon />
        <span>Google</span>
      </LinkStyled>
    </>
  );
};

export default GoogleButton;
