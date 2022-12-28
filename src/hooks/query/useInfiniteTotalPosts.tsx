import { useEffect } from 'react';
import { useInfiniteQuery } from 'react-query';
import { AxiosResponse } from 'axios';

import { IResponseOfPage } from 'types/api.types';
import { useIntersectionObserver } from './useIntersectionObserver';

export type FetchPageFuntionType = (
  pageParam: number,
  pageSize: number,
) => Promise<AxiosResponse<IResponseOfPage>>;

interface Props {
  getPage: FetchPageFuntionType;
  queryKey: string[];
  pageSize?: number; // 몇개씩 불러올 것인지
}

// default 값으로 4개씩 불러온다.
// 외부에서 pageSize 조절 가능 전체보기에서는 20개씩 가져올 예정

export const useInfiniteTotalPosts = ({
  getPage,
  pageSize = 4,
  queryKey,
}: Props) => {
  // 초기값 pageParam은 0 서버에서 넘어오는 last값이 false일 경우(마지막이 아닌 경우) + 1 을 해준다.
  // pageParam(페이지의 넘버, ex)3페이지) , pageSize(한 페이지에 담긴 데이터의 갯수)
  const getPageInfo = async ({ pageParam = 0 }) => {
    const postData = await getPage(pageParam, pageSize).then(
      (response) => response.data.body.data,
    );
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
    const { ref, observer } = useIntersectionObserver(postsQuery.fetchNextPage);

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
