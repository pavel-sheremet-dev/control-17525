import { Navigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import { authSelectors } from 'redux/auth';

interface IAuthRoute {
  children: JSX.Element;
  redirectPath: string;
}

const AuthRoute = ({ children, redirectPath }: IAuthRoute): JSX.Element => {
  // const isLoggedIn = useSelector(authSelectors.getIsLoggedIn);
  const isLoggedIn = true;
  return isLoggedIn ? children : <Navigate to={redirectPath} replace={true} />;
};

export default AuthRoute;
