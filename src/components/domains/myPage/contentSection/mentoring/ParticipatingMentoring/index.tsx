import CardsSection from '@components/domains/myPage/common/CardsSection';
import DetailedMentoringMemberModal from '@components/domains/myPage/common/DetailedMentoringMemberModal';
import {
  useGetMentoringMembers,
  useGetParticipatingMentoringPosts,
} from '@hooks/query/useGetQuery';
import { useGetUserActivity } from '@hooks/useGetUserActivity';
import { useMemberModal } from '@hooks/useMemberModal';

const ParticipatingMentoring = () => {
  const { posts, members, setCurrentPostId } = useGetUserActivity(
    useGetParticipatingMentoringPosts,
    useGetMentoringMembers,
  );

  const { isOpenedModal, setIsOpenedModal, currentMember, onClickMemberCard } =
    useMemberModal();

  return (
    <>
      <CardsSection
        postSectionTitle="내가 수강 중인 멘토링"
        mentoringPosts={posts}
        memberSectionTitle="현재 멘토링 멤버"
        members={members}
        setCurrentPostId={setCurrentPostId}
        onClickMemberCard={onClickMemberCard}
      />
      <DetailedMentoringMemberModal
        title="멘티"
        subTitle="멘티 정보입니다."
        member={currentMember}
        isOpenedModal={isOpenedModal}
        setIsOpenedModal={setIsOpenedModal}
      />
    </>
  );
};

export default ParticipatingMentoring;
