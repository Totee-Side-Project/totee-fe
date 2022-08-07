import React, { ReactElement, useEffect, useState } from 'react';

import { useInView } from 'react-intersection-observer';
import { useInfiniteQuery } from 'react-query';

interface useInfiniteQuerywithScrollPropsTypes {
  getData: (pageParam: number, pageSize: number) => any;
  queryKey: string;
  pageSize: number;
}

interface useInfiniteQuerywithScrollReturnTypes {
  data: any | undefined;
  error: string | undefined | unknown;
  isFetching: boolean;
  ObservationComponent: () => ReactElement;
}

const useInfiniteQuerywithScroll = ({
  getData,
  queryKey,
  pageSize = 5,
}: useInfiniteQuerywithScrollPropsTypes): useInfiniteQuerywithScrollReturnTypes => {
  const [pageParm, setPageParam] = useState(0);
  const getDataWithPageInfo = async ({ pageParam = 0 }) => {
    setPageParam(pageParam);
    const content: any = await getData(pageParam, pageSize).then(
      (res: any): any => {
        return res.data.body.data;
      },
    );

    const nextPage = !content.last ? pageParam + 1 : undefined;

    return {
      result: content,
      nextPage,
      isLast: content.last,
    };
  };

  const { data, error, isFetching, fetchNextPage } = useInfiniteQuery(
    [queryKey],
    getDataWithPageInfo,
    {
      getNextPageParam: (lastPage) => lastPage.nextPage,
    },
  );

  const ObservationComponent = (): ReactElement => {
    const [ref, inView] = useInView();

    useEffect(() => {
      if (!data) return;

      const pageLastIdx = data.pages.length - 1;
      const isLast = data?.pages[pageLastIdx].isLast;

      if (!isLast && inView) fetchNextPage();
      else return;
    }, [inView]);

    return <div ref={ref} />;
  };

  return {
    data: data?.pages[pageParm],
    error,
    isFetching,
    ObservationComponent,
  };
};
export default useInfiniteQuerywithScroll;
