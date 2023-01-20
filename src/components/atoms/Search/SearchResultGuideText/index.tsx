import { useGetSearchPostList } from '@hooks/query/useGetQuery';
import { useGetPostsSearchParams } from '@hooks/usePostsSearchParams';
import classNames from 'classnames';
import classes from './index.module.scss';

interface IProps {
  className?: string;
}
export const SearchResultGuideText = ({ className }: IProps) => {
  const { keywordParam, pageParam, sortParam } = useGetPostsSearchParams();
  const { data } = useGetSearchPostList({
    keyword: keywordParam,
    page: pageParam,
    sort: sortParam,
  });
  const combinedClassName = classNames(classes.resultGuideText, className);

  if (data?.content.length) {
    return (
      <div className={classes.resultGuideTextContainer}>
        <div className={combinedClassName}>
          &quot;{<span className={classes.searchKeyword}>{keywordParam}</span>}
          &quot;에 대한 검색결과 {data?.totalElements}개
        </div>
      </div>
    );
  }

  return null;
};
