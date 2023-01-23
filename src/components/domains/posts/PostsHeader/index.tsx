import { IMentoringSortOptions, IPostsSortOptions } from 'types/sort.types';
import { PostsFilter } from '../PostsFilter';
import classes from './index.module.scss';

interface IProps {
  options: IMentoringSortOptions | IPostsSortOptions;
}
export const PostsHeader = ({ options }: IProps) => {
  return (
    <div className={classes.postsHeaderContainer}>
      <div className={classes.postsFilterWrap}>
        <PostsFilter options={options} />
      </div>
    </div>
  );
};
