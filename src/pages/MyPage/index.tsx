import UserProfile from '@components/domains/myPage/common/UserProfile';
import { defaultFocusMenu } from '@components/domains/myPage/MyPageMenu';
import SideBar from '@components/domains/myPage/Sidebar/Sidebar';
import { useState } from 'react';
import classes from './index.module.scss';

const MyPage = () => {
  const [focusedMenu, setFocusedMenu] = useState(defaultFocusMenu);

  return (
    <div className={classes.myPage}>
      <SideBar focusedMenu={focusedMenu} setFocusedMenu={setFocusedMenu} />
      <section className={classes.contentSection}>
        <UserProfile />
        {focusedMenu.component}
      </section>
    </div>
  );
};

export default MyPage;
