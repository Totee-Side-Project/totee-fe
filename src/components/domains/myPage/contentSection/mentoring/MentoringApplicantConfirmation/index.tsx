import { IMentoringMemberType } from '@api/team/types';
import ApplicantAcceptanceButton from '@components/domains/myPage/common/ApplicantAcceptanceButton';
import CardsSection from '@components/domains/myPage/common/CardsSection';
import DetailedMentoringMemberModal from '@components/domains/myPage/common/DetailedMentoringMemberModal';
import {
  useGetMentoringApplicants,
  useGetMyMentoringPosts,
} from '@hooks/query/useGetQuery';
import { useAcceptMentoringApplicants } from '@hooks/query/useMutateQuery';
import { useGetUserActivity } from '@hooks/useGetUserActivity';
import { useMemberModal } from '@hooks/useMemberModal';
import { useEffect } from 'react';

const MentoringApplicantConfirmation = () => {
  const { posts, members, currentPostId, setCurrentPostId } =
    useGetUserActivity(useGetMyMentoringPosts, useGetMentoringApplicants);

  const { isOpenedModal, setIsOpenedModal, currentMember, onClickMemberCard } =
    useMemberModal<IMentoringMemberType>();

  const { mutate, isSuccess } = useAcceptMentoringApplicants(currentPostId);

  const onClickAcceptButton = (isAccept: boolean) => {
    mutate({
      accept: isAccept,
      nickname: currentMember ? currentMember.nickname : '',
    });
  };

  useEffect(() => {
    if (isSuccess) {
      setIsOpenedModal(false);
    }
  }, [isSuccess]);

  return (
    <>
      <CardsSection
        postSectionTitle="내가 개설한 멘토링의 지원자 확인"
        mentoringPosts={posts}
        memberSectionTitle="멘토링 지원자 목록"
        members={members}
        setCurrentPostId={setCurrentPostId}
        onClickMentoringMemberCard={onClickMemberCard}
      />
      <DetailedMentoringMemberModal
        title="지원자 승인 요청 수락"
        subTitle="지원자의 승인여부를 결정해주세요."
        member={currentMember}
        isOpenedModal={isOpenedModal}
        setIsOpenedModal={setIsOpenedModal}
      >
        <ApplicantAcceptanceButton onClickAcceptButton={onClickAcceptButton} />
      </DetailedMentoringMemberModal>
    </>
  );
};

export default MentoringApplicantConfirmation;
