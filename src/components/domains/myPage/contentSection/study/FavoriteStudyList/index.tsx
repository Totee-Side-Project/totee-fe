import Cards from '@components/domains/myPage/common/Cards';
import { useGetPostLikeList } from '@hooks/query/useGetQuery';

const FavoriteStudyList = () => {
  const { data: posts } = useGetPostLikeList();

  return (
    <Cards
      postSectionTitle="내가 관심목록에 추가한 스터디"
      studyPosts={posts}
    />
  );
};

export default FavoriteStudyList;
