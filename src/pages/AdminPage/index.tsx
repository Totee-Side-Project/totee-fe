import { useState } from 'react';

import SideBar from '@components/domains/myPage/common/Sidebar';
import { defaultFocusMenu } from '@components/domains/myPage/myPageMenu';
import classes from './index.module.scss';
import { MentoApplyAcceptModal } from '@components/domains/admin/MentoApplyAcceptModal';
import { useGetMentoList } from '@hooks/query/useGetQuery';

const AdminPage = () => {
  const [focusedMenu, setFocusedMenu] = useState(defaultFocusMenu);
  const { data } = useGetMentoList({ kind: 'all', page: 0, size: 1 });

  return (
    <div className={classes.adminPage}>
      <SideBar focusedMenu={focusedMenu} setFocusedMenu={setFocusedMenu} />
      <section className={classes.contentSection}>
        <div className={classes.tableContainer}>asdsada</div>
        {data?.content && <MentoApplyAcceptModal mento={data?.content[0]} />}
        {/* <UserProfile /> */}
        {/* {focusedMenu.component} */}
      </section>
    </div>
  );
};

export default AdminPage;
