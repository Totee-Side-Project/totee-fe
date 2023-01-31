import { PostCard } from '@components/common/post/PostCard/PostCard';
import { useState } from 'react';
import { IStudyPostsType } from 'types/posts.types';
import Pagination from '../../Pagination';
import classes from './index.module.scss';

interface IStudyPostCardsSectionProps {
  studyPosts?: IStudyPostsType;
  setCurrentPostId?: React.Dispatch<React.SetStateAction<number>>;
}

const StudyPostCardsSection = ({
  studyPosts,
  setCurrentPostId,
}: IStudyPostCardsSectionProps) => {
  const [currentPage, setCurrentPage] = useState(1);

  if (!studyPosts || studyPosts?.content.length === 0) {
    return <></>;
  }

  return (
    <>
      <div className={classes.postCard}>
        {studyPosts.content
          .slice((currentPage - 1) * 4, (currentPage - 1) * 4 + 4)
          .map((post) => (
            <PostCard
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
    </>
  );
};

export default StudyPostCardsSection;
