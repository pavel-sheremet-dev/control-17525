import { StyledSwitch } from "./Switch.styled";

interface IProps {
  width?: number;
  title: string;
  onClick(value: boolean): void;
  checked: boolean;
}

const Switch = ({ width = 50, title, onClick, checked }: IProps) => {
  const handleClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    onClick(e.target.checked);
  };

  return (
    <StyledSwitch className="custom-checkbox" width={width}>
      {title && <p>{title}</p>}
      <div>
        <input
          onChange={handleClick}
          defaultChecked={checked}
          className="isHidden"
          type="checkbox"
          name="switcher"
          value="true"
          required
        ></input>
        <div className="switchHolder">
          <div className="switcher"></div>
        </div>
      </div>
    </StyledSwitch>
  );
};

export default Switch;
