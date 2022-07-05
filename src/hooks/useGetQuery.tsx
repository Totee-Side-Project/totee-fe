import { QueryCache, QueryClient, useQuery } from 'react-query';
import { PostAPI, UserAPI } from '@api/api';
import { useRecoilState } from 'recoil';
import { UserState } from '@store/user';

export function useGetAllPosts(page: number = 0, size?: number, sort?: string) {
  return useQuery(
    ['posts', page, size, sort],
    () => PostAPI.getPostList(page, size, sort).catch((err) => err),
    {
      // 브라우저 focus 됐을 때 재시작?
      refetchOnWindowFocus: false,
      // 자동으로 가져오는 옵션
      enabled: true,
      // 캐시 타임
      staleTime: 10 * 600 * 1000,
    },
  );
}

export function useGetUserAPI() {
  const [user, setUser] = useRecoilState(UserState);

  return useQuery(['user'], () => UserAPI.getUserInfo(), {
    // 브라우저 focus 됐을 때 재시작?
    retry: false,
    refetchOnWindowFocus: false,
    // 자동으로 가져오는 옵션
    enabled: true,
    // 캐시 타임
    staleTime: 10 * 600 * 1000,
    onSuccess: (res) => {
      setUser(res.data.body.data);
    },
  });
}
