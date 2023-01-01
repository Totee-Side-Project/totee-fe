import { useEffect, useState } from 'react';
import { useQueryClient } from 'react-query';
import { useSearchParams } from 'react-router-dom';
import 'react-loading-skeleton/dist/skeleton.css';

import { PostAPI } from '@api/api';
import { SectionTitle } from '@components/atoms';
import { Carousel } from '@components/common';
import { NewPostCard } from '@components/common/post/PostCard/PostCard';
import { queryKeys } from '@hooks/query';
import { useSortWithClient } from '@hooks/useSortWithClient';
import { useInfiniteTotalPosts } from '@hooks/query/useInfiniteTotalPosts';
import { PostsFilter } from '@components/domains/posts/PostsFilter';
import { SortButton } from '@components/atoms/Button/SortButton/SortButton';
import { IResponsePostDetail } from 'types/api.types';
import { routePaths } from 'App';
import classes from './studySection.module.scss';
import './studySection.scss';

export function StudySection() {
  const [searchParams, setSearchParams] = useSearchParams();
  const param = searchParams.get('filter');
  const { query } = useInfiniteTotalPosts({
    getPage: PostAPI.getPostList,
    queryKey: queryKeys.postsSlider,
    filter: !param ? undefined : (param as string),
    pageSize: 16,
  });
  const { chunkData } = useSortWithClient();
  const queryClient = useQueryClient();

  const resetPageList = () => {
    queryClient.invalidateQueries(queryKeys.postsSlider);
  };

  const pages = query.data?.pages.reduce(
    (acc: IResponsePostDetail[], cur) => cur.postData.content,
    [],
  );
  const renderPages = chunkData(pages || [], 4);

  useEffect(() => {
    resetPageList();
  }, [param]);

  return (
    <>
      <div className={classes.section_header}>
        <div className={classes.section_title_wrap}>
          <SectionTitle
            title={'커리어 성장을 위한 <mark>스터디</mark>'}
            sub={'Level Up Study'}
            description={`커리어 성장을 위한 스터디를 찾으시나요?\n토티에는 이런저런 여러분야의 스터디가 모여있어요.`}
            to={routePaths.posts}
          />
        </div>
        <div className={classes.filter_wrap}>
          <PostsFilter
            options={{
              recent: '#최신순',
              commentNum: '#댓글순',
              view: '#조회순',
              likeNum: '#좋아요순',
            }}
            Element={SortButton}
          />
        </div>
      </div>
      <div className={classes.section_body}>
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
          isLoading={query.isLoading}
          isFetching={query.isFetching}
          fallback={<SectionSkeleton />}
        >
          {renderPages.map((page, index) => (
            <div
              key={'pages' + index}
              style={{
                display: 'flex',
                height: '100%',
                alignItems: 'center',
                justifyContent: 'space-around',
              }}
            >
              {page.map((post) => (
                <li key={post.postId}>
                  <NewPostCard post={post} />
                </li>
              ))}
            </div>
          ))}
        </Carousel>
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

// const SectionFilter = ({ filterList }: { filterList: string[] }) => {
//   const [searchParams, setSearchParams] = useSearchParams();
//   const [selectedFilter, setSelectedFilter] = useState(filterList[0]);

//   useEffect(() => {
//     const filterParams = searchParams.get('filter');

//     filterParams ? setSelectedFilter(filterParams) : setSelectedFilter('전체');
//   }, [searchParams]);

//   return (
//     <div className={classes.filter_wrap}>
//       <ul className={classes.filter_list}>
//         {filterList.map((filter, index) => (
//           <li
//             className={
//               filter === selectedFilter
//                 ? `${classes.filter_item} ${classes.selected}`
//                 : classes.filter_item
//             }
//             key={`filter-${index}`}
//           >
//             <SelectItem
//               className={classes.tag_wrap}
//               onClick={() =>
//                 setSearchParams({
//                   ...Object.fromEntries(searchParams),
//                   filter: [filter],
//                 })
//               }
//               left={
//                 <Circle
//                   selected={filter === selectedFilter}
//                   backgroundColor="#ffd02c"
//                 />
//               }
//             >
//               #{filter}
//             </SelectItem>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };
