import { RoutesConfigObject } from "routes/types";
import { StyledNavigation } from "./Navigation.styled";

interface IProps {
  items: RoutesConfigObject;
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
        {Object.keys(items).map((navItem) => (
          <li key={items[navItem].id}>
            <a href="/">{items[navItem].title}</a>
          </li>
        ))}
      </ul>
    </StyledNavigation>
  );
};

export default Navigation;
