import { useMutation, useQueryClient } from 'react-query';

import { queryKeys } from './queryKeys';
import Swal from 'sweetalert2';
import axios, { AxiosError } from 'axios';
import _ from 'lodash';
import { UserAPI } from '@api/user';
import { CommentAPI } from '@api/comment';
import { ReplyAPI } from '@api/reply';
import { PostAPI } from '@api/post';
import { LikeAPI } from '@api/like';
import { AlarmAPI } from '@api/alarm';
import { ApplicationAPI } from '@api/application';
import { TeamAPI } from '@api/team';
import { IRequestReply } from '@api/reply/types';
import { IPostTeamRequestFormData } from '@api/post/types';
import { MentoringAPI } from '@api/mentoring';
import { IApplyMentoringRequestDto } from '@api/mentoring/types';

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
    onError: () => alert('사용자 정보 수정을 실패했습니다.'),
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
  return useMutation(() => ApplicationAPI.deleteApplicant(postId));
};

export const usePostTeam = (postId: number) => {
  const queryClient = useQueryClient();
  return useMutation(
    (formData: IPostTeamRequestFormData) => TeamAPI.postTeam(postId, formData),
    {
      onSuccess: () => {
        Swal.fire({
          title: '성공',
          text: '성공적으로 처리되었습니다.',
          icon: 'success',
          confirmButtonText: '확인',
          timer: 3000,
        });
        queryClient.invalidateQueries(queryKeys.applicant(postId));
        queryClient.invalidateQueries(queryKeys.studyMembers(postId));
      },
      onError: () => {
        Swal.fire({
          title: '실패',
          text: '실패하였습니다.',
          icon: 'error',
          confirmButtonText: '확인',
          timer: 3000,
        });
      },
    },
  );
};

export const useResignateStudyMember = (postId: number, nickname: string) => {
  const queryClient = useQueryClient();
  return useMutation(() => TeamAPI.resignateTeam(postId, nickname), {
    onSuccess: () => {
      Swal.fire({
        title: '성공',
        text: '멤버를 추방하였습니다.',
        icon: 'success',
        confirmButtonText: '확인',
        timer: 3000,
      });
      queryClient.invalidateQueries(queryKeys.studyMembers(postId));
    },
    onError: () => {
      Swal.fire({
        title: '실패',
        text: '멤버를 추방하는데 실패하였습니다.',
        icon: 'error',
        confirmButtonText: '확인',
        timer: 3000,
      });
    },
  });
};

export const useValidateNickName = () => {
  return useMutation(
    (userNickName: string) => UserAPI.validateNickname(userNickName),
    {
      onError: () => {
        Swal.fire({
          title: '실패',
          text: '이미 존재하는 닉네임입니다.',
          icon: 'error',
          confirmButtonText: '확인',
          timer: 3000,
        });
      },
    },
  );
};

export const useAcceptMentoringApplicants = (mentoringId: number) => {
  const queryClient = useQueryClient();
  return useMutation(
    (formData: IPostTeamRequestFormData) =>
      TeamAPI.acceptMentoringApplicants(mentoringId, formData),
    {
      onSuccess: () => {
        Swal.fire({
          title: '성공',
          text: '성공적으로 처리되었습니다.',
          icon: 'success',
          confirmButtonText: '확인',
          timer: 3000,
        });
        queryClient.invalidateQueries(
          queryKeys.mentoringApplicants(mentoringId),
        );
        queryClient.invalidateQueries(queryKeys.mentoringMembers(mentoringId));
      },
      onError: () => {
        Swal.fire({
          title: '실패',
          text: '실패하였습니다.',
          icon: 'error',
          confirmButtonText: '확인',
          timer: 3000,
        });
      },
    },
  );
};

export const useApplyMentoring = () => {
  return useMutation(
    (payload: IApplyMentoringRequestDto) =>
      MentoringAPI.applyMentoring(payload),
    {},
  );
};
