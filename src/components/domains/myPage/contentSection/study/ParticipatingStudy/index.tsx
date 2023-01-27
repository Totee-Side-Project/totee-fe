import StudyContentSection from '@components/domains/myPage/common/StudyContentSection';
import {
  useGetParticipatingStudyPost,
  useGetStudyMembers,
} from '@hooks/query/useGetQuery';

const ParticipatingStudy = () => {
  return (
    <StudyContentSection
      postSectionTitle="참여 중인 스터디"
      useGetPosts={useGetParticipatingStudyPost}
      memberSectionTitle="현재 스터디 멤버"
      useGetMembers={useGetStudyMembers}
    />
  );
};

export default ParticipatingStudy;
