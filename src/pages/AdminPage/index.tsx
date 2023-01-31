import { useState } from 'react';

import { defaultFocusMenu } from '@components/domains/myPage/MyPageMenu';
import SideBar from '@components/domains/myPage/Sidebar/Sidebar';
import classes from './index.module.scss';

const AdminPage = () => {
  const [focusedMenu, setFocusedMenu] = useState(defaultFocusMenu);

  return (
    <div className={classes.adminPage}>
      <SideBar focusedMenu={focusedMenu} setFocusedMenu={setFocusedMenu} />
      <section className={classes.contentSection}>
        <div className={classes.tableContainer}>asdsada</div>
        {/* <UserProfile /> */}
        {/* {focusedMenu.component} */}
      </section>
    </div>
  );
};

export default AdminPage;
