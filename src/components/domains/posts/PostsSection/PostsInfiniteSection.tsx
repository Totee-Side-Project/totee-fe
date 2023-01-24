import {
  FetchPageFuntionType,
  GetFetchPageQueryKeyFuntion,
  useInfiniteTotalPosts,
} from '@hooks/query/useInfiniteWithDraw';

import { useGetPostsParams } from '@hooks/useGetPostsParams';
import { PostCard } from '@components/common/post/PostCard/PostCard';
import { SearchResultGuideText } from '@components/atoms';
import MentoringPostCard from '@components/common/card/MentoringPostCard/MentoringPostCard';
import classes from './postsSection.module.scss';
import { IMentoring, IResponsePostDetail } from 'types/api.types';

const LOADING_PAGE_SIZE = 10;
const PAGE_SIZE = 20;

interface IProps {
  fetchPageFunction: FetchPageFuntionType;
  getQueryKeyFuntion: GetFetchPageQueryKeyFuntion;
}

export const PostsInfiniteSection = ({
  fetchPageFunction,
  getQueryKeyFuntion,
}: IProps) => {
  const { params } = useGetPostsParams({ size: PAGE_SIZE });

  const { query, TriggerComponent } = useInfiniteTotalPosts({
    getPage: fetchPageFunction,
    queryKey: getQueryKeyFuntion(params),
    params,
  });

  if (query.isLoading) {
    const loadingList = [...Array(LOADING_PAGE_SIZE)];
    return (
      <section className={classes.postsSectionContainer}>
        <ul className={classes.postsSection}>
          {loadingList.map((ele, index) => (
            <PostCard key={index} />
          ))}
        </ul>
        <div className={classes.postsTriggerWrap} />
      </section>
    );
  }

  if (query.isError) {
    // TODO: Error시 UI
    return null;
  }

  if (
    query.status === 'success' &&
    query.data?.pages[0].postData.content.length
  ) {
    const datas = query.data.pages.map((page) => page.postData.content).flat();
    return (
      <>
        <SearchResultGuideText className={classes.postsCategoryTitle} />
        <section className={classes.postsSectionContainer}>
          <ul className={classes.postsSection}>
            {datas.map((data) => {
              // TODO: if문을 사용하지 않고 외부로부터 response.data를 통해 렌더링되는 UI Component를 Props로 받아서 <Element data={data} />
              // 이렇게만 넘겨줄 수 있도록 구현하고 싶은데 쉽지 않네요..
              const mentoring = data as IMentoring;
              if (mentoring.mentoringId) {
                const mentoring = data as IMentoring;
                return (
                  <MentoringPostCard
                    key={mentoring.mentoringId}
                    mentoringPost={{
                      title: mentoring.title,
                      description: mentoring.content,
                      mentor: {
                        career: mentoring.career,
                        position: mentoring.field,
                        profileImageUrl: mentoring.profileImageUrl,
                        nickname: mentoring.nickname,
                      },
                    }}
                  />
                );
              }

              const post = data as IResponsePostDetail;
              return <PostCard key={post.postId} post={post} />;
            })}
          </ul>
          <div className={classes.postsTriggerWrap}>
            <TriggerComponent />
          </div>
        </section>
      </>
    );
  }

  // Todo: 보여줄 데이터들이 없거나 잘못된 정렬 카테고리가 선택된 경우 적절한 안내페이지르 보여줘야한다.
  return (
    <main>
      <div>
        <SearchResultGuideText className={classes.postsCategoryTitle} />
        <ul className={classes.postsSection}>
          <h2>일치하는 게시물없음</h2>
        </ul>
      </div>
      <div className={classes.postsTriggerWrap}></div>
    </main>
  );
};
