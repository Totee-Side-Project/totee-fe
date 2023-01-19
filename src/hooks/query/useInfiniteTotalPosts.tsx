import { useEffect } from 'react';
import { useInfiniteQuery } from 'react-query';
import { AxiosResponse } from 'axios';

import { IResponseOfPage } from 'types/api.types';
import { IGetPostListParams } from '@api/api.types';
import { useIntersectionObserver } from './useIntersectionObserver';

export type FetchPageFuntionType = (
  option: IGetPostListParams,
) => Promise<AxiosResponse<IResponseOfPage>>;

interface Props extends Omit<IGetPostListParams, 'page'> {
  getPage: FetchPageFuntionType;
  queryKey: unknown[];
}

export const useInfiniteTotalPosts = ({
  getPage,
  keyword,
  queryKey,
  size,
  sort,
}: Props) => {
  const getPageInfo = async ({ pageParam = 0 }) => {
    const postData = await getPage({
      page: pageParam,
      keyword,
      size,
      sort,
    }).then((response) => response.data.body.data);

    const nextPageParam = !postData.last ? pageParam + 1 : undefined;
    return {
      postData,
      nextPageParam,
      isLast: postData.last,
    };
  };

  const postsQuery = useInfiniteQuery({
    queryKey,
    queryFn: getPageInfo,
    getNextPageParam: (lastPage, pages) => lastPage.nextPageParam,
    refetchOnWindowFocus: false,
  });

  const TriggerComponent = () => {
    const { ref, observer } = useIntersectionObserver(
      postsQuery.fetchNextPage,
      { rootMargin: '0px 0px 20% 0px' },
    );

    useEffect(() => {
      if (!postsQuery.data) return;
      const lastPageParam = postsQuery.data.pages.length - 1;
      const isLast = postsQuery.data.pages[lastPageParam].isLast;

      if (isLast) {
        observer.disconnect();
      }
    }, [postsQuery.data?.pages]);

    return <div ref={ref} />;
  };

  return {
    query: postsQuery,
    TriggerComponent: TriggerComponent,
  };
};
