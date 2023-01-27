import StudyContentSection from '@components/domains/myPage/common/StudyContentSection';
import {
  useGetMyStudyPost,
  useGetStudyMembers,
} from '@hooks/query/useGetQuery';

const OpenedStudyAdministration = () => {
  return (
    <StudyContentSection
      postSectionTitle="내가 개설한 스터디"
      useGetPosts={useGetMyStudyPost}
      memberSectionTitle="현재 스터디 멤버"
      useGetMembers={useGetStudyMembers}
    />
  );
};

export default OpenedStudyAdministration;
