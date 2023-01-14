import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';

import {
  AlarmAPI,
  ApplicationAPI,
  CategoryAPI,
  LikeAPI,
  PostAPI,
  UserAPI,
} from '@api/api';
import { UserState } from '@store/user';
import { routePaths } from 'App';
import { queryKeys } from '.';

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

export function useGetPostListAPI() {
  return useQuery(
    queryKeys.postsAll,
    () => PostAPI.getPostList().catch((err) => err),
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

export function useGetSearchPostList(title: string) {
  return useQuery(
    queryKeys.searchTitle(title),
    () => title.length > 0 && PostAPI.searchPostList(title).catch((err) => err),
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
  const navigate = useNavigate();
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
  return useQuery(
    queryKeys.applicant(postId),
    () => ApplicationAPI.getApplicant(postId),
    {
      retry: false,
      refetchOnWindowFocus: true,
      // 자동으로 가져오는 옵션
      enabled: true,
      // 캐시 타임
      staleTime: 10 * 600 * 1000,
    },
  );
}
