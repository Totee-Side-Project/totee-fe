import { AxiosResponse } from 'axios';
import { QueryKey, useInfiniteQuery } from 'react-query';

interface Props {
  getData: (pageParam: number, pageSize: number) => Promise<AxiosResponse<any>>;
  queryKey: QueryKey;
  pageSize: number;
  responseKeys: string[];
}

// 🟠Todo: useInfiniteQuerywithScroll, useInfiniteTotalPosts와 합쳐져야함
export const useInfiniteQueryTest = ({
  getData,
  queryKey,
  pageSize,
  responseKeys,
}: Props) => {
  const getPageInfo = async ({ pageParam = 0 }) => {
    const response = await getData(pageParam, pageSize);
    let postPage = { ...response }.data;
    // 파라미터로 받은 key 배열을 통해 탐색
    responseKeys.forEach((key) => (postPage = postPage[key]));
    const nextPage = !postPage?.last ? pageParam + 1 : undefined;

    return {
      postPage,
      nextPage,
      isLast: postPage.last,
    };
  };

  const { data, status, fetchNextPage } = useInfiniteQuery(
    queryKey,
    getPageInfo,
    {
      getNextPageParam: (pageData) => pageData.nextPage,
      refetchOnWindowFocus: false,
    },
  );

  return { data: data?.pages, status, fetchNextPage };
};
