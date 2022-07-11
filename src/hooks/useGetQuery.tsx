import { QueryCache, QueryClient, useQuery } from 'react-query';
import { PostAPI, UserAPI, CategoryAPI } from '@api/api';
import { useRecoilState } from 'recoil';
import { UserState } from '@store/user';

export function useGetUserAPI() {
  const [user, setUser] = useRecoilState(UserState);

  return useQuery(['user'], () => UserAPI.getUserInfo().catch((err)=>err), {
    // 브라우저 focus 됐을 때 재시작?
    retry: false,
    refetchOnWindowFocus: false,
    // 자동으로 가져오는 옵션
    enabled: true,
    // 캐시 타임
    staleTime: 10 * 600 * 1000,
    onSuccess: (res) => {
      if(res?.data?.body.data){
        setUser(res.data.body.data);
      }
    },
  });
}



export function useGetPostListAPI() {
  return useQuery(['posts'], () => PostAPI.getPostList().catch((err)=>err), {
    // 브라우저 focus 됐을 때 재시작?
    retry: false,
    refetchOnWindowFocus: true,
    // 자동으로 가져오는 옵션
    enabled: true,
    // 캐시 타임
    staleTime: 10 * 600 * 1000,
  });
}
 
export function useGetSearchPostList(title:string) {
  return useQuery(['search', title], () => PostAPI.searchPostList(title).catch((err)=>err), {
    // 브라우저 focus 됐을 때 재시작?
    retry: false,
    refetchOnWindowFocus: false,
    // 자동으로 가져오는 옵션
    enabled: false,
    // 캐시 타임
    staleTime: 10 * 600 * 1000,
  });
}
 

export function useGetCategoryList() {
  return useQuery(['categories'], () => CategoryAPI.getCategoryList().catch((err)=>err), {
    // 브라우저 focus 됐을 때 재시작?
    retry: false,
    refetchOnWindowFocus: false,
    // 자동으로 가져오는 옵션
    enabled: true,
    // 캐시 타임
    staleTime: 10 * 600 * 1000,
  });
}
 