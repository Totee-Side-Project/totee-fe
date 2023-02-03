import DetailedMemberModal from '@components/domains/myPage/common/DetailedMemberModal';
import { useGetApplicant, useGetMyStudyPost } from '@hooks/query/useGetQuery';
import { usePostTeam } from '@hooks/query/useMutateQuery';
import { useMemberModal } from '@hooks/useMemberModal';
import { useGetUserActivity } from '@hooks/useGetUserActivity';
import classes from '../../../common/DetailedMemberModal/index.module.scss';
import CardsSection from '@components/domains/myPage/common/CardsSection';
import { useAcceptApplicants } from '@hooks/useAcceptApplicants';

const StudyApplicantConfirmation = () => {
  const { posts, members, currentPostId, setCurrentPostId } =
    useGetUserActivity(useGetMyStudyPost, useGetApplicant);

  const { isOpenedModal, setIsOpenedModal, currentMember, onClickMemberCard } =
    useMemberModal();

  const { onClickAcceptButton } = useAcceptApplicants(
    usePostTeam(currentPostId),
    setIsOpenedModal,
    currentMember ? currentMember.nickname : '',
  );

  return (
    <>
      <CardsSection
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
