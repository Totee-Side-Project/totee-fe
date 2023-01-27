import { useState } from 'react';

export const useUserActivity = (useGetPosts: any, useGetMembers?: any) => {
  const [currentPostId, setCurrentPostId] = useState<number | undefined>();
  const { data: posts } = useGetPosts();

  return {
    setCurrentPostId,
    posts,
    members: useGetMembers ? useGetMembers(currentPostId).data : '',
  };
};
