import { useState } from 'react';

export const useUserActivity = (useGetPosts, useGetMembers) => {
  const [currentPostId, setCurrentPostId] = useState<number | undefined>();
  const { data: posts } = useGetPosts();

  return {
    setCurrentPostId,
    posts,
    members: useGetMembers ? useGetMembers(currentPostId).data : '',
  };
};
