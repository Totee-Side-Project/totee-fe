import StudyContentSection from '@components/domains/myPage/common/StudyContentSection';
import {
  useGetMyStudyPost,
  useGetStudyMembers,
} from '@hooks/query/useGetQuery';
import { useMemberModal } from '@hooks/useMemberModal';
import { useUserActivity } from '@hooks/useUserActivity';

const OpenedStudyAdministration = () => {
  const { posts, members, currentPostId, setCurrentPostId } = useUserActivity(
    useGetMyStudyPost,
    useGetStudyMembers,
  );

  const { isOpenedModal, setIsOpenedModal, currentMember, onClickMemberCard } =
    useMemberModal();

  const onClickResignationButton = (currentPostId, currentMember) => {
    //console.log(currentPostId);
    //console.log(currentMember);
    console.log(111);
    //return;
  };

  return (
    <>
      <StudyContentSection
        postSectionTitle="내가 개설한 스터디"
        posts={posts}
        memberSectionTitle="현재 스터디 멤버"
        members={members}
        setCurrentPostId={setCurrentPostId}
        isOpenedModal={isOpenedModal}
        setIsOpenedModal={setIsOpenedModal}
        currentMember={currentMember}
        onClickMemberCard={onClickMemberCard}
      >
        <button onClick={onClickResignationButton}>추방하기</button>
      </StudyContentSection>
    </>
  );
};

export default OpenedStudyAdministration;
