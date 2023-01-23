import { ReactNode } from 'react';

import { PostsHeader } from '@components/domains/posts/PostsHeader';
import { IMentoringSortOptions, IPostsSortOptions } from 'types/sort.types';
import classes from './index.module.scss';

interface IProps {
  children: ReactNode;
  options: IPostsSortOptions | IMentoringSortOptions;
}

export const PostsContainer = ({ children, options }: IProps) => {
  return (
    <div className={classes.postsContainer}>
      <PostsHeader options={options} />
      {children}
    </div>
  );
};
