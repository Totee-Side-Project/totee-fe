import React from 'react';
import { Counter, Modal } from '@components/atoms';
import { Banner, Categories, PostList, Search } from '@components/common';
import RecommendCard from '@components/common/RecommendCard/RecommendCard';

export function MainPage() {
  return (
    <div>
      <Banner />
      <Search />
      <Categories />
      <PostList />
      <RecommendCard />
    </div>
  );
}
