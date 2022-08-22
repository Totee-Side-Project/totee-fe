import { QueryCache, QueryClient, useQuery } from 'react-query';
import { AlarmAPI, CategoryAPI, LikeAPI, PostAPI, UserAPI } from '@api/api';
import { useRecoilState } from 'recoil';
import { UserState } from '@store/user';
import debounce from 'lodash';

export function useGetUserAPI() {
  const [user, setUser] = useRecoilState(UserState);

  return useQuery(['user'], () => UserAPI.getUserInfo().catch((err) => err), {
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
  });
}

export function useGetPostListAPI() {
  return useQuery(
    ['postsAll'],
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

export function useGetPostByPostId(postId: string) {
  return useQuery(
    ['post', postId],
    () => PostAPI.getPostByPostId(postId).catch((err) => err),
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
    ['search', title],
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
    ['categories'],
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
  return useQuery(['recommend'], () => PostAPI.recommendPostList(), {
    // 브라우저 focus 됐을 때 재시작?
    retry: false,
    refetchOnWindowFocus: false,
    // 자동으로 가져오는 옵션
    enabled: true,
    // 캐시 타임
    staleTime: 10 * 600 * 1000,
  });
}

export function useGetLikeofPost(postId: string) {
  return useQuery(['like', postId], () => LikeAPI.getIsLikeInfo(postId), {
    // 브라우저 focus 됐을 때 재시작?
    retry: false,
    refetchOnWindowFocus: false,
    // 자동으로 가져오는 옵션
    enabled: true,
    // 캐시 타임
    staleTime: 10 * 600 * 1000,
  });
}

export function useGetAlarm() {
  return useQuery(['alarms'], () => AlarmAPI.getAlarm(), {
    retry: false,
    refetchOnWindowFocus: true,
    enabled: true,
    staleTime: 0,
  });
}
