import { NavLink } from 'react-router-dom';
import { IRouteDataObject } from 'routes/types';
import { Box } from './RedirectBox.styled';

interface IProps {
  className?: string;
  redirectRoute: IRouteDataObject;
  text?: string;
}

const RedirectBox = ({ className, redirectRoute, text }: IProps) => {
  return (
    <Box className={className}>
      {text && (
        <p className="is-register">
          {text}
          {'\u00A0'}
        </p>
      )}
      <NavLink className={'signin'} to={redirectRoute.path}>
        {redirectRoute.title.toUpperCase()}
      </NavLink>
    </Box>
  );
};

export default RedirectBox;
