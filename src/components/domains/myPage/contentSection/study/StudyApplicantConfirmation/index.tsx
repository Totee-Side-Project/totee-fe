import StudyContentSection from '@components/domains/myPage/common/StudyContentSection';
import { useGetMyStudyPost } from '@hooks/query/useGetQuery';

const StudyApplicantConfirmation = () => {
  return (
    <StudyContentSection
      postSectionTitle="내가 개설한 스터디의 지원자 확인"
      useGetPosts={useGetMyStudyPost}
      memberSectionTitle="스터디 지원자 목록"
    />
  );
};

export default StudyApplicantConfirmation;
