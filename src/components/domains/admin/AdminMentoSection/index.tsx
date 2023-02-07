import { useState } from 'react';
import { Route, Routes, useSearchParams } from 'react-router-dom';

import { IMento } from '@api/mentor/types';
import { MentoApplicantTable } from '@components/domains/admin/AdminMentoSection/MentoApplicantTable';
import { MentoApplicantTableContainer } from '@components/domains/admin/AdminMentoSection/MentoApplicantTableContainer';
import { MentoApplicantTitle } from '@components/domains/admin/AdminMentoSection/MentoApplicantTitle';
import { MentoApplyAcceptModal } from '@components/domains/admin/MentoApplyAcceptModal';
import {
  ADMIN_MENTO_MENUS,
  MENTO_APPLICANTS_KINDS,
  MENTO_APPLICANTS_PAGE,
  MENTO_APPLICANTS_SIZE,
} from 'constants/adminPage';
import classes from './index.module.scss';

export const AdminMentoSection = () => {
  const [isSelectedMento, setIsSelectedMento] = useState<IMento>();
  const [searchParams, setSearchParams] = useSearchParams();
  const pageParam = Number(searchParams.get('page')) || 1;

  const handleSelectedMentoOnClick = (mento: IMento) => {
    setIsSelectedMento({ ...mento });
  };
  const clearIsSelectedMento = () => setIsSelectedMento(undefined);

  return (
    <section className={classes.contentSection}>
      <Routes>
        <Route
          path={MENTO_APPLICANTS_KINDS.pending}
          element={
            <MentoApplicantTableContainer>
              <MentoApplicantTitle title={ADMIN_MENTO_MENUS.pending.title} />
              <MentoApplicantTable
                onSelectClick={handleSelectedMentoOnClick}
                getMentoListParams={{
                  kind: MENTO_APPLICANTS_KINDS.pending,
                  size: MENTO_APPLICANTS_SIZE,
                  page: pageParam - 1,
                }}
              />
            </MentoApplicantTableContainer>
          }
        />
        <Route
          path={MENTO_APPLICANTS_KINDS.approved}
          element={
            <MentoApplicantTableContainer>
              <MentoApplicantTitle title={ADMIN_MENTO_MENUS.approved.title} />
              <MentoApplicantTable
                onSelectClick={handleSelectedMentoOnClick}
                getMentoListParams={{
                  kind: MENTO_APPLICANTS_KINDS.approved,
                  size: MENTO_APPLICANTS_SIZE,
                  page: pageParam - 1,
                }}
              />
            </MentoApplicantTableContainer>
          }
        />
      </Routes>
      {isSelectedMento && (
        <MentoApplyAcceptModal
          mento={isSelectedMento}
          onResetClick={clearIsSelectedMento}
        />
      )}
    </section>
  );
};
