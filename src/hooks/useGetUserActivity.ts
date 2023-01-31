import { useEffect, useState } from 'react';

export const useGetUserActivity = (useGetPosts: any, useGetMembers: any) => {
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
