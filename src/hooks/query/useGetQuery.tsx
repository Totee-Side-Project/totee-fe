import { useQuery } from 'react-query';
import { useRecoilState } from 'recoil';

import {
  AlarmAPI,
  ApplicationAPI,
  LikeAPI,
  MentoringAPI,
  PostAPI,
  UserAPI,
} from '@api/api';
import { UserState } from '@store/user';
import { queryKeys } from '.';
import {
  IMentoringListRequestOptions,
  IMentoringSearchListRequestOptions,
} from 'types/api.types';
import { IGetPostListParams } from '@api/api.types';

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
      // onError: () => {},
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
}: IGetPostListParams) {
  return useQuery(
    queryKeys.postSearchTitle({
      keyword,
      size,
      pageNum: page,
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
      // 브라우저 focus 됐을 때 재시작?
      retry: false,
      refetchOnWindowFocus: false,
      // 자동으로 가져오는 옵션
      enabled: !!keyword,
      // 캐시 타임
      // staleTime: 10 * 600 * 1000,
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
