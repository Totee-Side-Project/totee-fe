import { Route, Routes } from 'react-router-dom';

import { PostsAll } from '@components/domains/posts/PostsCategory/PostsAll';
import { PostsMentoring } from '@components/domains/posts/PostsCategory/PostsMentoring';
import { PostsStudy } from '@components/domains/posts/PostsCategory/PostsStudy';
import type {
  IMentoringSortOptions,
  IPostsSortOptions,
} from 'types/sort.types';

export const POSTS_CATEGORY_PATHS = {
  BASE: 'posts/',
  ALL: 'all',
  STUDY: 'study',
  MENTORING: 'mentoring',
  TOTAL_STUDY: 'posts/study',
  TOTAL_MENTORING: 'posts/mentoring',
} as const;

export const POSTS_CATEGORY_NAMES = {
  STUDY: '스터디',
  MENTORING: '멘토링',
  MENTO: '멘토',
} as const;

export const postsSortOptions: IPostsSortOptions = {
  recent: '최신순',
  commentNum: '댓글순',
  view: '조회순',
  likeNum: '좋아요순',
} as const;

export const mentoringSortOptions: IMentoringSortOptions = {
  recent: '최신순',
  likeNum: '좋아요순',
} as const;

type ValueOf<T> = T[keyof T];
export type PostsCategoryNames = ValueOf<typeof POSTS_CATEGORY_NAMES>;

const PostsPage = () => {
  return (
    <Routes>
      <Route path={POSTS_CATEGORY_PATHS.ALL} element={<PostsAll />} />
      <Route path={POSTS_CATEGORY_PATHS.STUDY} element={<PostsStudy />} />
      <Route
        path={POSTS_CATEGORY_PATHS.MENTORING}
        element={<PostsMentoring />}
      />
    </Routes>
  );
};

export default PostsPage;
