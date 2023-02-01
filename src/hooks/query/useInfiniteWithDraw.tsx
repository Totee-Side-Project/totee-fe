import { useEffect } from 'react';
import { useInfiniteQuery } from 'react-query';
import type { AxiosResponse } from 'axios';

import type {
  IGetPostListParams,
  IPostsInfiniteScrollOptions,
  MentoringResponseData,
  StudyPostsResponseData,
} from '@api/post/types';
import { useIntersectionObserver } from './useIntersectionObserver';

export type FetchPageFuntionType = (
  options: IGetPostListParams,
) => Promise<AxiosResponse<MentoringResponseData | StudyPostsResponseData>>;

export type FetchPageQueryKey = ReturnType<GetFetchPageQueryKeyFuntion>;
export type GetFetchPageQueryKeyFuntion = (
  options: IPostsInfiniteScrollOptions,
) => (string | IPostsInfiniteScrollOptions)[];

interface Props {
  getPage: FetchPageFuntionType;
  queryKey: FetchPageQueryKey;
  params: Omit<IGetPostListParams, 'page'>;
}

export const useInfiniteTotalPosts = ({ getPage, queryKey, params }: Props) => {
  const getPageInfo = async ({ pageParam = 0 }) => {
    const postData = await getPage({
      ...params,
      page: pageParam,
    }).then((response) => response.data.body.data);

    return {
      postData,
      isLast: postData.last,
    };
  };

  const postsQuery = useInfiniteQuery({
    queryKey,
    queryFn: getPageInfo,
    getNextPageParam: (lastPage, pages) => {
      const nextPageParam = !lastPage.postData.last
        ? pages.length + 1
        : undefined;
      return nextPageParam;
    },
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
