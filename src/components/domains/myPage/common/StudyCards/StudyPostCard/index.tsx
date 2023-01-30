import { PostCard } from '@components/common/post/PostCard/PostCard';
import { useState } from 'react';
import { IPostsType } from 'types/posts.types';
import Pagination from '../../Pagination';
import classes from './index.module.scss';

interface IStudyPostCardProps {
  posts: IPostsType;
  setCurrentPostId?: React.Dispatch<React.SetStateAction<number>>;
}

const StudyPostCard = ({ posts, setCurrentPostId }: IStudyPostCardProps) => {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <>
      <div className={classes.postCard}>
        {posts?.content
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
        postsLength={posts.totalElements}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
};

export default StudyPostCard;
