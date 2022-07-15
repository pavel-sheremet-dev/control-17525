import { Navigate } from 'react-router-dom';

import { authSelectors } from 'redux/auth';
import { useAppSelector } from 'redux/hooks';

interface INotAuthRoute {
  children: JSX.Element;
  redirectPath: string;
}

const NotAuthRoute = ({
  children,
  redirectPath,
}: INotAuthRoute): JSX.Element => {
  const isLoggedIn = useAppSelector(authSelectors.getIsLoggedIn);

  return !isLoggedIn ? children : <Navigate to={redirectPath} replace={true} />;
};

export default NotAuthRoute;
