import React, { useState } from 'react';
import './index.scss';
import SideBar from '@components/domains/myPage/sidebar';
import UserProfile from '@components/domains/myPage/components/common/UserProfile';
import { defaultFocusMenu } from '@components/domains/myPage/MyPageMenu';

const MyPage = () => {
  const [focusedMenu, setFocusedMenu] = useState<any>(defaultFocusMenu);

  return (
    <div className="myPage">
      <SideBar focusedMenu={focusedMenu} setFocusedMenu={setFocusedMenu} />
      <section className="myPageContentSection">
        <UserProfile />
        {focusedMenu.component}
      </section>
    </div>
  );
};

export default MyPage;
