import { StyledButton } from "./IconBtn.styled";

interface Props {
  onClick(): void;
  iconComponent: JSX.Element;
  disabled?: boolean;
  style?: React.CSSProperties;
}

const IconBtn = ({ onClick, iconComponent, disabled, style }: Props) => {
  return (
    <StyledButton
      type="button"
      onClick={onClick}
      disabled={disabled}
      style={style}
    >
      {iconComponent}
    </StyledButton>
  );
};

export default IconBtn;
