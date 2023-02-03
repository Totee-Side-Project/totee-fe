import CardsSection from '@components/domains/myPage/common/CardsSection';
import DetailedMentoringMemberModal from '@components/domains/myPage/common/DetailedMentoringMemberModal';
import {
  useGetMentoringMembers,
  useGetMyMentoringPosts,
} from '@hooks/query/useGetQuery';
import { useGetUserActivity } from '@hooks/useGetUserActivity';
import { useMemberModal } from '@hooks/useMemberModal';

const OpenedMentoringAdminsitration = () => {
  const { posts, members, setCurrentPostId } = useGetUserActivity(
    useGetMyMentoringPosts,
    useGetMentoringMembers,
  );

  const { isOpenedModal, setIsOpenedModal, currentMember, onClickMemberCard } =
    useMemberModal();

  return (
    <>
      <CardsSection
        postSectionTitle="내가 개설한 멘토링"
        mentoringPosts={posts}
        memberSectionTitle="나의 멘티 목록"
        members={members}
        setCurrentPostId={setCurrentPostId}
        onClickMemberCard={onClickMemberCard}
      />
      <DetailedMentoringMemberModal
        title="멘토링"
        subTitle="멘티의 정보입니다."
        member={currentMember}
        isOpenedModal={isOpenedModal}
        setIsOpenedModal={setIsOpenedModal}
      />
    </>
  );
};

export default OpenedMentoringAdminsitration;
