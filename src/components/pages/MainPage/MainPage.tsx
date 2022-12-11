// import MentorPostViewModal from '@components/common/mentor/Modal/MentorPostViewModal';
// import React, { useState } from 'react';
import {
  Banner,
  // Categories,
  // PostList,
  Search,
  StudySection,
} from '@components/common';
import BottomBanner from '@components/common/main/Banner/BottomBanner';
import { MentoSection, MentorReviewSection } from '@components/common';
import LetterBanner from '@components/common/main/Banner/LetterBanner';
import './MainPage.scss';

export function MainPage() {
  return (
    <div className="mainPage_section_wrapper">
      <section className="hero">
        <Banner />
        {/* <Categories /> */}
      </section>
      <section className="search">
        <Search />
      </section>
      {/* <section className="post body_section">
        <PostList />
      </section> */}
      <section className="study_section">
        <StudySection />
      </section>
      <section className="mento_recommend body_section">
        {/* <button onClick={() => setIsOpenMentorPostViewModal(true)}>모달</button> */}
        <MentoSection type="recommend" />
        {/* <MentorPostViewModal
          isOpen={isOpenMentorPostViewModal}
          setIsOpen={setIsOpenMentorPostViewModal}
        /> */}
      </section>
      <MentorReviewSection />
      <section className="best_mento body_section">
        <MentoSection type="best" />
      </section>
      <section>
        <LetterBanner />
      </section>
      <section>
        <BottomBanner />
      </section>
    </div>
  );
}
