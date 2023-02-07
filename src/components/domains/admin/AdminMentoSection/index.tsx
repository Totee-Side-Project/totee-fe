import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import { IMento } from '@api/mentor/types';
import { MentoApplicantTable } from '@components/domains/admin/AdminMentoSection/MentoApplicantTable';
import { MentoApplicantTableContainer } from '@components/domains/admin/AdminMentoSection/MentoApplicantTableContainer';
import { MentoApplicantTitle } from '@components/domains/admin/AdminMentoSection/MentoApplicantTitle';
import { MentoApplyAcceptModal } from '@components/domains/admin/MentoApplyAcceptModal';
import { Pagination } from '@components/common/pagination/Pagination';

import { AdminGuideMessage } from '@components/domains/admin/AdminGuideMessage';
import { useFetchMentoList } from '@hooks/useGetMentoList';
import { useMentoPagination } from '@hooks/useMentoPagination';
import { ADMIN_MENTO_MENUS, MENTO_APPLICANTS_KINDS } from 'constants/adminPage';
import classes from './index.module.scss';

export const AdminMentoSection = () => {
  const [isSelectedMento, setIsSelectedMento] = useState<IMento>();
  const { currentPage, setCurrentPage, slideNum, setSlideNum } =
    useMentoPagination();

  const { pendingMentoQuery, approvedMentoQuery } = useFetchMentoList();
  const { data: pendingMentoData, isLoading: pendingMentoIsLoading } =
    pendingMentoQuery;
  const { data: approvedMentoData, isLoading: approvedMentoIsLoading } =
    approvedMentoQuery;

  const handleSelectedMentoOnClick = (mento: IMento) => {
    setIsSelectedMento({ ...mento });
  };
  const clearIsSelectedMento = () => setIsSelectedMento(undefined);

  if (pendingMentoIsLoading || approvedMentoIsLoading) {
    return (
      <section className={classes.contentSection}>
        <MentoApplicantTableContainer>
          {
            // TODO: loading 처리를 좀더 우아하게 해야한다.
          }
          <div>loading</div>
        </MentoApplicantTableContainer>
      </section>
    );
  }
  return (
    <section className={classes.contentSection}>
      <Routes>
        <Route
          path={MENTO_APPLICANTS_KINDS.pending}
          element={
            <MentoApplicantTableContainer>
              <MentoApplicantTitle title={ADMIN_MENTO_MENUS.pending.title} />
              {pendingMentoData?.content.length ? (
                <>
                  <MentoApplicantTable
                    onSelectClick={handleSelectedMentoOnClick}
                    data={pendingMentoData}
                  />
                  <div className={classes.paginationWrap}>
                    <Pagination
                      currentPage={currentPage}
                      totalPageNum={pendingMentoData.totalPages}
                      limitPageNum={4}
                      setCurrentPage={setCurrentPage}
                      slideNum={slideNum}
                      setSlideNum={setSlideNum}
                    />
                  </div>
                </>
              ) : (
                <AdminGuideMessage guideMessage="수락 대기중인 유저가 없어요." />
              )}
            </MentoApplicantTableContainer>
          }
        />
        <Route
          path={MENTO_APPLICANTS_KINDS.approved}
          element={
            <MentoApplicantTableContainer>
              <MentoApplicantTitle title={ADMIN_MENTO_MENUS.approved.title} />
              {approvedMentoData?.content.length ? (
                <>
                  <MentoApplicantTable
                    onSelectClick={handleSelectedMentoOnClick}
                    data={approvedMentoData}
                  />
                  <div className={classes.paginationWrap}>
                    <Pagination
                      currentPage={currentPage}
                      totalPageNum={approvedMentoData.totalPages}
                      limitPageNum={4}
                      setCurrentPage={setCurrentPage}
                      slideNum={slideNum}
                      setSlideNum={setSlideNum}
                    />
                  </div>
                </>
              ) : (
                <AdminGuideMessage guideMessage="승인된 멘토가 존재하지 않아요." />
              )}
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
