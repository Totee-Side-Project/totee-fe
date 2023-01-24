import 'react-loading-skeleton/dist/skeleton.css';

import { PostAPI } from '@api/api';
import { SectionTitle } from '@components/atoms';
import { Carousel } from '@components/common';
import { PostCard } from '@components/common/post/PostCard/PostCard';
import { PostsFilter } from '@components/domains/posts/PostsFilter';
import { SortButton } from '@components/atoms/Button/SortButton/SortButton';
import { queryKeys } from '@hooks/query';
import { useSortWithClient } from '@hooks/useSortWithClient';
import { useInfiniteTotalPosts } from '@hooks/query/useInfiniteWithDraw';
import { useGetPostsParams } from '@hooks/useGetPostsParams';
import { IResponsePostDetail } from 'types/api.types';
import { POSTS_CATEGORY_PATHS } from 'pages/PostsPage';
import classes from './studySection.module.scss';
import './studySection.scss';

const LOADING_PAGE_SIZE = 4;
const PAGE_SIZE = 16;

export function StudySection() {
  const { params, sortParam } = useGetPostsParams({ size: PAGE_SIZE });

  const { query } = useInfiniteTotalPosts({
    getPage: PostAPI.getPostList,
    queryKey: queryKeys.postsSlider({ sort: [sortParam] }),
    params,
  });
  const { chunkData } = useSortWithClient();

  const pages = query.data?.pages.reduce(
    (acc, cur) => cur.postData.content as IResponsePostDetail[],
    [] as IResponsePostDetail[],
  );
  const renderPages = chunkData<IResponsePostDetail>(pages || [], 4);

  return (
    <>
      <div className={classes.section_header}>
        <div className={classes.section_title_wrap}>
          <SectionTitle
            title={'커리어 성장을 위한 <mark>스터디</mark>'}
            sub={'Level Up Study'}
            description={`커리어 성장을 위한 스터디를 찾으시나요?\n토티에는 이런저런 여러분야의 스터디가 모여있어요.`}
            to={POSTS_CATEGORY_PATHS.TOTAL_STUDY}
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
                  <PostCard post={post} />
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
  const style = {
    display: 'flex',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
  };

  return (
    <div className={classes.section_body}>
      <ul style={style}>
        {[...Array(LOADING_PAGE_SIZE)].map((ele) => (
          <li key={ele}>
            <PostCard />
          </li>
        ))}
      </ul>
    </div>
  );
};
