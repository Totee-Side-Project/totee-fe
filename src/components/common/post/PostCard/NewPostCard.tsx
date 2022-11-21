import { NewIcon } from '@components/atoms/Icon/NewIcon';
import type { IResponsePostDetail } from '@components/pages/DetailPage/NewDetailPage';
import { PostCard } from './PostCard';
import classes from './newPostCard.module.scss';
import { createMarkup } from '@utils/createMarkup';
import { useNavigate } from 'react-router-dom';
import HeartIcon from '@assets/svg/common/heart.svg';
import EyeIcon from '@assets/svg/common/eye.svg';
import MessageIcon from '@assets/svg/common/message-square.svg';
import icon from '@components/common/svg';

interface NewPostCardProps {
  post: IResponsePostDetail;
}

export const NewPostCard = ({ post }: NewPostCardProps) => {
  const navigate = useNavigate();
  const clickHandlerURLParameter = () => {
    navigate(`/detail/${post.postId}`);
  };
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

const NewPostCardCenter = ({ post }: NewPostCardProps) => {
  console.log(post.skillList);
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
        <ul className={classes.post_card_skills}>
          {post.skillList.map((skill) => (
            <li className={classes.post_card_skill} key={skill}>
              <img src={icon[skill]} alt="" />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const NewPostCardFooter = ({ post }: NewPostCardProps) => {
  post.commentNum;
  post.likeNum;
  post.recruitNum;
  // like, comment, view
  return (
    <div className={classes.post_card_footer}>
      <ul className={classes.post_card_footer_items}>
        <li className={classes.post_card_footer_item}>
          <NewIcon
            src={HeartIcon}
            alt="heart_icon"
            style={{ width: '20px', height: '20px' }}
          />
          <div>{post.likeNum}</div>
        </li>
        <li className={classes.post_card_footer_item}>
          <NewIcon
            src={EyeIcon}
            alt="eye_icon"
            style={{ width: '20px', height: '20px' }}
          />
          <div>{post.commentNum}</div>
        </li>
        <li className={classes.post_card_footer_item}>
          <NewIcon
            src={MessageIcon}
            alt="message_icon"
            style={{ width: '20px', height: '20px' }}
          />
          <div>{post.view}</div>
        </li>
      </ul>
    </div>
  );
};

const NewPostCardStatusBadge = ({ post }: NewPostCardProps) => {
  // background-color: #878787;
  // color: #fff;
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
