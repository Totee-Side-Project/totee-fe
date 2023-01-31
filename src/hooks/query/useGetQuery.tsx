import { AlarmAPI } from '@api/alarm';
import { ApplicationAPI } from '@api/application';
import { CategoryAPI } from '@api/category';
import { LikeAPI } from '@api/like';
import { MentoringAPI } from '@api/mentoring';
import { PostAPI } from '@api/post';
import { TeamAPI } from '@api/team';
import { UserAPI } from '@api/user';
import { UserState } from '@store/user';
import { useQuery } from 'react-query';
import { useRecoilState } from 'recoil';
import { IMentoringListRequestOptions } from 'types/api.types';
import { IMemberType } from 'types/member.types';
import { IStudyPostsType } from 'types/posts.types';
import { queryKeys } from './queryKeys';

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
