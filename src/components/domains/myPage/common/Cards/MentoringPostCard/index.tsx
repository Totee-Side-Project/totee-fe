import { useState } from 'react';
import Pagination from '../../Pagination';
import classes from './index.module.scss';
import profileCircle from '../../../../../../assets/svg/profile-circle.svg';
import { IMentoringPostsType } from 'types/posts.types';

interface IMentoringPostCardProps {
  mentoringPosts?: IMentoringPostsType;
  setCurrentPostId?: React.Dispatch<React.SetStateAction<number>>;
}

const MentoringPostCard = ({
  mentoringPosts,
  setCurrentPostId,
}: IMentoringPostCardProps) => {
  const [currentPage, setCurrentPage] = useState(1);

  if (!mentoringPosts || mentoringPosts?.content.length === 0) {
    return <></>;
  }

  return (
    <>
      <div className={classes.mentoringPostCards}>
        {mentoringPosts.content
          .slice((currentPage - 1) * 4, (currentPage - 1) * 4 + 4)
          .map((post) => (
            <div
              className={classes.mentoringPostCard}
              key={post.mentoringId}
              onClick={() =>
                setCurrentPostId && setCurrentPostId(post.mentoringId)
              }
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

export default MentoringPostCard;
