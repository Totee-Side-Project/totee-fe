import com from '@assets/sms.svg';
import view from '@assets/visibility.svg';
import like from '@assets/favorite.svg';
import { IPostType } from 'types/post.types';
import classes from './postCard.module.scss';
import { useNavigate } from 'react-router-dom';
import { indexOf } from 'lodash';
import { motion, useAnimation } from 'framer-motion';

interface Props {
  post: IPostType;
  ref?: any;
}

export function PostCard({ post, ref }: Props) {
  let navigate = useNavigate();
  const clickHandlerURLParameter = () => {
    navigate(`/detail/${post.postId}`);
  };
  const item = {
    hidden: {
      opacity: 0,
      y: 50,
      transition: { ease: [0.78, 0.14, 0.15, 0.86] },
    },
    show: {
      opacity: 1,
      y: 0,
      transition: { ease: [0.78, 0.14, 0.15, 0.86] },
    },
  };
  return (
    <>
      <motion.li variants={item} initial="hidden" ref={ref}>
        <div className={classes.postCard} onClick={clickHandlerURLParameter}>
          <div className={classes.postWrapper}>
            <div className={classes.postImgWrapper}>
              <div className={classes.postImgBox}>
                <img className={classes.img} src={post?.imageUrl} />
                <div className={classes.postInfoName}>
                  {post?.position}
                  {post?.nickname}
                </div>
              </div>
              <div className={classes.postStatusWrapper}>
                {post?.status === 'Y' ? (
                  <div className={classes.postStatus}>모집중</div>
                ) : (
                  <div className={classes.postStatusNo}>모집완료</div>
                )}
              </div>
            </div>
            <div className={classes.postContentBox}>
              <div>
                <div className={classes.postTitle}>{post?.title}</div>
                <div
                  className={classes.postContent}
                  dangerouslySetInnerHTML={{ __html: post?.content }}
                ></div>
              </div>
              <div className={classes.postInfoBox}>
                <div className={classes.postInfoLine} />
                <div className={classes.postIconBox}>
                  <div className={classes.postInfo}>
                    <img src={like} /> {post?.likeNum}
                  </div>
                  <div className={classes.postInfo}>
                    <img src={com} />
                    {post?.commentNum}
                  </div>
                  <div className={classes.postInfo}>
                    <img src={view} /> {post?.view}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.li>
    </>
  );
}
