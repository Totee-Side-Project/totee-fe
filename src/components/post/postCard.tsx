import './post.scss';
import com from '../../assets/sms.svg';
import view from '../../assets/visibility.svg';
import like from '../../assets/favorite.svg';
import { Post } from '../../types/post.types';

interface Props {
  post: Post;
}

function PostCard({ post }: Props) {
  return (
    <>
      <div className="postCard">
        <div className="postWrapper">
          <div className="postImgWrapper">
            <div className="postImgBox">
              <img className="img" src={post.imageUrl} />
            </div>
            <div className="postStatusWrapper">
              {post.status === 'Y' ? (
                <div className="postStatus">모집중</div>
              ) : (
                <div className="postStatusNo">모집완료</div>
              )}
            </div>
          </div>
          <div className="postContentBox">
            <div>
              <div className="postTitle">{post.title}</div>
              <div className="postContent">{post.content}</div>
            </div>
            <div className="postInfoBox">
              <div className="postInfoName">
                {post.position}
                {post.author}
              </div>
              <div className="postIconBox">
                <div className="postInfo">
                  <img src={com} />
                  {post.commentNum}
                </div>
                <div className="postInfo">
                  <img src={view} /> {post.view}
                </div>
                <div className="postInfo">
                  <img src={like} /> {post.likeNum}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PostCard;
