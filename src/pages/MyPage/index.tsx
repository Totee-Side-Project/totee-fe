import React, { useState } from 'react';
import './index.scss';

import SideBar from '@components/domains/myPage/sidebar';

const MyPage = () => {
  const [focusedMenuComponent, setFocusedMenuComponent] = useState<any>(null);

  return (
    <div className="myPage">
      <SideBar setFocusedMenuComponent={setFocusedMenuComponent} />
      <section>{focusedMenuComponent}</section>
    </div>
  );
};

export default MyPage;
