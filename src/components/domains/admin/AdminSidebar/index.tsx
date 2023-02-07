import { Link, useParams } from 'react-router-dom';
import classNames from 'classnames';

import OpenedBookIconSrc from '@assets/svg/book-open.svg';
import { ADMIN_MENTO_MENUS } from 'constants/adminPage';
import classes from './index.module.scss';

export const AdminSidebar = () => {
  const allParams = useParams();
  const menuParams = allParams['*'];

  return (
    <aside className={classes.sidebar}>
      <div>
        <div className={classes.mainMenu}>
          <img
            className={classes.mainMenuIcon}
            src={OpenedBookIconSrc}
            alt="openbook_icon"
          />
          <div className={classes.mainMenuTitle}>멘토 관리</div>
        </div>
        <nav>
          <ul className={classes.menuList}>
            {Object.values(ADMIN_MENTO_MENUS).map(({ to, title }) => (
              <li
                className={
                  to === menuParams
                    ? classNames([classes.menuItem, classes.focused])
                    : classes.menuItem
                }
                key={to}
              >
                <Link to={to} reloadDocument={false}>
                  {title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
};
