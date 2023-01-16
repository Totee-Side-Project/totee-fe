import UserProfile from '@components/domains/myPage/common/UserProfile';
import { defaultFocusMenu } from '@components/domains/myPage/MyPageMenu';
import SideBar from '@components/domains/myPage/Sidebar';
import React, { useState } from 'react';
import './index.scss';

const MyPage = () => {
  const [focusedMenu, setFocusedMenu] = useState(defaultFocusMenu);

  return (
    <div className="myPage">
      <SideBar focusedMenu={focusedMenu} setFocusedMenu={setFocusedMenu} />
      <section className="contentSection">
        <UserProfile />
        {focusedMenu.component}
      </section>
    </div>
  );
};

export default MyPage;
