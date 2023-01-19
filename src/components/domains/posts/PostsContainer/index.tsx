import { ReactNode } from 'react';

import { PostsHeader } from '@components/domains/posts/PostsHeader';
import classes from './index.module.scss';

interface IProps {
  children: ReactNode;
}

export const PostsContainer = ({ children }: IProps) => {
  return (
    <div className={classes.postsContainer}>
      <PostsHeader />
      {children}
    </div>
  );
};
