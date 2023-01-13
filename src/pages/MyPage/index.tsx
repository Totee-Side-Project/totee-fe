import React, { useState } from 'react';
import './index.scss';
import SideBar from '@components/domains/myPage/sidebar';
import MyPageProfile from '@components/domains/myPage/components/common/MyPageProfile';
import { defaultFocusMenu } from '@components/domains/myPage/MyPageMenu';

const MyPage = () => {
  const [focusedMenu, setFocusedMenu] = useState<any>(defaultFocusMenu);

  return (
    <div className="myPage">
      <SideBar focusedMenu={focusedMenu} setFocusedMenu={setFocusedMenu} />
      <section className="myPageContentSection">
        <MyPageProfile />
        <section>{focusedMenu.component}</section>
      </section>
    </div>
  );
};

export default MyPage;
