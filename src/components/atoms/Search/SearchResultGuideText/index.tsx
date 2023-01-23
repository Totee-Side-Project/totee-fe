import {
  useGetSearchMentoringList,
  useGetSearchPostList,
} from '@hooks/query/useGetQuery';
import { useGetPostsParams } from '@hooks/useGetPostsParams';
import { SEARCH_PAGE_SIZE } from '@hooks/useSearch';
import classNames from 'classnames';
import classes from './index.module.scss';

interface IProps {
  className?: string;
}

export const SearchResultGuideText = ({ className }: IProps) => {
  const { params, keywordParam } = useGetPostsParams({
    size: SEARCH_PAGE_SIZE,
  });

  const { data: searchPostData } = useGetSearchPostList(params);
  const { data: searchMentoringData } = useGetSearchMentoringList(params);
  const combinedClassName = classNames(classes.resultGuideText, className);

  if (searchPostData?.content.length && searchMentoringData?.content.length) {
    const totalElementCount =
      searchPostData?.totalElements + searchMentoringData?.totalElements;
    return (
      <div className={classes.resultGuideTextContainer}>
        <div className={combinedClassName}>
          &quot;{<span className={classes.searchKeyword}>{keywordParam}</span>}
          &quot;에 대한 검색결과 {totalElementCount}개
        </div>
      </div>
    );
  }

  return null;
};
