import DetailedStudyMemberModal from '@components/domains/myPage/common/DetailedStudyMemberModal';
import { useGetApplicant, useGetMyStudyPosts } from '@hooks/query/useGetQuery';
import { usePostTeam } from '@hooks/query/useMutateQuery';
import { useMemberModal } from '@hooks/useMemberModal';
import { useGetUserActivity } from '@hooks/useGetUserActivity';
import CardsSection from '@components/domains/myPage/common/CardsSection';
import ApplicantAcceptanceButton from '@components/domains/myPage/common/ApplicantAcceptanceButton';
import { IStudyMemberType } from '@api/team/types';

const StudyApplicantConfirmation = () => {
  const { posts, members, currentPostId, setCurrentPostId } =
    useGetUserActivity(useGetMyStudyPosts, useGetApplicant);

  const { isOpenedModal, setIsOpenedModal, currentMember, onClickMemberCard } =
    useMemberModal<IStudyMemberType>();

  return (
    <>
      <CardsSection
        postSectionTitle="내가 개설한 스터디의 지원자 확인"
        studyPosts={posts}
        memberSectionTitle="스터디 지원자 목록"
        members={members}
        setCurrentPostId={setCurrentPostId}
        onClickStudyMemberCard={onClickMemberCard}
      />
      <DetailedStudyMemberModal
        title="지원자 승인 요청 수락"
        subTitle="지원자의 승인여부를 결정해주세요."
        member={currentMember}
        isOpenedModal={isOpenedModal}
        setIsOpenedModal={setIsOpenedModal}
      >
        <ApplicantAcceptanceButton
          currentPostId={currentPostId}
          setIsOpenedModal={setIsOpenedModal}
          currentMember={currentMember}
          useAccept={usePostTeam}
        />
      </DetailedStudyMemberModal>
    </>
  );
};

export default StudyApplicantConfirmation;
