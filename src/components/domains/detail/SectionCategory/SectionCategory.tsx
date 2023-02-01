import { useRecoilValue } from 'recoil';

import { useUpdatePostStatus } from '@hooks/query/useMutateQuery';
import { UserState } from '@store/user';
import { checkingDetailPeriod } from '@utils/handleSelectValue';
import classes from './sectionCategory.module.scss';
import { IPost } from '@api/post/types';

type SectionHeaderProps = Pick<
  IPost,
  | 'title'
  | 'onlineOrOffline'
  | 'recruitNum'
  | 'status'
  | 'period'
  | 'postId'
  | 'nickname'
>;

interface SectionCategoryProps
  extends Pick<
    SectionHeaderProps,
    'recruitNum' | 'onlineOrOffline' | 'status' | 'period' | 'postId'
  > {
  nickName: string;
}

export const SectionCategory = ({
  nickName,
  recruitNum,
  onlineOrOffline,
  status,
  period,
  postId,
}: SectionCategoryProps) => {
  const updatePostStatusQuery = useUpdatePostStatus(postId);
  const { nickname: currentUserNickname } = useRecoilValue(UserState);
  const changeStatusOnClickByButton = () => {
    updatePostStatusQuery.mutateAsync();
  };

  return (
    <div className={classes.category_wrap}>
      <div className={classes.flex_wrap + ' ' + classes.category_left}>
        <div className={classes.category_item}>{onlineOrOffline}</div>
        <div className={classes.category_item}>{recruitNum + '명'}</div>
        <div className={classes.category_item}>
          {checkingDetailPeriod(period)}
        </div>
      </div>
      <div className={classes.category_right}>
        {nickName === currentUserNickname ? (
          <div
            className={
              status === 'Y'
                ? [classes.status_button, classes.hover].join(' ')
                : [classes.status_button, classes.hover, classes.false].join(
                    ' ',
                  )
            }
            onClick={changeStatusOnClickByButton}
          >
            {status === 'Y' ? '모집중' : '모집완료'}
          </div>
        ) : (
          <div
            className={
              status === 'Y'
                ? classes.status_button
                : [classes.status_button, classes.false].join(' ')
            }
          >
            {status === 'Y' ? '모집중' : '모집완료'}
          </div>
        )}
      </div>
    </div>
  );
};
