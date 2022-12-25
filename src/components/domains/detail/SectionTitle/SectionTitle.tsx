import { MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import Swal from 'sweetalert2';

import { useGetLikeofPost } from '@hooks/query/useGetQuery';
import { useUpdateLike } from '@hooks/query/useMutateQuery';
import { useDeletePost } from '@hooks/query/usePostQuery';
import { UserState } from '@store/user';
import { Icon, Select } from '@components/atoms';
import FullHeartIcon from '@assets/svg/common/full_heart.svg';
import HeartIcon from '@assets/svg/common/heart.svg';
import SettingIcon from '@assets/svg/common/setting.svg';
import { IResponsePostDetail } from 'types/api.types';
import classes from './sectionTitle.module.scss';

type SectionHeaderProps = Pick<
  IResponsePostDetail,
  | 'title'
  | 'onlineOrOffline'
  | 'recruitNum'
  | 'status'
  | 'period'
  | 'postId'
  | 'nickname'
>;

export const SectionTitle = (
  // eslint-disable-next-line no-undef
  props: Pick<SectionHeaderProps, 'title' | 'postId' | 'nickname'>,
) => {
  const { nickname: currentUserNickname } = useRecoilValue(UserState);
  const { data: isLikeData, status } = useGetLikeofPost(props.postId);
  const deletePostQuery = useDeletePost(props.postId);
  const updateLikeQuery = useUpdateLike(props.postId);
  const navigate = useNavigate();

  const updateLikeOnClick = () => updateLikeQuery.mutateAsync(props.postId);
  const handleOnClickBySelect = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const target = e.target as HTMLLIElement;
    const { innerText } = target;

    if (innerText === '글 수정') {
      navigate('/setupstudy');
      navigate(`/edit/${props.postId}`);
      return;
    }
    deletePostQuery.mutateAsync().then(
      (res) =>
        res.status === 200 &&
        Swal.fire({
          title: '게시물 삭제',
          text: '게시물 삭제가 완료되었습니다.',
          timer: 2000,
        })
          .then(() => navigate(-1))
          .catch((err) => err),
    );
  };

  return (
    <div className={classes.header_title_wrap}>
      <div className={classes.title_left}>
        <h1 className={classes.title_left}>{props.title}</h1>
      </div>
      <div className={classes.title_right}>
        <Icon
          className={classes.like_icon}
          src={isLikeData?.data.body.data ? FullHeartIcon : HeartIcon}
          alt="heart_icon"
          onClick={updateLikeOnClick}
        />
        {props.nickname == currentUserNickname && (
          <Select
            trigger={<Icon src={SettingIcon} alt="setting_icon" />}
            style={{
              width: '110px',
              right: 0,
              fontSize: '16px',
              textAlign: 'center',
            }}
            onChange={handleOnClickBySelect}
            options={['글 수정', '글 삭제']}
          />
        )}
      </div>
    </div>
  );
};
