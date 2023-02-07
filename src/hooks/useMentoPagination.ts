import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export const useMentoPagination = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const pageParam = Number(searchParams.get('page')) || 1;
  const [slideNum, setSlideNum] = useState(1);

  // currentPage의 목적은 결국 useEffect를 통해 setSearchParams를 해주기 위함 useState를 쓸 필요가 없다.
  const currentPage = pageParam - 1;
  const setCurrentPage = (page: number) =>
    setSearchParams({ page: (page + 1).toString() });

  return {
    currentPage,
    setCurrentPage,
    slideNum,
    setSlideNum,
  };
};
