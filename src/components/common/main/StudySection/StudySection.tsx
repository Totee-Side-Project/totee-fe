import { useEffect, useState } from 'react';
import { useQueryClient } from 'react-query';
import { useNavigate, useSearchParams } from 'react-router-dom';
import 'react-loading-skeleton/dist/skeleton.css';

import { PostAPI } from '@api/api';
import { Circle, SectionTitle, SelectItem } from '@components/atoms';
import { Carousel } from '@components/common';
import { NewPostCard } from '@components/common/post/PostCard/PostCard';
import { queryKeys } from '@hooks/query';
import { useInfiniteQueryTest } from '@hooks/query/useInfiniteQueryCarousel';
import { IResponsePostDetail } from 'types/api.types';

import classes from './studySection.module.scss';
import './studySection.scss';

const filterList = ['전체', '최신순', '인기순', '조회순'];

export function StudySection() {
  const navigate = useNavigate();

  const [filteredPageList, setFilteredPageList] = useState<
    IResponsePostDetail[][]
  >([]);
  const [selectedFilter, setSelectedFilter] = useState(filterList[0]);
  // urldml params를 읽고 수정할 수 있다.
  const [searchParams, setSearchParams] = useSearchParams();
  const queryClient = useQueryClient();

  const { data, fetchNextPage, status } = useInfiniteQueryTest({
    getData: PostAPI.getPostList,
    queryKey: queryKeys.postsSlider,
    responseKeys: ['body', 'data'],
    pageSize: 4,
  });

  const onClickWithNavigate = () => {
    navigate('/posts');
  };
  useEffect(() => {
    return () => {
      setFilteredPageList([]);
      queryClient.invalidateQueries(queryKeys.postsSlider);
    };
  }, []);

  useEffect(() => {
    const filterParams = searchParams.get('filter');

    filterParams ? setSelectedFilter(filterParams) : setSelectedFilter('전체');
  }, [searchParams]);

  useEffect(() => {
    if (!data) return;
    if (data[data.length - 1].isLast) {
      const newPosts = data.map((e) => e.postPage.content);
      setFilteredPageList(() => newPosts);
      return;
    }

    if (data.length < 4) {
      fetchNextPage();
    }
  }, [data]);

  useEffect(() => {
    if (data && data.length) {
      const newPosts = data.map((e) => e.postPage.content);
      const flatData = newPosts.flatMap((pageList) => pageList);
      const sortedData = sortingData(flatData);
      const chunkedData = chunkData(sortedData, 4);
      setFilteredPageList([...chunkedData]);
    }
  }, [selectedFilter, data]);

  const chunkData = <T, _>(data: T[], parts: number): T[][] => {
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

  const sortingData = (data: IResponsePostDetail[]): IResponsePostDetail[] => {
    let newData = [...data];
    switch (selectedFilter) {
      case '최신순':
        newData.sort(
          (a, b) =>
            // 1970년 과 주어진 시간과의 ms 간격 내림차순으로 정렬
            Number(new Date(b.createdAt)) - Number(new Date(a.createdAt)),
        );
        break;
      case '인기순':
        newData.sort((a, b) => b.likeNum - a.likeNum);
        break;
      case '조회순':
        newData.sort((a, b) => b.view - a.view);
        break;
    }

    return newData;
  };

  return (
    <>
      <div className={classes.section_header}>
        <div className={classes.section_title_wrap}>
          <SectionTitle
            title={'커리어 성장을 위한 스터디'}
            sub={'Level Up Study'}
            description={`커리어 성장을 위한 스터디를 찾으시나요?\n토티에는 이런저런 여러분야의 스터디가 모여있어요.`}
            onClick={onClickWithNavigate}
          />
        </div>
        <SectionFilter filterList={filterList} />
      </div>
      <div className={classes.section_body}>
        {filterList && (
          <Carousel
            style={{
              paddingTop: '20px',
              paddingBottom: '50px',
            }}
            options={{
              slidesPerView: 1,
              pagination: {
                clickable: true,
                type: 'bullets',
              },
              observer: true,
              observeParents: true,
            }}
            fallback={<SectionSkeleton />}
          >
            {filteredPageList.map((postPage, index) => (
              <div
                key={'pages' + index}
                style={{
                  display: 'flex',
                  height: '100%',
                  alignItems: 'center',
                  justifyContent: 'space-around',
                }}
              >
                {postPage.map((post) => (
                  <li key={post.postId}>
                    <NewPostCard post={post} />
                  </li>
                ))}
              </div>
            ))}
          </Carousel>
        )}
      </div>
    </>
  );
}

const SectionSkeleton = () => {
  return (
    <div className={classes.section_body}>
      <ul
        style={{
          display: 'flex',
          height: '100%',
          alignItems: 'center',
          justifyContent: 'space-around',
        }}
      >
        {[0, 1, 2, 3].map((ele) => (
          <li key={ele}>
            <NewPostCard />
          </li>
        ))}
      </ul>
    </div>
  );
};

const SectionFilter = ({ filterList }: { filterList: string[] }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedFilter, setSelectedFilter] = useState(filterList[0]);

  useEffect(() => {
    const filterParams = searchParams.get('filter');

    filterParams ? setSelectedFilter(filterParams) : setSelectedFilter('전체');
  }, [searchParams]);

  return (
    <div className={classes.filter_wrap}>
      <ul className={classes.filter_list}>
        {filterList.map((filter, index) => (
          <li
            className={
              filter === selectedFilter
                ? `${classes.filter_item} ${classes.selected}`
                : classes.filter_item
            }
            key={`filter-${index}`}
          >
            <SelectItem
              className={classes.tag_wrap}
              onClick={() =>
                setSearchParams({
                  ...Object.fromEntries(searchParams),
                  filter: [filter],
                })
              }
              left={
                <Circle
                  selected={filter === selectedFilter}
                  backgroundColor="#ffd02c"
                />
              }
            >
              #{filter}
            </SelectItem>
          </li>
        ))}
      </ul>
    </div>
  );
};
