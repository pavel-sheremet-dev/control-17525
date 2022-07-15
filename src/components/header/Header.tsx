import MobileMenu from 'components/mobileMenu/MobileMenu';
import { useState, useContext } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import IconBtn from 'components/common/iconBtn/IconBtn';
import Navigation from 'components/navigation/Navigation';

import { routesConfig } from 'routes';
import ThemeSwitcher from 'components/themeSwitcher/ThemeSwitcher';
import Container from 'components/common/container/Container';
import { PositionContext } from 'context/positionContext';
import { getCssVariables } from 'styles/vars';
import { Format, PageFormatContext } from 'context/PageFormatContext';
import { timeout } from 'helpers/asyncHelpers';
import { NavLink } from 'react-router-dom';
import { HeaderStyled } from './Header.styled';

const defaulCssDelay = getCssVariables().delay;

const Header = () => {
  const [renderMenu, setRenderMenu] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const pageFormat = useContext(PageFormatContext);
  const { isRightHand } = useContext(PositionContext);

  const onOpen = (): void => {
    setRenderMenu(true);
    setShowMenu(true);
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleEscape);
  };

  const onClose = async (cssDelay: number = defaulCssDelay): Promise<void> => {
    setShowMenu(false);
    document.body.style.overflow = '';
    await timeout(cssDelay + 100);
    setRenderMenu(false);
  };

  const handleEscape = (e: KeyboardEvent) => {
    if (e.code !== 'Escape') return;
    onClose();
    window.removeEventListener('keydown', handleEscape);
  };

  const navItems = routesConfig.getRoutes(pageFormat);

  const isDesktop = pageFormat === Format.desktop;

  return (
    <HeaderStyled>
      <Container
        style={{
          display: 'flex',
          alignItems: 'center',
          paddingTop: '20px',
          paddingBottom: '20px',
        }}
      >
        {!isDesktop && !isRightHand && (
          <IconBtn
            onClick={onOpen}
            iconComponent={<GiHamburgerMenu />}
            disabled={renderMenu}
            style={{ marginRight: '15px' }}
          />
        )}
        <NavLink
          to={'/'}
          style={{ marginRight: '20px', fontSize: '14pt', fontWeight: 700 }}
        >
          LOGO
        </NavLink>
        <Navigation
          items={navItems}
          navStyles={{ marginLeft: 'auto', marginRight: '15px' }}
        />
        <ThemeSwitcher />
        {!isDesktop && renderMenu && (
          <MobileMenu onClose={onClose} showMenu={showMenu} />
        )}

        {!isDesktop && isRightHand && (
          <IconBtn
            onClick={onOpen}
            iconComponent={<GiHamburgerMenu />}
            disabled={renderMenu}
            style={{ marginLeft: '15px' }}
          />
        )}
      </Container>
    </HeaderStyled>
  );
};

export default Header;
