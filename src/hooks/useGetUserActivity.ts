import { useState } from 'react';
import { UseQueryResult } from 'react-query';

export const useGetUserActivity = <T, U>(
  useGetPosts: () => UseQueryResult<T, unknown>,
  useGetMembers: (postId: number) => UseQueryResult<U, unknown>,
) => {
  const [currentPostId, setCurrentPostId] = useState(0);

  return {
    currentPostId,
    setCurrentPostId,
    posts: useGetPosts().data,
    members: useGetMembers(currentPostId).data,
  };
};
