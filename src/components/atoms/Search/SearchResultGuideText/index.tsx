import classNames from 'classnames';
import { useParams } from 'react-router-dom';

import {
  useGetSearchMentoringList,
  useGetSearchPostList,
} from '@hooks/query/useGetQuery';
import { useGetPostsParams } from '@hooks/useGetPostsParams';
import { SEARCH_PAGE_SIZE } from '@hooks/useSearch';
import { POSTS_CATEGORY_PATHS } from 'pages/PostsPage';
import classes from './index.module.scss';

interface IProps {
  className?: string;
}

export const SearchResultGuideText = ({ className }: IProps) => {
  const { params, keywordParam } = useGetPostsParams({
    size: SEARCH_PAGE_SIZE,
  });
  const pageParams = useParams();
  const categoryParams = pageParams['*'] || POSTS_CATEGORY_PATHS.ALL;

  const { data: searchPostData } = useGetSearchPostList(params);
  const { data: searchMentoringData } = useGetSearchMentoringList(params);

  const totalElementsCount = {
    study: searchPostData?.totalElements || 0,
    mentoring: searchMentoringData?.totalElements || 0,
  } as { [key: string]: number };

  const combinedClassName = classNames(className, classes.resultGuideText);

  if (keywordParam) {
    const totalElementCount =
      categoryParams === POSTS_CATEGORY_PATHS.ALL
        ? totalElementsCount.study + totalElementsCount.mentoring
        : totalElementsCount[categoryParams];
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
