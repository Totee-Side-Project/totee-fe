import PostCard from '@components/post/postCard';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

function PostList() {
  const [posts, setPosts] = useState({
    status: '',
    title: '',
    content: '',
    author: '',
    likeNum: '',
    commentNum: '',
    view: '',
    position: '',
    imageUrl: '',
  });

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          'https://api.totee.link/api/v1/post/list',
        );
        setPosts(response.data.body.data.content);
      } catch (e) {
        console.log('no');
      }
    };
    fetchPosts();
  }, []);

  // console.log(posts);

  return (
    <div>
      <div>
        <PostCard post={posts[0]} />
        <PostCard post={posts[1]} />
      </div>
    </div>
  );
}

export default PostList;
