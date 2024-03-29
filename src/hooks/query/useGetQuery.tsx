import { useQuery } from 'react-query';
import { useRecoilState } from 'recoil';

import { AlarmAPI } from '@api/alarm';
import { ApplicationAPI } from '@api/application';
import { LikeAPI } from '@api/like';
import { MentoringAPI } from '@api/mentoring';
import type {
  IMentoringListRequestOptions,
  IMentoringSearchListRequestOptions,
  MentoringPostsType,
} from '@api/mentoring/types';
import { PostAPI } from '@api/post';
import type { IMentoringMemberType, IStudyMemberType } from '@api/team/types';
import { UserAPI } from '@api/user';
import { queryKeys } from '@hooks/query/queryKeys';
import { UserState } from '@store/user';
import { TeamAPI } from '@api/team';
import {
  IPostsPaginationOptions,
  StudyPostsResponseData,
  StudyPostsType,
} from '@api/post/types';
import { CategoryAPI } from '@api/category';

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
  return useQuery<IStudyMemberType[]>(
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

export function useGetLikedStudyPosts() {
  return useQuery<StudyPostsType>(
    queryKeys.likedStudyPosts,
    LikeAPI.studyPosts,
  );
}

export function useGetLikedMentoringPosts() {
  return useQuery<MentoringPostsType>(
    queryKeys.likedMentoringPosts,
    LikeAPI.mentoringPosts,
  );
}

export function useGetMyStudyPosts() {
  return useQuery<StudyPostsType>(queryKeys.myStudyPost, PostAPI.myStudyPost);
}

export function useGetMyMentoringPosts() {
  return useQuery<MentoringPostsType>(
    queryKeys.myMentoringPosts,
    MentoringAPI.getMyMentoringPosts,
  );
}

export function useGetParticipatingStudyPosts() {
  return useQuery<StudyPostsType>(
    queryKeys.participatingStudyPosts,
    PostAPI.participatingStudyPosts,
  );
}

export function useGetParticipatingMentoringPosts() {
  return useQuery<MentoringPostsType>(
    queryKeys.participatingMentoringPosts,
    PostAPI.participatingMentoringPosts,
  );
}

export function useGetStudyMembers(postId: number) {
  return useQuery<IStudyMemberType[]>(
    queryKeys.studyMembers(postId),
    () => TeamAPI.getTeam(postId),
    { enabled: !!postId },
  );
}

export function useGetMentoringMembers(mentoringId: number) {
  return useQuery<IMentoringMemberType[]>(
    queryKeys.mentoringMembers(mentoringId),
    () => TeamAPI.getMentoringMembers(mentoringId),
    { enabled: !!mentoringId },
  );
}

export function useGetMentoringApplicants(mentoringId: number) {
  return useQuery<IMentoringMemberType[]>(
    queryKeys.mentoringApplicants(mentoringId),
    () => MentoringAPI.getMentoringApplicants(mentoringId),
    { enabled: !!mentoringId },
  );
}
