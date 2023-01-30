import StudyCards from '@components/domains/myPage/common/StudyCards';
import { useGetPostLikeList } from '@hooks/query/useGetQuery';

const FavoriteStudyList = () => {
  const { data: posts } = useGetPostLikeList();

  return (
    <StudyCards
      postSectionTitle="내가 관심목록에 추가한 스터디"
      posts={posts}
    />
  );
};

export default FavoriteStudyList;
