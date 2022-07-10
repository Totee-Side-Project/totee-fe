import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './showPost.module.scss';
import { IPostType } from '../../types/post.types';
import classes from './showPost.module.scss';

interface Props {
  post: IPostType;
}
// { post }: Props
function ShowPostCard() {
  const [post, setPosts] = useState({
    status: '',
    title: '',
    content: '',
    author: '',
    likeNum: '',
    commentNum: '',
    view: '',
    position: '',
    imageUrl: '',
    onlineOrOffline: '',
    period: '',
  });

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          'https://api.totee.link/api/v1/post/1',
        );
        setPosts(response.data.body.data.content);
      } catch (e) {
        console.log('no');
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className={classes.postCard}>
      <div className={classes.postWrapper}>
        <div className={classes.postImgWrapper}>
          <div className={classes.postImgBox}>
            <img className={classes.img} src={post.imageUrl} />
          </div>
          <div className={classes.postImgBox}>
            <img className={classes.img} src={post.imageUrl} />
          </div>
          <div className={classes.postImgBox}>
            <img className={classes.img} src={post.imageUrl} />
          </div>
        </div>
        <div className={classes.postContentBox}>
          <div>
            <div className={classes.postTitle}>{post.title}</div>
            <div className={classes.postContent}>{post.content}</div>
          </div>
        </div>
        <div className={classes.postTagWrapper}>
          <div className={classes.postTag}>
            {post?.onlineOrOffline === 'ON' ? (
              <div># 온라인</div>
            ) : (
              <div># 오프라인</div>
            )}
          </div>
          <div className={classes.postTag}># {post.period}개월</div>
          <div className={classes.postTag}>
            {post?.status === 'Y' ? <div># 모집중</div> : <div># 모집완료</div>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShowPostCard;
