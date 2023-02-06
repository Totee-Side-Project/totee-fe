import { useState } from 'react';

import SideBar from '@components/domains/myPage/common/Sidebar';
import { defaultFocusMenu } from '@components/domains/myPage/myPageMenu';
import { MentoApplicantTable } from '@components/domains/admin/MentoApplicantTable';
import classes from './index.module.scss';
import { IMento } from '@api/mentor/types';
import { MentoApplyAcceptModal } from '@components/domains/admin/MentoApplyAcceptModal';

const AdminPage = () => {
  const [focusedMenu, setFocusedMenu] = useState(defaultFocusMenu);
  const [isSelectedMento, setIsSelectedMento] = useState<IMento>();

  const handleSelectedMentoOnClick = (mento: IMento) => {
    setIsSelectedMento({ ...mento });
  };

  const clearIsSelectedMento = () => setIsSelectedMento(undefined);

  return (
    <div className={classes.adminPage}>
      <SideBar focusedMenu={focusedMenu} setFocusedMenu={setFocusedMenu} />
      <section className={classes.contentSection}>
        <div className={classes.tableContainer}>
          <h1 className={classes.pageTitle}>멘토 수락 대기</h1>
          <MentoApplicantTable onSelectClick={handleSelectedMentoOnClick} />
        </div>
        {isSelectedMento && (
          <MentoApplyAcceptModal
            mento={isSelectedMento}
            onResetClick={clearIsSelectedMento}
          />
        )}
      </section>
    </div>
  );
};

export default AdminPage;
