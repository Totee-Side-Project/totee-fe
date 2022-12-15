import { PostAPI } from '@api/api';
import { SectionTitle, SelectItem } from '@components/atoms';
import { Carousel } from '@components/common';
import { NewPostCard } from '@components/common/post/PostCard/NewPostCard';
// import { PostCard } from '@components/common/post/PostCard/PostCard';
import { IResponsePostDetail } from '@components/pages/DetailPage/NewDetailPage';
import { queryKeys } from '@hooks/query';
import { useInfiniteQueryTest } from '@hooks/useInfiniteQueryTest';
import { useEffect, useRef, useState } from 'react';
import { useQueryClient } from 'react-query';
import { useSearchParams } from 'react-router-dom';
// import type { IPostType } from 'types/post.types';
import classes from './studySection.module.scss';
import './studySection.scss';
// 처음 studySection 이 mount될때 비동기적으로 server에 limit 16으로 받아오고
// 프론트단에서 4단위로 끊어서 보여주는것은 어떨까?

export function StudySection() {
  const [filteredPageList, setFilteredPageList] = useState<
    IResponsePostDetail[][]
  >([]);
  const filterList = useRef(['전체', '최신순', '인기순', '조회순']).current;
  const [selectedFilter, setSelectedFilter] = useState(filterList[0]);
  // urldml params를 읽고 수정할 수 있다.
  const [searchParams, setSearchParams] = useSearchParams();
  const queryClient = useQueryClient();
  // const { data } = useQuery(['studySectionPosts'], () =>
  //   PostAPI.getPostList(0, 20).then((res) => res.data.body.data),
  // );

  const { data, fetchNextPage, status } = useInfiniteQueryTest({
    getData: PostAPI.getPostList,
    queryKey: queryKeys.postsAll,
    responseKeys: ['body', 'data'],
    pageSize: 4,
  });

  useEffect(() => {
    return () => {
      setFilteredPageList([]);
      queryClient.removeQueries('test');
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
  }, [selectedFilter]);

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

  // select trigger를 눌렀을 때 option에 따라서 비동기함수를 호출하고 이를 보여주는 기능을한다.
  return (
    <>
      <div className={classes.section_header}>
        <div className={classes.section_title_wrap}>
          <SectionTitle
            title={'커리어 성장을 위한 스터디'}
            sub={'Level Up Study'}
            description={`커리어 성장을 위한 스터디를 찾으시나요?\n토티에는 이런저런 여러분야의 스터디가 모여있어요.`}
          />
        </div>
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
                    // [key, value][] 타입을 객체로 만들어 주기위해 사용
                    // 기존의 params가 초기화되어서는 안되기에 Spread 연산자를 사용하여 병합
                    setSearchParams({
                      ...Object.fromEntries(searchParams),
                      filter: [filter],
                    })
                  }
                  left={
                    <div className={classes.outer_circle}>
                      <div className={classes.inner_circle} />
                    </div>
                  }
                >
                  #{filter}
                </SelectItem>
              </li>
            ))}
          </ul>
        </div>
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
                    {/* <PostCard post={post} /> */}
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
