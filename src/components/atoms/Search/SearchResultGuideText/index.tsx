import { useGetSearchPostList } from '@hooks/query/useGetQuery';
import { useGetPostsSearchParams } from '@hooks/usePostsSearchParams';
import classes from './index.module.scss';

export const SearchResultGuideText = () => {
  const { keywordParam, pageParam, sortParam } = useGetPostsSearchParams();
  const { isLoading, data } = useGetSearchPostList({
    keyword: keywordParam,
    page: pageParam,
    sort: sortParam,
  });

  if (data?.content.length) {
    return (
      <div className={classes.resultGuideTextContainer}>
        <div className={classes.resultGuideText}>
          &quot;{<span className={classes.searchKeyword}>{keywordParam}</span>}
          &quot;에 대한 검색결과 {data?.totalElements}개
        </div>
      </div>
    );
  }

  return null;
};
