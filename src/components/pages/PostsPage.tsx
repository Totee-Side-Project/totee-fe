import React from 'react';
import { useGetAllPosts } from '@hooks/useGetQuery';

interface IPostType {
  categoryName: string;
  commentCount: number;
  commentDTOList: null | number[];
  content: string;
  createdAt: string;
  likeCount: number;
  major: string;
  nickname: string;
  postId: number;
  status: string;
  title: string;
  view: number;
}

export function PostsPage() {
  const { data, isFetching, isError } = useGetAllPosts();

  if (isFetching) {
    return <div>로딩중..</div>;
  }

  return (
    <>
      <h1>포스트 리스트 테스트 페이지 입니다.</h1>
      <div>
        {data.data.body.data.content.map((dt: IPostType) => (
          <div key={`post-${dt.postId}`}>{dt.title}</div>
        ))}
      </div>
    </>
  );
}
