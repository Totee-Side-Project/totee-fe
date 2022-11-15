import { useMutation } from 'react-query';
import { PostAPI, UserAPI } from '@api/api';
import { useQueryClient } from 'react-query';

// export const useAddPost = () => {
//   const queryClient = useQueryClient();
//   return useMutation((form: any) => PostAPI.createPost(form), {
//     onSuccess: () => queryClient.invalidateQueries('post'),
//   });
// };

// const addTodo = async (newTodo: TodoType): Promise<TodoType> => {
//   const { data } = await axios.post<TodoType>(`/todos`, newTodo);
//   return data;
// };

export const useAddPost = (postAPI: (data: any) => Promise<any>) => {
  return useMutation((data: any) => postAPI(data), {
    // onSuccess: () => ('salertuccess'),
  });
};
// export const useAddPost = (postForm: (data?: any): Promise<any> => {} )=> {
//   return useMutation(postForm, {
//     onSuccess: () => alert('success'),
//   });
// };

export const useUpdatePost = (postId: number) => {
  const queryClient = useQueryClient();
  return useMutation((form: any) => PostAPI.upDatePost(postId, form), {
    onSuccess: () => queryClient.invalidateQueries(['post', postId]),
  });
};

export const useDeletePost = (postId: number) => {
  const queryClient = useQueryClient();
  return useMutation(() => PostAPI.deletePost(postId), {
    // queryClient에서 ['post', postId]를 component에서 업데이트가 일어날 때 query를 지워버려 error가 뜬다.
  });
};
