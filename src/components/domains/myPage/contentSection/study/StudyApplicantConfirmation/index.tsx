import DetailedMemberModal from '@components/domains/myPage/common/DetailedMemberModal';

import { useGetApplicant, useGetMyStudyPost } from '@hooks/query/useGetQuery';
import { usePostTeam } from '@hooks/query/useMutateQuery';
import { useMemberModal } from '@hooks/useMemberModal';
import { useGetUserActivity } from '@hooks/useGetUserActivity';
import { useEffect } from 'react';
import classes from '../../../common/DetailedMemberModal/index.module.scss';
import Cards from '@components/domains/myPage/common/Cards';

const StudyApplicantConfirmation = () => {
  const { posts, members, currentPostId, setCurrentPostId } =
    useGetUserActivity(useGetMyStudyPost, useGetApplicant);

  const { isOpenedModal, setIsOpenedModal, currentMember, onClickMemberCard } =
    useMemberModal();

  const {
    mutate: acceptStudyApplicant,
    isSuccess: isSuccessStudyApplicantAcceptance,
  } = usePostTeam(currentPostId);

  const onClickAcceptButton = (isAccept: boolean) => {
    acceptStudyApplicant({
      accept: isAccept,
      nickname: currentMember ? currentMember.nickname : '',
    });
  };

  useEffect(() => {
    setIsOpenedModal(false);
  }, [isSuccessStudyApplicantAcceptance]);

  return (
    <>
      <Cards
        postSectionTitle="내가 개설한 스터디의 지원자 확인"
        studyPosts={posts}
        memberSectionTitle="스터디 지원자 목록"
        members={members}
        setCurrentPostId={setCurrentPostId}
        onClickMemberCard={onClickMemberCard}
      />
      <DetailedMemberModal
        title="지원자 승인 요청 수락"
        subTitle="지원자의 승인여부를 결정해주세요."
        member={currentMember}
        isOpenedModal={isOpenedModal}
        setIsOpenedModal={setIsOpenedModal}
      >
        <div className={classes.applicantConfirmationButton}>
          <button
            className={classes.rejectButton}
            onClick={() => onClickAcceptButton(false)}
          >
            승인 거부
          </button>
          <button
            className={classes.acceptButton}
            onClick={() => onClickAcceptButton(true)}
          >
            승인 허용
          </button>
        </div>
      </DetailedMemberModal>
    </>
  );
};

export default StudyApplicantConfirmation;
