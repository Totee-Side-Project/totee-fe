import { IMentoringPost } from '@api/mentoring/types';
import MentoringPostDetailModal from '@components/common/mentoring/MentoringPostDetailModal';
import CardsSection from '@components/domains/myPage/common/CardsSection';
import { useGetLikedMentoringPosts } from '@hooks/query/useGetQuery';
import { useState } from 'react';

const FavoriteMentoringList = () => {
  const { data: posts } = useGetLikedMentoringPosts();

  const [currentPost, setCurrentPost] = useState<IMentoringPost>();
  const [
    isOpenedMentoringPostDetailModal,
    setIsOpenedMentoringPostDetailModal,
  ] = useState(false);

  const onClickFavoriteMentoringPostCard = (post: IMentoringPost) => {
    setIsOpenedMentoringPostDetailModal(true);
    setCurrentPost(post);
  };

  return (
    <>
      <CardsSection
        postSectionTitle="내가 관심목록에 추가한 멘토링"
        mentoringPosts={posts}
        onClickFavoriteMentoringPostCard={onClickFavoriteMentoringPostCard}
      />
      {isOpenedMentoringPostDetailModal && (
        <MentoringPostDetailModal
          mentoring={currentPost}
          onCloseClick={() => setIsOpenedMentoringPostDetailModal(false)}
        />
      )}
    </>
  );
};

export default FavoriteMentoringList;
