import { Link, useParams } from 'react-router-dom';
import classNames from 'classnames';

import OpenedBookIconSrc from '@assets/svg/book-open.svg';
import { ADMIN_MENTO_MENUS } from 'constants/adminPage';
import { useFetchMentoList } from '@hooks/useGetMentoList';
import { Circle } from '@components/atoms';
import classes from './index.module.scss';

export const AdminSidebar = () => {
  const allParams = useParams();
  const menuParams = allParams['*'];
  const { pendingMentoQuery, approvedMentoQuery } = useFetchMentoList();
  const { data: pendingMentoData } = pendingMentoQuery;
  const { data: approvedMentoData } = approvedMentoQuery;

  const countes = {
    pending: pendingMentoData?.totalElements,
    approved: approvedMentoData?.totalElements,
  } as { [key: string]: number | undefined };

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
            {Object.entries(ADMIN_MENTO_MENUS).map(([key, { to, title }]) => (
              <li
                className={
                  to === menuParams
                    ? classNames([classes.menuItem, classes.focused])
                    : classes.menuItem
                }
                key={to}
              >
                <Link to={`${to}?page=1`}>
                  <Circle
                    selected={to === menuParams}
                    options={{
                      outCircle: false,
                    }}
                  />
                  {`${title} (${countes[key]})`}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
};
