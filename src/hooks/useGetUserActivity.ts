import { useEffect, useState } from 'react';
import { UseQueryResult } from 'react-query';

export const useGetUserActivity = <T, U>(
  useGetPosts: () => UseQueryResult<T, unknown>,
  useGetMembers: (
    postId: number,
    options?: { enabled: boolean },
  ) => UseQueryResult<U, unknown>,
) => {
  const { data: posts } = useGetPosts();
  const [currentPostId, setCurrentPostId] = useState(-1);
  const { data: members, refetch: getMembers } = useGetMembers(currentPostId, {
    enabled: false,
  });

  useEffect(() => {
    if (currentPostId !== -1) {
      getMembers();
    }
  }, [currentPostId]);

  return {
    currentPostId,
    setCurrentPostId,
    posts,
    members,
  };
};
