import { useMutation, useQueryClient } from 'react-query';

import {
  AlarmAPI,
  ApplicationAPI,
  CommentAPI,
  LikeAPI,
  PostAPI,
  ReplyAPI,
  TeamAPI,
  UserAPI,
} from '@api/api';
import { IPostTeamRequestFormData, IResponsePostDetail } from 'types/api.types';
import { queryKeys } from '.';
import { IRequestReply } from 'types/api.types';
import Swal from 'sweetalert2';
import axios, { Axios, AxiosError, AxiosResponse } from 'axios';
import _ from 'lodash';

export const useAddUserInfo = () => {
  const queryClient = useQueryClient();
  return useMutation((form: any) => UserAPI.addUserInfo(form), {
    onSuccess: () => queryClient.invalidateQueries(queryKeys.user),
  });
};

export const useAddComment = (postId: number) => {
  const queryClient = useQueryClient();
  return useMutation((form: any) => CommentAPI.createComment(form), {
    onSuccess: () => queryClient.invalidateQueries(queryKeys.post(postId)),
  });
};

export const useUpdateComment = (postId: number, commentId: number) => {
  const queryClient = useQueryClient();
  return useMutation((form: any) => CommentAPI.updateComment(commentId, form), {
    onSuccess: () => queryClient.invalidateQueries(queryKeys.post(postId)),
  });
};

export const useDeleteComment = (postId: number, commentId: number) => {
  const queryClient = useQueryClient();
  return useMutation(() => CommentAPI.deleteComment(commentId), {
    onSuccess: () => queryClient.invalidateQueries(queryKeys.post(postId)),
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
  return useMutation((form: IRequestReply) => ReplyAPI.createReply(form), {
    onSuccess: () => {
      queryClient.invalidateQueries(queryKeys.post(postId));
    },
  });
};

export const useUpdateReply = (postId: number, replyId: number) => {
  const queryClient = useQueryClient();
  return useMutation((form: any) => ReplyAPI.updateReply(replyId, form), {
    onSuccess: () => queryClient.invalidateQueries(queryKeys.post(postId)),
  });
};

export const useDeleteReply = (postId: number, replyId: number) => {
  const queryClient = useQueryClient();
  return useMutation(() => ReplyAPI.deleteReply(replyId), {
    onSuccess: () => queryClient.invalidateQueries(queryKeys.post(postId)),
  });
};

export const useUpdatePostStatus = (postId: number) => {
  const queryClient = useQueryClient();
  return useMutation(() => PostAPI.statusChange(postId), {
    onSuccess: () => {
      queryClient.invalidateQueries(queryKeys.post(postId));
    },
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation((form: any) => UserAPI.updateUserInfo(form), {
    onSuccess: () => queryClient.invalidateQueries(queryKeys.user),
  });
};

export const useUpdateLike = (postId: number) => {
  const queryClient = useQueryClient();
  return useMutation((postId: any) => LikeAPI.postLike(postId), {
    onSuccess: () => {
      queryClient.invalidateQueries('posts');
      queryClient.invalidateQueries(queryKeys.post(postId));
      queryClient.invalidateQueries(queryKeys.likePost(postId));
    },
  });
};

export const useUpdateAlarm = (notificationId: string) => {
  const queryClient = useQueryClient();
  return useMutation(() => AlarmAPI.updateAlarm(notificationId), {
    onSuccess: () => queryClient.invalidateQueries(queryKeys.alarms),
  });
};

export const useUpdateApplicant = (postId: number) => {
  const queryClient = useQueryClient();
  return useMutation(
    (message: string) => ApplicationAPI.postApplicant(postId, message),
    {
      onSuccess: () => {
        Swal.fire({
          title: '지원 성공',
          text: '작성자에 의해 승인/거절 될 수 있습니다.',
          icon: 'success',
          confirmButtonText: '확인',
          timer: 3000,
        }).then(() => {
          queryClient.invalidateQueries(queryKeys.applicant(postId));
        });
      },
      onError: (error: AxiosError<{ msg: string }>) => {
        if (axios.isAxiosError(error)) {
          Swal.fire({
            title: '지원 실패',
            text: error.response?.data.msg || '지원을 실패했어요',
            icon: 'error',
            confirmButtonText: '확인',
            timer: 3000,
          });
        }
        return queryClient.invalidateQueries(queryKeys.applicant(postId));
      },
      // useErrorBoundary: (error) => error.response?.status >= 400,
    },
  );
};

export const useDeleteApplicant = (postId: string | undefined) => {
  const queryClient = useQueryClient();
  return useMutation(() => ApplicationAPI.deleteApplicant(postId), {
    onSuccess: () => {},
  });
};

export const usePostTeam = (postId: number) => {
  const queryClient = useQueryClient();
  return useMutation(
    (formData: IPostTeamRequestFormData) => TeamAPI.postTeam(postId, formData),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(queryKeys.applicant(postId));
      },
    },
  );
};
export const useResignateTeam = (postId: number) => {
  const queryClient = useQueryClient();
  return useMutation(() => TeamAPI.resignateTeam(postId));
};

export const useValidateUserNickName = (userNickName: string) => {
  return useMutation(() => UserAPI.validateNickname(userNickName), {
    onSuccess: (res) => {
      console.log(res);
    },
    onError: (err) => {
      console.log(err.response);
    },
  });
};
