import { useMutation } from 'react-query';
import { PostAPI, UserAPI } from '@api/api';
import { useQueryClient } from 'react-query';
import { queryKeys } from './query';

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

// post
export const useAddPost = (postAPI: (data: any) => Promise<any>) => {
  return useMutation((data: any) => postAPI(data));
};
// export const useAddPost = (postForm: (data?: any): Promise<any> => {} )=> {
//   return useMutation(postForm, {
//     onSuccess: () => alert('success'),
//   });
// };

export const useUpdatePost = (postId: number) => {
  const queryClient = useQueryClient();
  return useMutation((form: any) => PostAPI.upDatePost(postId, form), {
    onSuccess: () => queryClient.invalidateQueries(queryKeys.post(postId)),
  });
};

// redirect 해주기 때문에 invalidateQueries해줄 필요 없다.
// 또한 redirect하기 전에 데이터를 지워버려 refetch가 일어나게 되면 url은 그대로인데 데이터만 없어 에러가 발생한다.
export const useDeletePost = (postId: number) => {
  return useMutation(() => PostAPI.deletePost(postId), {});
};
