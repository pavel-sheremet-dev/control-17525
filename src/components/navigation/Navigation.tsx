import { NavLink } from 'react-router-dom';
import { IRouteDataObject } from 'routes/types';
import { StyledNavigation } from './Navigation.styled';

interface IProps {
  items: IRouteDataObject[];
  listStyles?: React.CSSProperties;
  navStyles?: React.CSSProperties;
  columnDirection?: boolean;
}

const Navigation = ({
  items,
  listStyles,
  navStyles,
  columnDirection = false,
}: IProps) => {
  return (
    <StyledNavigation style={navStyles} columnDirection={columnDirection}>
      <ul style={listStyles}>
        {items.map(navItem => (
          <li key={navItem.id}>
            <NavLink to={navItem.absolutePath}>{navItem.title}</NavLink>
          </li>
        ))}
      </ul>
    </StyledNavigation>
  );
};

export default Navigation;
