import CardsSection from '@components/domains/myPage/common/CardsSection';
import { useGetLikedStudyPosts } from '@hooks/query/useGetQuery';

const FavoriteStudyList = () => {
  const { data: posts } = useGetLikedStudyPosts();

  return (
    <CardsSection
      postSectionTitle="내가 관심목록에 추가한 스터디"
      studyPosts={posts}
    />
  );
};

export default FavoriteStudyList;
