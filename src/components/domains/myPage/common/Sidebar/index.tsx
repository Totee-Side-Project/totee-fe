import { IDefaultFocusMenuType, myPageMenu } from '../../myPageMenu';
import React, { useState } from 'react';
import classes from './index.module.scss';
import { useMobileView } from '@hooks/useMobileView';
import ArrowIcon from '../../../../../assets/svg/up-icon.svg';

interface ISideBarProps {
  focusedMenu: IDefaultFocusMenuType;
  setFocusedMenu: React.Dispatch<React.SetStateAction<IDefaultFocusMenuType>>;
}
const SideBar = ({ focusedMenu, setFocusedMenu }: ISideBarProps) => {
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
  const [currentMainMenu, setCurrentMainMenu] = useState('');
  const isCurrentIPadWidth = useMobileView(425);

  const toggleSubMenu = (mainMenuTitle: string) => {
    if (!isCurrentIPadWidth) {
      return;
    }

    if (mainMenuTitle === currentMainMenu) {
      setIsSubMenuOpen((prevState) => !prevState);
      return;
    }
    setIsSubMenuOpen(true);
    setCurrentMainMenu(mainMenuTitle);
  };

  const renderSubMenus = (mainMenu, subMenus) => {
    return (
      <div className={classes.subMenuContainer}>
        {subMenus.map((subMenu) => (
          <div
            className={classes.subMenu}
            key={subMenu.title}
            onClick={() => {
              setFocusedMenu({
                mainMenuTitle: mainMenu.title,
                subMenuTitle: subMenu.title,
                component: subMenu.component,
              });
              setIsSubMenuOpen(false);
            }}
            style={{
              backgroundColor:
                mainMenu.title === focusedMenu.mainMenuTitle &&
                subMenu.title === focusedMenu.subMenuTitle
                  ? '#E0E0E0'
                  : '',
            }}
          >
            <span
              className={classes.subMenuShape}
              style={{
                backgroundColor:
                  mainMenu.title === focusedMenu.mainMenuTitle &&
                  subMenu.title === focusedMenu.subMenuTitle
                    ? '#568A35'
                    : '#A0AEC0',
              }}
            />
            <span className={classes.subMenuTitle}>{subMenu.title}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <aside className={classes.sidebar}>
      {myPageMenu.map(({ mainMenu, subMenus }) => (
        <section key={mainMenu.title}>
          <div
            className={classes.mainMenu}
            onClick={() => toggleSubMenu(mainMenu.title)}
          >
            <img
              className={classes.mainMenuIcon}
              src={mainMenu.iconSrc}
              alt={`${mainMenu.title} 메뉴`}
            />
            <span className={classes.mainMenuTitle}>{mainMenu.title}</span>
            {isCurrentIPadWidth && (
              <img
                className={classes.renderSubMenuIcon}
                src={ArrowIcon}
                alt="서브 메뉴 보기"
              />
            )}
          </div>
          {!isCurrentIPadWidth
            ? renderSubMenus(mainMenu, subMenus)
            : isSubMenuOpen &&
              currentMainMenu === mainMenu.title &&
              renderSubMenus(mainMenu, subMenus)}
        </section>
      ))}
    </aside>
  );
};

export default SideBar;
