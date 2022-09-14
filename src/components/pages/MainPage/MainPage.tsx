import React from 'react';
import { Banner, Categories, PostList, Search } from '@components/common';
import { RecommendMento } from '@components/common';

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
        <RecommendMento type="recommend"/>
      </section>
      <section className="section">
        <RecommendMento type="best"/>
      </section>
    </div>
  );
}
