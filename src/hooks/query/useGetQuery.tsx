import { useQuery } from 'react-query';
import { useRecoilState } from 'recoil';
import { UserState } from '@store/user';
import { queryKeys } from './queryKeys';
import { IMentoringListRequestOptions } from 'types/api.types';
import { UserAPI } from '@api/apis/user';
import { PostAPI } from '@api/apis/post';
import { CategoryAPI } from '@api/apis/category';
import { LikeAPI } from '@api/apis/like';
import { ApplicationAPI } from '@api/apis/application';
import { MentoringAPI } from '@api/apis/mentoring';
import { AlarmAPI } from '@api/apis/alarm';

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
      refetchOnWindowFocus: false,
      enabled: !!keyword,
    },
  );
}

export function useGetCategoryList() {
  return useQuery(queryKeys.categories, CategoryAPI.getCategoryList, {
    refetchOnWindowFocus: false,
    onError: (err) => err,
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
  return useQuery(queryKeys.applicant(postId), () =>
    ApplicationAPI.getApplicant(postId),
  );
}

export function useGetMentoringList(options: IMentoringListRequestOptions) {
  return useQuery(queryKeys.mentoringList(options), () =>
    MentoringAPI.getMentoringList(options),
  );
}
