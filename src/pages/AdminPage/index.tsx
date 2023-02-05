import { useState } from 'react';

import SideBar from '@components/domains/myPage/common/Sidebar';
import { defaultFocusMenu } from '@components/domains/myPage/myPageMenu';
import { MentoApplicantTable } from '@components/domains/admin/MentoApplicantTable';
// import { useGetMentoList } from '@hooks/query/useGetQuery';
// import { MentoApplyAcceptModal } from '@components/domains/admin/MentoApplyAcceptModal';
import classes from './index.module.scss';

const AdminPage = () => {
  const [focusedMenu, setFocusedMenu] = useState(defaultFocusMenu);
  // const { data } = useGetMentoList({ kind: 'all', page: 0, size: 1 });

  return (
    <div className={classes.adminPage}>
      <SideBar focusedMenu={focusedMenu} setFocusedMenu={setFocusedMenu} />
      <section className={classes.contentSection}>
        <div className={classes.tableContainer}>
          <h1 className={classes.pageTitle}>멘토 수락 대기</h1>
          <MentoApplicantTable />
        </div>
        {/* {data?.content && <MentoApplyAcceptModal mento={data?.content[0]} />} */}
      </section>
    </div>
  );
};

export default AdminPage;
