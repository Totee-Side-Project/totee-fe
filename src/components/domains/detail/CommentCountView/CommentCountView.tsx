import { Icon } from '@components/atoms';
import HeartIcon from '@assets/svg/common/heart.svg';
import EyeIcon from '@assets/svg/common/eye.svg';
import MessageIcon from '@assets/svg/common/message-square.svg';
import classes from './CommentCountView.module.scss';
import { IPost } from '@api/post/types';

export const CommentCountView = (
  props: Pick<IPost, 'likeNum' | 'commentNum' | 'view'>,
) => {
  const footerItems = {
    like: [HeartIcon, props.likeNum],
    comment: [MessageIcon, props.commentNum],
    view: [EyeIcon, props.view],
  };

  const createFooterItems = () => {
    return Object.entries(footerItems).map(([key, [src, value]], index) => (
      <div key={key + index} className={classes.footer_item_wrap}>
        <Icon src={src as string} alt={`${key}_icon`} onClick={() => {}} />
        {value}
      </div>
    ));
  };

  return (
    <div className={classes.footer_item_list_wrap}>{createFooterItems()}</div>
  );
};
