import { useEffect } from 'react';
import { useInfiniteQuery } from 'react-query';
import { AxiosResponse } from 'axios';

import { IResponseOfPage } from 'types/api.types';
import { useIntersectionObserver } from './useIntersectionObserver';
import { GetPostListParams } from '@api/api.types';

// import GetPostListParams from
export type FetchPageFuntionType = ({
  page,
  title,
  size,
  sortOptions,
}: GetPostListParams) => Promise<AxiosResponse<IResponseOfPage>>;

interface Props {
  getPage: FetchPageFuntionType;
  queryKey: string[];
  pageSize?: number; // 몇개씩 불러올 것인지
  sortOptions?: string;
  title?: string;
}

export const useInfiniteTotalPosts = ({
  getPage,
  title = '',
  queryKey,
  pageSize = 4,
  sortOptions,
}: Props) => {
  const getPageInfo = async ({ pageParam = 0 }) => {
    const postData = await getPage({
      page: pageParam,
      title,
      size: pageSize,
      sortOptions,
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

  useEffect(() => {
    postsQuery.refetch();
  }, [sortOptions]);

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
