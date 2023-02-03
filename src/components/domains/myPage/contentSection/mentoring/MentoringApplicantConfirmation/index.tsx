import CardsSection from '@components/domains/myPage/common/CardsSection';
import DetailedMemberModal from '@components/domains/myPage/common/DetailedMemberModal';
import {
  useGetMentoringApplicants,
  useGetMyMentoringPosts,
} from '@hooks/query/useGetQuery';
import { useAcceptMentoringApplicants } from '@hooks/query/useMutateQuery';
import { useAcceptApplicants } from '@hooks/useAcceptApplicants';
import { useGetUserActivity } from '@hooks/useGetUserActivity';
import { useMemberModal } from '@hooks/useMemberModal';
import classes from '../../../common/DetailedMemberModal/index.module.scss';

const MentoringApplicantConfirmation = () => {
  const { posts, members, currentPostId, setCurrentPostId } =
    useGetUserActivity(useGetMyMentoringPosts, useGetMentoringApplicants);

  const { isOpenedModal, setIsOpenedModal, currentMember, onClickMemberCard } =
    useMemberModal();

  const { onClickAcceptButton } = useAcceptApplicants(
    useAcceptMentoringApplicants(currentPostId),
    setIsOpenedModal,
    currentMember ? currentMember.nickname : '',
  );

  return (
    <>
      <CardsSection
        postSectionTitle="내가 개설한 멘토링의 지원자 확인"
        mentoringPosts={posts}
        memberSectionTitle="멘토링 지원자 목록"
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

export default MentoringApplicantConfirmation;
