import React from 'react';
import { Banner, Categories, PostList, Search } from '@components/common';
import { RecommendCard } from '@components/common';
import BottomBanner from '@components/common/main/Banner/BottomBanner';

export function MainPage() {
  return (
    <div className="mainPage_section_wrapper">
      <section className="section">
        <Banner />
        <Search />
        <Categories />
      </section>
      <section className="section">
        <PostList />
      </section>
      <section className="section">
        <RecommendCard />
      </section>
      <section>
        <BottomBanner />
      </section>
    </div>
  );
}
