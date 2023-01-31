import Cards from '@components/domains/myPage/common/Cards';
import {
  useGetMentoringMembers,
  useGetMyMentoringPosts,
} from '@hooks/query/useGetQuery';
import { useGetUserActivity } from '@hooks/useGetUserActivity';
import { useMemberModal } from '@hooks/useMemberModal';
import classes from '../../index.module.scss';

const OpenedMentoringAdminsitration = () => {
  const { posts, members, currentPostId, setCurrentPostId } =
    useGetUserActivity(useGetMyMentoringPosts, useGetMentoringMembers);

  const { isOpenedModal, setIsOpenedModal, currentMember, onClickMemberCard } =
    useMemberModal();

  return (
    <>
      <Cards
        postSectionTitle="내가 개설한 멘토링"
        mentoringPosts={posts}
        memberSectionTitle="나의 멘티 목록"
        members={members}
        setCurrentPostId={setCurrentPostId}
        onClickMemberCard={onClickMemberCard}
      />
    </>
  );
};

export default OpenedMentoringAdminsitration;
