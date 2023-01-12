import { myPageMenu } from '../MyPageMenu';
import './index.scss';

const SideBar = ({ setFocusedMenuComponent }: any) => {
  return (
    <aside className="sidebar">
      {myPageMenu.map((menu) => (
        <ol className="menu" key={menu.title}>
          <div className="title">{menu.title}</div>
          {menu.subMenu.map((subMenu) => (
            <li className="subTitle" key={subMenu.title}>
              <button
                onClick={() => setFocusedMenuComponent(subMenu.component)}
              >
                {subMenu.title}
              </button>
            </li>
          ))}
        </ol>
      ))}
    </aside>
  );
};

export default SideBar;
