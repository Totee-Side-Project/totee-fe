import { myPageMenu } from '../MyPageMenu';
import './index.scss';

const SideBar = ({ setFocusedMenuComponent }: any) => {
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
            <button
              className="subMenuButton"
              key={subMenu.title}
              onClick={() => setFocusedMenuComponent(subMenu.component)}
            >
              <span className="subMenuTitle">{subMenu.title}</span>
            </button>
          ))}
        </section>
      ))}
    </aside>
  );
};

export default SideBar;
