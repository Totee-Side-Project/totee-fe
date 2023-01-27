import StudyContentSection from '@components/domains/myPage/common/StudyContentSection';
import { useGetPostLikeList } from '@hooks/query/useGetQuery';

const FavoriteStudyList = () => {
  return (
    <StudyContentSection
      postSectionTitle="내가 관심목록에 추가한 스터디"
      useGetPosts={useGetPostLikeList}
    />
  );
};

export default FavoriteStudyList;
