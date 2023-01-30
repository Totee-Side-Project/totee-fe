import { useState } from 'react';

export const useUserActivity = (useGetPosts, useGetMembers) => {
  const [currentPostId, setCurrentPostId] = useState(-1);

  return {
    currentPostId,
    setCurrentPostId,
    posts: useGetPosts().data,
    members: useGetMembers(currentPostId).data,
  };
};
