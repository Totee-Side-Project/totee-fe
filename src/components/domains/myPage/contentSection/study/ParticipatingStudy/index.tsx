import DetailedStudyMemberModal from '@components/domains/myPage/common/DetailedStudyMemberModal';
import CardsSection from '@components/domains/myPage/common/CardsSection';
import {
  useGetParticipatingStudyPosts,
  useGetStudyMembers,
} from '@hooks/query/useGetQuery';
import { useMemberModal } from '@hooks/useMemberModal';
import { useGetUserActivity } from '@hooks/useGetUserActivity';
import { IStudyMemberType } from '@api/team/types';

const ParticipatingStudy = () => {
  const { posts, members, setCurrentPostId } = useGetUserActivity(
    useGetParticipatingStudyPosts,
    useGetStudyMembers,
  );

  const { isOpenedModal, setIsOpenedModal, currentMember, onClickMemberCard } =
    useMemberModal<IStudyMemberType>();

  return (
    <>
      <CardsSection
        postSectionTitle="참여 중인 스터디"
        studyPosts={posts}
        memberSectionTitle="현재 스터디 멤버"
        members={members}
        setCurrentPostId={setCurrentPostId}
        onClickStudyMemberCard={onClickMemberCard}
      />
      <DetailedStudyMemberModal
        title="스터디 멤버"
        subTitle="스터디 멤버와 자기 소개입니다."
        member={currentMember}
        isOpenedModal={isOpenedModal}
        setIsOpenedModal={setIsOpenedModal}
      />
    </>
  );
};

export default ParticipatingStudy;
