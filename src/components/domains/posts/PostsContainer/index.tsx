import { ReactNode } from 'react';

import { PostsHeader } from '@components/domains/posts/PostsHeader';
import { IMentoringSortOptions, IPostsSortOptions } from 'types/sort.types';
import classes from './index.module.scss';

export type CategoryTypes = 'study' | 'mentoring';
interface IProps {
  children: ReactNode;
  category?: CategoryTypes;
  options: IPostsSortOptions | IMentoringSortOptions;
}

export const PostsContainer = ({ children, category, options }: IProps) => {
  return (
    <div className={classes.postsContainer}>
      <PostsHeader options={options} category={category} />
      {children}
    </div>
  );
};
