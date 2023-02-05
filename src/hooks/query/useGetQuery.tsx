import { useQuery } from 'react-query';
import { useRecoilState } from 'recoil';

import { AlarmAPI } from '@api/alarm';
import { ApplicationAPI } from '@api/application';
import { LikeAPI } from '@api/like';
import { MentoringAPI } from '@api/mentoring';
import type {
  IMentoringListRequestOptions,
  IMentoringSearchListRequestOptions,
} from '@api/mentoring/types';
import { PostAPI } from '@api/post';
import type { IMemberType } from '@api/team/types';
import { UserAPI } from '@api/user';
import { queryKeys } from '@hooks/query/queryKeys';
import { UserState } from '@store/user';
import { TeamAPI } from '@api/team';
import { MentorAPI } from '@api/mentor';
import { IPostsPaginationOptions, StudyPostsType } from '@api/post/types';
import { CategoryAPI } from '@api/category';
import { IMentoListRequestOptions } from '@api/mentor/types';

export const useGetUserAPI = () => {
  const [user, setUser] = useRecoilState(UserState);

  return useQuery(queryKeys.user, UserAPI.getUserInfo, {
    refetchOnWindowFocus: false,
    onSuccess: (res) => {
      if (res?.data?.body.data) {
        setUser(res.data.body.data);
      }
    },
  });
};

export function useGetPostByPostId(postId: number) {
  return useQuery(queryKeys.post(postId), () =>
    PostAPI.getPostByPostId(postId),
  );
}

export interface UseGetSearchPostListProps {
  keyword: string;
  page?: number;
  size: number;
  sortOption: string;
}

export function useGetCategoryList() {
  return useQuery(queryKeys.categories, CategoryAPI.getCategoryList, {
    refetchOnWindowFocus: false,
  });
}

export function useGetRecommendList() {
  return useQuery(queryKeys.recommend, PostAPI.recommendPostList, {
    refetchOnWindowFocus: false,
  });
}

export function useGetLikeofPost(postId: number) {
  return useQuery(
    queryKeys.likePost(postId),
    () => LikeAPI.getIsLikeInfo(postId),
    {
      refetchOnWindowFocus: false,
    },
  );
}

export function useGetAlarm() {
  return useQuery(queryKeys.alarms, AlarmAPI.getAlarm, {
    staleTime: 0,
  });
}

export function useGetApplicant(postId: number) {
  return useQuery<IMemberType[]>(
    queryKeys.applicant(postId),
    () => ApplicationAPI.getApplicant(postId),
    { enabled: !!postId },
  );
}

export function useGetMentoringList(options: IMentoringListRequestOptions) {
  return useQuery(queryKeys.mentoringList(options), () =>
    MentoringAPI.getMentoringList(options),
  );
}

export function useGetSearchPostList({
  keyword,
  size,
  page,
  sort,
}: IPostsPaginationOptions) {
  return useQuery(
    queryKeys.postSearchTitle({
      keyword,
      size,
      page: page,
      sort,
    }),
    () =>
      PostAPI.getPostList({
        keyword,
        size,
        page,
        sort,
      }).then((response) => response.data.body.data),
    {
      // 자동으로 가져오는 옵션
      enabled: !!keyword,
    },
  );
}

export function useGetSearchMentoringList(
  options: IMentoringSearchListRequestOptions,
) {
  return useQuery(
    queryKeys.mentoringSearchList(options),
    () =>
      MentoringAPI.searchMentoringList(options).then(
        (response) => response.data.body.data,
      ),
    {
      enabled: !!options.keyword,
    },
  );
}

export function useGetMyStudyPost() {
  return useQuery<StudyPostsType>(queryKeys.myStudyPost, PostAPI.myStudyPost);
}

export function useGetParticipatingStudyPost() {
  return useQuery<StudyPostsType>(
    queryKeys.participatingStudyPost,
    PostAPI.participatingStudyPost,
  );
}

export function useGetPostLikeList() {
  return useQuery<StudyPostsType>(queryKeys.postLikeList, LikeAPI.LikeList);
}

export function useGetStudyMembers(postId: number) {
  return useQuery<IMemberType[]>(
    queryKeys.studyMembers(postId),
    () => TeamAPI.getTeam(postId),
    { enabled: !!postId },
  );
}

export function useGetMyMentoringPosts() {
  return useQuery(queryKeys.myMentoringPosts, MentoringAPI.getMyMentoringPosts);
}

export function useGetMentoringMembers(mentoringId: number) {
  return useQuery(
    queryKeys.mentoringMembers(mentoringId),
    () => TeamAPI.getMentoringTeam(mentoringId),
    { enabled: !!mentoringId },
  );
}

export function useGetMentoList(options: IMentoListRequestOptions) {
  return useQuery(queryKeys.mentoList, () =>
    MentorAPI.getMentorList(options).then(
      (response) => response.data.body.data,
    ),
  );
}
