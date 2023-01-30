import StudyContentSection from '@components/domains/myPage/common/StudyContentSection';
import {
  useGetParticipatingStudyPost,
  useGetStudyMembers,
} from '@hooks/query/useGetQuery';
import { useMemberModal } from '@hooks/useMemberModal';
import { useUserActivity } from '@hooks/useUserActivity';

const ParticipatingStudy = () => {
  const { posts, members, currentPostId, setCurrentPostId } = useUserActivity(
    useGetParticipatingStudyPost,
    useGetStudyMembers,
  );

  const { isOpenedModal, setIsOpenedModal, currentMember, onClickMemberCard } =
    useMemberModal();

  const onClickResignationButton = () => {
    //console.log(currentPostId);
    //console.log(currentMember);
    return;
  };

  return (
    <StudyContentSection
      postSectionTitle="참여 중인 스터디"
      posts={posts}
      memberSectionTitle="현재 스터디 멤버"
      members={members}
      setCurrentPostId={setCurrentPostId}
      isOpenedModal={isOpenedModal}
      setIsOpenedModal={setIsOpenedModal}
      currentMember={currentMember}
      onClickMemberCard={onClickMemberCard}
    />
  );
};

export default ParticipatingStudy;
