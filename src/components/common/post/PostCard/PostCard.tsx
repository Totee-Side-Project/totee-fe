import Skeleton from 'react-loading-skeleton';
import { useNavigate } from 'react-router-dom';

import {
  OverLimitIcons,
  UnOverLimitIcons,
} from '@components/atoms/SkillIcon/SkillIcons';
import { NewIcon } from '@components/atoms/Icon/NewIcon';
import type { IResponsePostDetail } from 'types/api.types';
import { createMarkup } from '@utils/createMarkup';
import HeartIcon from '@assets/svg/common/heart.svg';
import EyeIcon from '@assets/svg/common/eye.svg';
import MessageIcon from '@assets/svg/common/message-square.svg';

import classes from './PostCard.module.scss';

interface NewPostCardProps {
  post: IResponsePostDetail;
}
interface OptionalProps {
  post?: IResponsePostDetail;
}

export const NewPostCard = ({ post }: OptionalProps) => {
  const navigate = useNavigate();
  const clickHandlerURLParameter = () => {
    post && navigate(`/detail/${post.postId}`);
  };

  if (!post) {
    return (
      <div className={classes.post_card_container}>
        <NewPostCardHeaderSkeleton />
        <NewPostCardCenterSkeleton />
        <div className={classes.post_info_line} />
        <NewPostCardFooterSkeleton />
      </div>
    );
  }

  return (
    <div
      className={classes.post_card_container}
      onClick={clickHandlerURLParameter}
    >
      <NewPostCardHeader post={post} />
      <NewPostCardCenter post={post} />
      <div className={classes.post_info_line} />
      <NewPostCardFooter post={post} />
    </div>
  );
};
// };

const NewPostCardHeader = ({ post }: NewPostCardProps) => {
  return (
    <div className={classes.post_card_header}>
      <div className={classes.post_card_header_wrap}>
        <div className={classes.post_card_header_left}>
          <div className={classes.post_card_img_wrap}>
            <NewIcon src={post.imageUrl} />
          </div>
          <div>{post.nickname}</div>
        </div>
        <NewPostCardStatusBadge post={post} />
      </div>
    </div>
  );
};

const NewPostCardHeaderSkeleton = () => {
  return (
    <div className={classes.post_card_header}>
      <div className={classes.post_card_header_wrap}>
        <div className={classes.post_card_header_left}>
          <div className={classes.post_card_img_wrap}>
            <Skeleton circle width={35} height={35} />
          </div>
        </div>
      </div>
    </div>
  );
};

const NewPostCardCenter = ({ post }: NewPostCardProps) => {
  return (
    <div className={classes.post_card_center}>
      <div className={classes.post_card_title}>
        <h2>{post.title}</h2>
      </div>
      <div
        className={classes.post_card_content}
        dangerouslySetInnerHTML={createMarkup(post.content)}
      />
      <div className={classes.post_card_skills_wrap}>
        <NewPostSkills post={post} />
      </div>
    </div>
  );
};
const NewPostCardCenterSkeleton = () => {
  return (
    <div className={classes.post_card_center}>
      <div className={classes.post_card_title}>
        <h2>
          <Skeleton />
        </h2>
      </div>
      <div className={classes.post_card_content}>
        <Skeleton count={3} />
      </div>
      <div className={classes.post_card_skills_wrap}></div>
    </div>
  );
};

const NewPostCardFooter = ({ post }: NewPostCardProps) => {
  return (
    <div className={classes.post_card_footer}>
      <ul className={classes.post_card_footer_items}>
        {[
          [HeartIcon, 'heart_icon', post.likeNum],
          [MessageIcon, 'message_icon', post.commentNum],
          [EyeIcon, 'view_icon', post.view],
        ].map(([src, alt, data]) => (
          <li className={classes.post_card_footer_item} key={alt}>
            <NewIcon
              src={src as string}
              alt="heart_icon"
              style={{ width: '20px', height: '20px' }}
            />
            <div>{data}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};
const NewPostCardFooterSkeleton = () => {
  return (
    <div className={classes.post_card_footer}>
      <ul className={classes.post_card_footer_items}></ul>
    </div>
  );
};

const NewPostSkills = ({ post }: NewPostCardProps) => {
  return (
    <>
      {post.skillList.length >= 5 ? (
        <OverLimitIcons list={post.skillList} limit={5} />
      ) : (
        <UnOverLimitIcons list={post.skillList} />
      )}
    </>
  );
};

const NewPostCardStatusBadge = ({ post }: NewPostCardProps) => {
  return (
    <div
      className={
        post.status === 'Y'
          ? classes.status_badge
          : [classes.status_badge, classes.status_badge_no].join(' ')
      }
    >
      {post.status === 'Y' ? '모집중' : '모집완료'}
    </div>
  );
};
