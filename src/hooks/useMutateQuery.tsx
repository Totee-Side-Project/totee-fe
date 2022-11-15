import { useMutation, useQuery } from 'react-query';
import {
  AlarmAPI,
  ApplicationAPI,
  CommentAPI,
  LikeAPI,
  PostAPI,
  ReplyAPI,
  UserAPI,
} from '@api/api';
import { useQueryClient } from 'react-query';
export interface IReplyRequest {
  commentId: number;
  content: string;
}

export const useAddUserInfo = () => {
  const queryClient = useQueryClient();
  return useMutation((form: any) => UserAPI.addUserInfo(form), {
    onSuccess: () => queryClient.invalidateQueries('user'),
  });
};

export const useAddComment = (postId: number) => {
  const queryClient = useQueryClient();
  return useMutation((form: any) => CommentAPI.createComment(form), {
    onSuccess: () => queryClient.invalidateQueries(['post', postId]),
  });
};

export const useUpdateComment = (postId: number, commentId: number) => {
  const queryClient = useQueryClient();
  return useMutation((form: any) => CommentAPI.updateComment(commentId, form), {
    onSuccess: () => queryClient.invalidateQueries(['post', postId]),
  });
};

export const useDeleteComment = (postId: number, commentId: number) => {
  const queryClient = useQueryClient();
  return useMutation(() => CommentAPI.deleteComment(commentId), {
    onSuccess: () => queryClient.invalidateQueries(['post', postId]),
    onError: () => {
      throw new Error(`
      에러가 지속될 경우 해당 이메일로 문의해주세요.
      <br />
      toteedev@gmail.com`);
    },
  });
};

export const useAddReply = (postId: number) => {
  const queryClient = useQueryClient();
  return useMutation((form: IReplyRequest) => ReplyAPI.createReply(form), {
    onSuccess: () => {
      queryClient.invalidateQueries(['post', postId]);
    },
  });
};

export const useUpdateReply = (postId: number, replyId: number) => {
  const queryClient = useQueryClient();
  return useMutation((form: any) => ReplyAPI.updateReply(replyId, form), {
    onSuccess: () => queryClient.invalidateQueries(['post', postId]),
  });
};

export const useDeleteReply = (postId: number, replyId: number) => {
  const queryClient = useQueryClient();
  return useMutation(() => ReplyAPI.deleteReply(replyId), {
    onSuccess: () => queryClient.invalidateQueries(['post', postId]),
  });
};

export const useUpdatePostStatus = (postId: number) => {
  const queryClient = useQueryClient();
  return useMutation(() => PostAPI.statusChange(postId), {
    onSuccess: () => {
      queryClient.invalidateQueries(['post', postId]);
    },
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation((form: any) => UserAPI.updateUserInfo(form), {
    onSuccess: () => queryClient.invalidateQueries('user'),
  });
};

export const useUpdateLike = (postId: string | number) => {
  const queryClient = useQueryClient();
  return useMutation((postId: any) => LikeAPI.postLike(postId), {
    onSuccess: () => {
      queryClient.invalidateQueries('posts');
      queryClient.invalidateQueries(['post', postId]);
      queryClient.invalidateQueries(['like', postId]);
    },
  });
};

export const useUpdateAlarm = (notificationId: string) => {
  const queryClient = useQueryClient();
  return useMutation(() => AlarmAPI.updateAlarm(notificationId), {
    onSuccess: () => queryClient.invalidateQueries('alarms'),
  });
};

export const useUpdateApplicant = (postId: string | undefined) => {
  const queryClient = useQueryClient();
  return useMutation(
    (message: string) => ApplicationAPI.postApplicant(postId, message),
    {
      onSuccess: () => queryClient.invalidateQueries(['applicant', postId]),
    },
  );
};

export const useDeleteApplicant = (postId: string | undefined) => {
  const queryClient = useQueryClient();
  return useMutation(() => ApplicationAPI.deleteApplicant(postId), {
    onSuccess: () => {},
  });
};
