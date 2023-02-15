import { StudyPostsType } from '@api/post/types';
import { PostCard } from '@components/common/post/PostCard/PostCard';
import { useState } from 'react';
import Pagination from '../../Pagination';
import classes from './index.module.scss';

interface IStudyPostCardsSectionProps {
  postSectionTitle?: string;
  studyPosts?: StudyPostsType;
  setCurrentPostId?: React.Dispatch<React.SetStateAction<number>>;
  cardUnit: number;
}

const StudyPostCardsSection = ({
  postSectionTitle,
  studyPosts,
  setCurrentPostId,
  cardUnit,
}: IStudyPostCardsSectionProps) => {
  const [currentPage, setCurrentPage] = useState(1);

  if (!studyPosts || studyPosts?.content.length === 0) {
    return <></>;
  }

  return (
    <div className={classes.studyPostCardsSection}>
      <div className={classes.postCard}>
        {studyPosts.content
          .slice(
            (currentPage - 1) * cardUnit,
            (currentPage - 1) * cardUnit + cardUnit,
          )
          .map((post) => (
            <PostCard
              postSectionTitle={postSectionTitle}
              post={post}
              styles={{ width: '230px', height: '250px' }}
              key={post.postId}
              setCurrentPostId={setCurrentPostId}
            />
          ))}
      </div>
      <Pagination
        postsLength={studyPosts.totalElements}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default StudyPostCardsSection;
