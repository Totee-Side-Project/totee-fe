import ContentSection from '@components/domains/myPage/contentSection';
import SideBar from '@components/domains/myPage/common/Sidebar';
import { defaultFocusMenu } from '@components/domains/myPage/myPageMenu';
import { useState } from 'react';
import classes from './index.module.scss';

const MyPage = () => {
  const [focusedMenu, setFocusedMenu] = useState(defaultFocusMenu);

  return (
    <div className={classes.myPage}>
      <SideBar focusedMenu={focusedMenu} setFocusedMenu={setFocusedMenu} />
      <ContentSection focusedMenu={focusedMenu} />
    </div>
  );
};

export default MyPage;
