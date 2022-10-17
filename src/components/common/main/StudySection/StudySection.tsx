//

import { SectionTitle, SelectItem } from '@components/atoms';
import { Carousel } from '@components/common';
import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { IPostType } from 'types/post.types';
import classes from './studySection.module.scss';
interface Props {}

const filterData = ['전체', '최신순', '인기순', '조회순'];

export function StudySection() {
  // 단일출처가 필요한 상태인가?
  // 서버측 상태인가?
  // url을 store로 사용해야하나? url이 더렵혀지지 않았으면 좋겠다.
  // 아 딥링크 기능을 통해 남에게 공유했을 때에도 동일한 화면을 보여주기위해 사용했구나
  // 보여줘야하는 스터디관련 게시물들
  const [posts, setPosts] = useState<IPostType[]>([]);
  const [selectedFilter, setSelectedFilter] = useState(filterData[0]);
  const [filterList, setFilterList] = useState(filterData);
  // urldml params를 읽고 수정할 수 있다.
  const [searchParams, setSearchParams] = useSearchParams();
  // select trigger를 눌렀을 때 option에 따라서 비동기함수를 호출하고 이를 보여주는 기능을한다.
  return (
    <div>
      <div>
        <SectionTitle
          title={'커리어 성장을 위한 스터디'}
          sub={'Level Up Study'}
          description={
            '커리어 성장을 위한 스터디를 찾으시나요? 토티에는 이런저런 여러분야의 스터디가 모여있어요.'
          }
        />
        <ul className={classes.filter_list}>
          {filterList.map((filter, index) => (
            <li className={classes.filter_item} key={index}>
              <SelectItem
                // 여기다가 조건에따라 seleted를 추가해주자.
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
        <div className={classes.filterList}>필터목록</div>
        <Carousel
          style={{ height: '200px' }}
          options={{
            slidesPerView: 4,
            spaceBetween: 24,
            pagination: {
              clickable: true,
              type: 'bullets',
            },
            observer: true,
            observeParents: true,
          }}
        >
          <div style={{ backgroundColor: 'orange' }}>1</div>
          <div style={{ backgroundColor: 'green' }}>2</div>
          <div style={{ backgroundColor: 'orange' }}>3</div>
          <div style={{ backgroundColor: 'green' }}>4</div>
          <div style={{ backgroundColor: 'orange' }}>1</div>
          <div style={{ backgroundColor: 'green' }}>2</div>
          <div style={{ backgroundColor: 'orange' }}>3</div>
          <div style={{ backgroundColor: 'green' }}>4</div>
        </Carousel>
      </div>
    </div>
  );
}
