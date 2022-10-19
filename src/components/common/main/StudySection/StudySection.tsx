//

import { PostAPI } from '@api/api';
import { SectionTitle, SelectItem } from '@components/atoms';
import { Carousel } from '@components/common';
import { PostCard } from '@components/common/post/PostCard/PostCard';
import { useEffect, useRef, useState } from 'react';
import { useQuery } from 'react-query';
import { useSearchParams } from 'react-router-dom';
import { IPostType } from 'types/post.types';
import classes from './studySection.module.scss';
// interface Props {}

export function StudySection() {
  // const [posts, setPosts] = useState<IPostType[]>([]);
  const filterList = useRef(['전체', '최신순', '인기순', '조회순']).current;
  const [selectedFilter, setSelectedFilter] = useState(filterList[0]);

  // urldml params를 읽고 수정할 수 있다.
  const [searchParams, setSearchParams] = useSearchParams();
  const { data } = useQuery(['studyPosts'], () =>
    PostAPI.getPostList(0, 4).then((res: any) => res.data.body.data),
  );

  // unmount되면 studyPosts 키값을 가진 query를 제거해주어야할까?
  // out of data일 가능성이 있으면 제거해주는것이 좋을것 같다.

  useEffect(() => {
    const filterParams = searchParams.get('filter');

    filterParams ? setSelectedFilter(filterParams) : setSelectedFilter('전체');
  }, [searchParams]);
  // select trigger를 눌렀을 때 option에 따라서 비동기함수를 호출하고 이를 보여주는 기능을한다.
  return (
    <>
      <div className={classes.section_header}>
        <div className={classes.section_title_wrap}>
          <SectionTitle
            title={'커리어 성장을 위한 스터디'}
            sub={'Level Up Study'}
            description={
              '커리어 성장을 위한 스터디를 찾으시나요? 토티에는 이런저런 여러분야의 스터디가 모여있어요.'
            }
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
                key={index}
              >
                <SelectItem
                  key={`filter-${index}`}
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
        {data && (
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
            <div
              style={{
                display: 'flex',
                height: '100%',
                alignItems: 'center',
                justifyContent: 'space-around',
              }}
            >
              {data.content.map((studyPost: IPostType, index: number) => (
                <li key={index}>
                  {/* <li key={index} style={{ margin: '0 12px' }}> */}
                  <PostCard key={index} post={studyPost} />
                </li>
              ))}
            </div>
            <div
              style={{
                display: 'flex',
                height: '100%',
                alignItems: 'center',
                justifyContent: 'space-around',
              }}
            >
              {data.content.map((studyPost: IPostType, index: number) => (
                <li key={index} style={{ margin: '0 12px' }}>
                  <PostCard key={index} post={studyPost} />
                </li>
              ))}
            </div>
            <div
              style={{
                display: 'flex',
                margin: '0 auto',
                height: '100%',
                alignItems: 'center',
                justifyContent: 'space-around',
              }}
            >
              {data.content.map((studyPost: IPostType, index: number) => (
                <li key={index} style={{ margin: '0 12px' }}>
                  <PostCard key={index} post={studyPost} />
                </li>
              ))}
            </div>
          </Carousel>
        )}
      </div>
    </>
  );
}
