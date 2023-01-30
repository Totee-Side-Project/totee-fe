import StudyContentSection from '@components/domains/myPage/common/StudyContentSection';
import { useGetApplicant, useGetMyStudyPost } from '@hooks/query/useGetQuery';
import { useMemberModal } from '@hooks/useMemberModal';
import { useUserActivity } from '@hooks/useUserActivity';

const StudyApplicantConfirmation = () => {
  const { posts, members, currentPostId, setCurrentPostId } = useUserActivity(
    useGetMyStudyPost,
    useGetApplicant,
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
      postSectionTitle="내가 개설한 스터디의 지원자 확인"
      posts={posts}
      memberSectionTitle="스터디 지원자 목록"
      members={members}
      setCurrentPostId={setCurrentPostId}
      isOpenedModal={isOpenedModal}
      setIsOpenedModal={setIsOpenedModal}
      currentMember={currentMember}
      onClickMemberCard={onClickMemberCard}
    />
  );
};

export default StudyApplicantConfirmation;
