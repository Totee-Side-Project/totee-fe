import { CategoryTypes } from '@components/domains/posts/PostsContainer';
import { IMentoringSortOptions, IPostsSortOptions } from 'types/sort.types';
import { PostsFilter } from '../PostsFilter';
import classes from './index.module.scss';

interface IProps {
  options: IMentoringSortOptions | IPostsSortOptions;
  category?: CategoryTypes;
}
export const PostsHeader = ({ options, category }: IProps) => {
  return (
    <div className={classes.postsHeaderContainer}>
      <div className={classes.postsFilterWrap}>
        <PostsFilter options={options} category={category} />
      </div>
    </div>
  );
};
