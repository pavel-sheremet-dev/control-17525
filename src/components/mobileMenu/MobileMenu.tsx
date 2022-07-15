import IconBtn from 'components/common/iconBtn/IconBtn';
import { useState, useEffect, useContext } from 'react';
import { StyledMobileMenu } from './MobileMenu.styled';
import Navigation from 'components/navigation/Navigation';
import { routesConfig } from 'routes';
import { CgClose } from 'react-icons/cg';
import Switch from 'components/swith/Switch';
import { PositionContext } from 'context/positionContext';
import { ThemeContext } from 'context/themeContext';

interface Iprops {
  onClose(cssDelay?: number): Promise<void>;
  showMenu: boolean;
}

const MobileMenu = ({ onClose, showMenu }: Iprops) => {
  const [isOpen, setIsOpen] = useState(false);
  const { isRightHand, toggleHand } = useContext(PositionContext);
  const { theme, changeTheme } = useContext(ThemeContext);

  useEffect(() => {
    setIsOpen(showMenu);
  }, [showMenu]);

  return (
    <StyledMobileMenu isRightHand={isRightHand} isOpen={isOpen}>
      <div className="box">
        <IconBtn
          onClick={() => onClose()}
          iconComponent={<CgClose />}
          disabled={!isOpen}
        />
        <Navigation items={routesConfig.routes} columnDirection />
        <Switch
          title={'Right hand'}
          onClick={toggleHand}
          checked={isRightHand}
        />
        <Switch
          title={'Dark theme'}
          onClick={changeTheme}
          checked={theme === 'dark'}
        />
      </div>
      <div className="backdrop" onClick={() => onClose()} />
    </StyledMobileMenu>
  );
};

export default MobileMenu;
