import CardsSection from '@components/domains/myPage/common/CardsSection';
import { useGetLikedMentoringPosts } from '@hooks/query/useGetQuery';

const FavoriteMentoringList = () => {
  const { data: posts } = useGetLikedMentoringPosts();

  return (
    <CardsSection
      postSectionTitle="내가 관심목록에 추가한 멘토링"
      mentoringPosts={posts}
    />
  );
};

export default FavoriteMentoringList;
