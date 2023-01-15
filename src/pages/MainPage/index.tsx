import { SearchSection, StudySection } from '@components/common';
import BottomBanner from '@components/common/main/Banner/BottomBanner';
import { MentoSection, MentorReviewSection } from '@components/common';
import LetterBanner from '@components/common/main/Banner/LetterBanner';
import './MainPage.scss';
import RecommendedMentoringPostsSection from '@components/common/section/RecommendedMentoringPostsSection/RecommendedMentoringPostsSection';

const MainPage = () => {
  return (
    <div className="mainPage_section_wrapper">
      {/* <section className="hero"><Categories /></section> */}
      <SearchSection />
      <section className="study_section">
        <StudySection />
      </section>
      <section className="mento_recommend body_section">
        <RecommendedMentoringPostsSection />
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
};

export default MainPage;
