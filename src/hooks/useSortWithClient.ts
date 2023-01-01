import { IResponsePostDetail } from 'types/api.types';
import { sortOptionNameType } from 'types/sort.types';

export const useSortWithClient = () => {
  const chunkData = <T, _>(data: T[] = [], parts: number): T[][] => {
    let chunkedData = [];
    const maxIndex = Math.ceil(data.length / parts);

    for (let i = 0; i < maxIndex; i++) {
      if (i === maxIndex - 1) {
        chunkedData.push(data.slice(parts * i, data.length));
        break;
      }
      chunkedData.push(data.slice(parts * i, parts * (i + 1)));
    }

    return chunkedData;
  };

  const sortingData = (
    data: IResponsePostDetail[],
    selectedFilter: sortOptionNameType,
  ): IResponsePostDetail[] => {
    let newData = [...data];
    switch (selectedFilter) {
      case 'recent':
        newData.sort(
          (a, b) =>
            // 1970년 과 주어진 시간과의 ms 간격 내림차순으로 정렬
            Number(new Date(b.createdAt)) - Number(new Date(a.createdAt)),
        );
        break;
      case 'likeNum':
        newData.sort((a, b) => b.likeNum - a.likeNum);
        break;
      case 'view':
        newData.sort((a, b) => b.view - a.view);
        break;
      case 'commentNum':
        newData.sort((a, b) => b.commentNum - a.commentNum);
    }
    return newData;
  };

  return { chunkData, sortingData };
};
