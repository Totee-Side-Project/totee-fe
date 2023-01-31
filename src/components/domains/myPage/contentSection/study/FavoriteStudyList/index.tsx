import Cards from '@components/domains/myPage/common/Cards';
import { useGetPostLikeList } from '@hooks/query/useGetQuery';

const FavoriteStudyList = () => {
  const { data: posts } = useGetPostLikeList();

  return (
    <Cards
      menu="스터디"
      postSectionTitle="내가 관심목록에 추가한 스터디"
      posts={posts}
    />
  );
};

export default FavoriteStudyList;
