import React from 'react';
import { Banner, Categories, PostList, Search } from '@components/common';
import BottomBanner from '@components/common/main/Banner/BottomBanner';
import { MentoSection, MentorReviewSection } from '@components/common';
import './MainPage.scss';
export function MainPage() {
  return (
    <div className="mainPage_section_wrapper">
      <section className="section">
        <Banner />
        <Search />
        {/* <Categories /> */}
      </section>
      <section className="body_section">
        <PostList />
      </section>
      <section className="body_section">
        <MentoSection type="recommend"/>
      </section>
      <MentorReviewSection/>
      <section className="body_section">
        <MentoSection type="best"/>
      </section>
      <section>
        <BottomBanner />
      </section>
    </div>
  );
}
