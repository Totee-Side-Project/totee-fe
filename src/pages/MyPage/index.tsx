import React, { useState } from 'react';
import './index.scss';
import SideBar from '@components/domains/myPage/sidebar';
import MyPageProfile from '@components/domains/myPage/components/common/MyPageProfile';

const MyPage = () => {
  const [focusedMenuComponent, setFocusedMenuComponent] = useState<any>(null);

  return (
    <div className="myPage">
      <SideBar setFocusedMenuComponent={setFocusedMenuComponent} />
      <section className="myPageContentSection">
        <MyPageProfile />
        <section>{focusedMenuComponent}</section>
      </section>
    </div>
  );
};

export default MyPage;
