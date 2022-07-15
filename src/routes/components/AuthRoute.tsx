import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { authSelectors } from 'redux/auth';

interface IAuthRoute {
  children: JSX.Element;
  redirectPath: string;
}

const AuthRoute = ({ children, redirectPath }: IAuthRoute): React.ReactNode => {
  const isLoggedIn = useSelector(authSelectors.getIsLoggedIn);
  return isLoggedIn ? children : <Navigate to={redirectPath} replace={true} />;
};

export default AuthRoute;
