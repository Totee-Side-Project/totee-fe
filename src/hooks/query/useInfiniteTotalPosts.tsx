import { useEffect } from 'react';
import { useInfiniteQuery } from 'react-query';
import { AxiosResponse } from 'axios';
import { useIntersectionObserver } from './useIntersectionObserver';
import { GetPostListParams, IResponseOfPage } from '@api/post/types';

// import GetPostListParams from
export type FetchPageFuntionType = (
  option: GetPostListParams,
) => Promise<AxiosResponse<IResponseOfPage>>;

interface Props {
  getPage: FetchPageFuntionType;
  queryKey: unknown[];
  size: number; // 몇개씩 불러올 것인지
  sortOption: string;
  keyword?: string;
}

export const useInfiniteTotalPosts = ({
  getPage,
  keyword = '',
  queryKey,
  size,
  sortOption,
}: Props) => {
  const getPageInfo = async ({ pageParam = 0 }) => {
    const postData = await getPage({
      page: pageParam,
      keyword,
      size,
      sortOption,
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

  // useEffect(() => {
  //   postsQuery.refetch();
  // }, [sortOption]);

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
