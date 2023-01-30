import Skeleton from 'react-loading-skeleton';
import { useLocation, useNavigate } from 'react-router-dom';

import {
  OverLimitIcons,
  UnOverLimitIcons,
} from '@components/atoms/SkillIcon/SkillIcons';
import { Icon } from '@components/atoms';
import type { IResponsePostDetail } from 'types/api.types';
import { createMarkup } from '@utils/createMarkup';
import HeartIcon from '@assets/svg/common/heart.svg';
import EyeIcon from '@assets/svg/common/eye.svg';
import MessageIcon from '@assets/svg/common/message-square.svg';

import classes from './PostCard.module.scss';

interface PostCardProps {
  post: IResponsePostDetail;
}
interface OptionalProps {
  post?: IResponsePostDetail;
  styles?: {
    width: string;
    height: string;
  };
  setCurrentPostId?: React.Dispatch<React.SetStateAction<number>>;
}

export const PostCard = ({ post, styles, setCurrentPostId }: OptionalProps) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  if (!post) {
    return (
      <div className={classes.post_card_container} style={styles}>
        <PostCardHeaderSkeleton />
        <PostCardCenterSkeleton />
        <div className={classes.post_info_line} />
        <PostCardFooterSkeleton />
      </div>
    );
  }

  const clickHandler = () => {
    if (pathname === '/mypage') {
      setCurrentPostId && setCurrentPostId(post.postId);
      return;
    }
    navigate(`/detail/${post.postId}`);
  };

  return (
    <div
      className={classes.post_card_container}
      onClick={clickHandler}
      style={styles}
    >
      <PostCardHeader post={post} />
      <PostCardCenter post={post} />
      <div className={classes.post_info_line} />
      <PostCardFooter post={post} />
    </div>
  );
};

const PostCardHeader = ({ post }: PostCardProps) => {
  return (
    <div className={classes.post_card_header}>
      <div className={classes.post_card_header_wrap}>
        <div className={classes.post_card_header_left}>
          <div className={classes.post_card_img_wrap}>
            <Icon src={post.imageUrl} />
          </div>
          <div>{post.nickname}</div>
        </div>
        <PostCardStatusBadge post={post} />
      </div>
    </div>
  );
};

const PostCardHeaderSkeleton = () => {
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

const PostCardCenter = ({ post }: PostCardProps) => {
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
        <PostSkills post={post} />
      </div>
    </div>
  );
};
const PostCardCenterSkeleton = () => {
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

const PostCardFooter = ({ post }: PostCardProps) => {
  return (
    <div className={classes.post_card_footer}>
      <ul className={classes.post_card_footer_items}>
        {[
          [HeartIcon, 'heart_icon', post.likeNum],
          [MessageIcon, 'message_icon', post.commentNum],
          [EyeIcon, 'view_icon', post.view],
        ].map(([src, alt, data]) => (
          <li className={classes.post_card_footer_item} key={alt}>
            <Icon
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
const PostCardFooterSkeleton = () => {
  return (
    <div className={classes.post_card_footer}>
      <ul className={classes.post_card_footer_items}></ul>
    </div>
  );
};

const PostSkills = ({ post }: PostCardProps) => {
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

const PostCardStatusBadge = ({ post }: PostCardProps) => {
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
