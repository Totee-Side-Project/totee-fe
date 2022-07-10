import React from 'react';
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

  return (
    <>
      <h1>포스트 리스트 테스트 페이지 입니다.</h1>
      
    </>
  );
}
