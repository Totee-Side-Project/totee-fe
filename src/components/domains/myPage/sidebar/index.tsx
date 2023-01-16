import { IDefaultFocusMenuType, myPageMenu } from '../MyPageMenu';
import React from 'react';
import './index.scss';

interface ISideBarProps {
  focusedMenu: IDefaultFocusMenuType;
  setFocusedMenu: React.Dispatch<React.SetStateAction<IDefaultFocusMenuType>>;
}

const SideBar = ({ focusedMenu, setFocusedMenu }: ISideBarProps) => {
  return (
    <aside className="sidebar">
      {myPageMenu.map(({ mainMenu, subMenus }) => (
        <section key={mainMenu.title}>
          <div className="mainMenu">
            <img
              className="mainMenuIcon"
              src={mainMenu.iconSrc}
              alt={`${mainMenu.title} 메뉴`}
            />
            <span className="mainMenuTitle">{mainMenu.title}</span>
          </div>
          {subMenus.map((subMenu) => (
            <div
              className="subMenu"
              key={subMenu.title}
              onClick={() =>
                setFocusedMenu({
                  mainMenuTitle: mainMenu.title,
                  subMenuTitle: subMenu.title,
                  component: subMenu.component,
                })
              }
              style={{
                backgroundColor:
                  mainMenu.title === focusedMenu.mainMenuTitle &&
                  subMenu.title === focusedMenu.subMenuTitle
                    ? '#E0E0E0'
                    : '',
              }}
            >
              <span className="subMenuTitle">{subMenu.title}</span>
            </div>
          ))}
        </section>
      ))}
    </aside>
  );
};

export default SideBar;
