import { AxiosResponse } from 'axios';
import Swal from 'sweetalert2';

import { PostAPI } from '@api/api';
import { PostRequestDto } from '@api/requestType';
import { useCustomNavigate } from '@hooks/useCustomNavigate';
import { useAddPost, useUpdatePost } from '@hooks/usePostQuery';
import { validateFormData } from '@utils/validateData';

interface SubmitButtonProps {
  className: string;
  form: PostRequestDto;
  id?: number;
}
export const SubmitButton = ({ className, form, id }: SubmitButtonProps) => {
  // 폼 data를 mutate 해주는 것은 버튼의 역할이다.
  const addPostMutation = useAddPost(PostAPI.createPost);
  const updatePostMutation = !id ? null : useUpdatePost(id);
  const { navigateRoot } = useCustomNavigate();

  const handleClick = async () => {
    const formData = new FormData();
    if (form.onlineOrOffline === '온라인') {
      Object.entries(form).forEach(([key, value]) => {
        if (key === 'region' || key === 'detailedRegion') return;
        formData.append(key, String(value));
      });
    } else {
      Object.entries(form).forEach(([key, value]) => {
        formData.append(key, String(value));
      });
    }
    if (!validateFormData(formData))
      return Swal.fire({
        title: '등록 실패',
        text: '모든 정보를 입력해주세요!',
        icon: 'warning',
        confirmButtonText: '확인',
      });

    // if (updatePostMutation)
    const response: AxiosResponse = updatePostMutation
      ? await updatePostMutation.mutateAsync(formData)
      : await addPostMutation.mutateAsync(formData);

    if (response.status === 200) {
      await Swal.fire({
        title: '등록 완료',
        text: '마이페이지에서 확인하세요',
        icon: 'success',
        confirmButtonText: '확인',
      }).then(navigateRoot);
      // 홈으로 네비게이트
      return;
    }
    await Swal.fire({
      title: '등록 실패',
      text: '재 접속후 다시 작성해주세요',
      icon: 'error',
      confirmButtonText: '확인',
    });
  };

  return (
    <button className={className} onClick={handleClick}>
      글 올리기
    </button>
  );
};
