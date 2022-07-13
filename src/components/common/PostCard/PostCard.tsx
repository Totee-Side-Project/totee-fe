
import com from '@assets/sms.svg';
import view from '@assets/visibility.svg';
import like from '@assets/favorite.svg';
import { IPostType } from 'types/post.types';
import classes from './postCard.module.scss';

interface Props {
  post: IPostType;
}


export function PostCard({ post }: Props) {
  return (
    <>
      <div className={classes.postCard}>
        <div className={classes.postWrapper}>
          <div className={classes.postImgWrapper}>
            <div className={classes.postImgBox}>
              <img className={classes.img} src={post?.imageUrl} />
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
              <div className={classes.postContent} dangerouslySetInnerHTML={{__html:post?.content}}></div>
            </div>
            <div className={classes.postInfoBox}>
              <div className={classes.postInfoName}>
                {post?.position}
                {post?.author}
              </div>
              <div className={classes.postIconBox}>
                <div className={classes.postInfo}>
                  <img src={com} />
                  {post?.commentNum}
                </div>
                <div className={classes.postInfo}>
                  <img src={view} /> {post?.view}
                </div>
                <div className={classes.postInfo}>
                  <img src={like} /> {post?.likeNum}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

