import { useQuery } from 'react-query';
import { useRecoilState } from 'recoil';

import {
  AlarmAPI,
  ApplicationAPI,
  CategoryAPI,
  LikeAPI,
  MentoringAPI,
  PostAPI,
  TeamAPI,
  UserAPI,
} from '@api/api';
import { UserState } from '@store/user';
import { queryKeys } from '.';
import { IMentoringListRequestOptions } from 'types/api.types';
import { IStudyPostsType } from 'types/posts.types';
import { IMemberType } from 'types/member.types';

export const useGetUserAPI = () => {
  const [user, setUser] = useRecoilState(UserState);

  return useQuery(
    queryKeys.user,
    () => UserAPI.getUserInfo().catch((err) => err),
    {
      // 브라우저 focus 됐을 때 재시작?
      retry: false,
      refetchOnWindowFocus: false,
      // 자동으로 가져오는 옵션
      enabled: true,
      // 캐시 타임
      staleTime: 10 * 600 * 1000,
      onSuccess: (res) => {
        if (res?.data?.body.data) {
          setUser(res.data.body.data);
        }
      },
    },
  );
};

export function useGetPostByPostId(postId: number) {
  return useQuery(
    queryKeys.post(postId),
    () => PostAPI.getPostByPostId(postId),
    {
      // 브라우저 focus 됐을 때 재시작?
      retry: false,
      refetchOnWindowFocus: true,
      // 자동으로 가져오는 옵션
      enabled: true,
      // 캐시 타임
      staleTime: 10 * 600 * 1000,
    },
  );
}

export interface UseGetSearchPostListProps {
  keyword: string;
  page?: number;
  size: number;
  sortOption: string;
}

export function useGetSearchPostList({
  keyword,
  page = 0,
  size,
  sortOption,
}: UseGetSearchPostListProps) {
  return useQuery(
    queryKeys.postSearchTitle({
      keyword,
      pageNum: page,
      sortOption,
    }),
    () =>
      PostAPI.getPostList({
        keyword,
        size,
        page,
        sortOption,
      }).then((response) => response.data.body.data),
    {
      // 브라우저 focus 됐을 때 재시작?
      retry: false,
      refetchOnWindowFocus: false,
      // 자동으로 가져오는 옵션
      enabled: !!keyword,
      // 캐시 타임
      staleTime: 10 * 600 * 1000,
    },
  );
}

export function useGetCategoryList() {
  return useQuery(
    queryKeys.categories,
    () => CategoryAPI.getCategoryList().catch((err) => err),
    {
      // 브라우저 focus 됐을 때 재시작?
      retry: false,
      refetchOnWindowFocus: false,
      // 자동으로 가져오는 옵션
      enabled: true,
      // 캐시 타임
      staleTime: 10 * 600 * 1000,
    },
  );
}

export function useGetRecommendList() {
  return useQuery(queryKeys.recommend, () => PostAPI.recommendPostList(), {
    // 브라우저 focus 됐을 때 재시작?
    retry: false,
    refetchOnWindowFocus: false,
    // 자동으로 가져오는 옵션
    enabled: true,
    // 캐시 타임
    staleTime: 10 * 600 * 1000,
  });
}

export function useGetLikeofPost(postId: number) {
  return useQuery(
    queryKeys.likePost(postId),
    () => LikeAPI.getIsLikeInfo(postId),
    {
      // 브라우저 focus 됐을 때 재시작?
      retry: false,
      refetchOnWindowFocus: false,
      // 자동으로 가져오는 옵션
      enabled: true,
      // 캐시 타임
      staleTime: 10 * 600 * 1000,
      onError: () => {},
    },
  );
}

export function useGetAlarm() {
  return useQuery(queryKeys.alarms, () => AlarmAPI.getAlarm(), {
    retry: false,
    refetchOnWindowFocus: true,
    enabled: true,
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

export function useGetMyStudyPost() {
  return useQuery<IStudyPostsType>(queryKeys.myStudyPost, PostAPI.myStudyPost);
}

export function useGetParticipatingStudyPost() {
  return useQuery<IStudyPostsType>(
    queryKeys.participatingStudyPost,
    PostAPI.participatingStudyPost,
  );
}

export function useGetPostLikeList() {
  return useQuery<IStudyPostsType>(queryKeys.postLikeList, LikeAPI.LikeList);
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
