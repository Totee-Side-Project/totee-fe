import { useState } from 'react';
import profileCircle from '@assets/svg/profile-circle.svg';
import { IMentoringPost, IMentoringPostsType } from '@api/mentoring/types';
import Pagination from '../../Pagination';
import classes from './index.module.scss';

interface IMentoringPostCardsSectionProps {
  postSectionTitle?: string;
  mentoringPosts?: IMentoringPostsType;
  setCurrentPostId?: React.Dispatch<React.SetStateAction<number>>;
  onClickFavoriteMentoringPostCard?: (post: IMentoringPost) => void;
}

const MentoringPostCardsSection = ({
  postSectionTitle,
  mentoringPosts,
  setCurrentPostId,
  onClickFavoriteMentoringPostCard,
}: IMentoringPostCardsSectionProps) => {
  const [currentPage, setCurrentPage] = useState(1);

  if (!mentoringPosts || mentoringPosts?.content.length === 0) {
    return <></>;
  }

  const onClickMentoringPostCard = (post: IMentoringPost) => {
    if (postSectionTitle === '내가 관심목록에 추가한 멘토링') {
      onClickFavoriteMentoringPostCard &&
        onClickFavoriteMentoringPostCard(post);
    }
    setCurrentPostId && setCurrentPostId(post.mentoringId);
  };

  return (
    <>
      <div className={classes.mentoringPostCards}>
        {mentoringPosts.content
          .slice((currentPage - 1) * 4, (currentPage - 1) * 4 + 4)
          .map((post) => (
            <div
              className={classes.mentoringPostCard}
              key={post.mentoringId}
              onClick={() => onClickMentoringPostCard(post)}
            >
              <p className={classes.title}>{post.title}</p>
              <p className={classes.field}>
                <span className={classes.fieldTitle}>분야</span>
                <span>{post.field}</span>
              </p>
              <p className={classes.career}>
                <span className={classes.careerTitle}>경력</span>
                <span>{post.career}</span>
              </p>
              <hr />
              <p className={classes.content}>{post.content}</p>
              <div className={classes.bottomSection}>
                <img
                  className={classes.profileImageUrl}
                  src={
                    post.profileImageUrl ? post.profileImageUrl : profileCircle
                  }
                  alt={
                    post.profileImageUrl
                      ? '사용자 프로필 사진'
                      : '기본 프로필 사진'
                  }
                />
                <p className={classes.nickname}>{post.nickname}</p>
              </div>
            </div>
          ))}
      </div>
      <Pagination
        postsLength={mentoringPosts.totalElements}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
};

export default MentoringPostCardsSection;
