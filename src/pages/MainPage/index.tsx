import { StudySection } from '@components/common';
import BottomBanner from '@components/common/main/Banner/BottomBanner';
import { MentoSection, MentorReviewSection } from '@components/common';
import LetterBanner from '@components/common/main/Banner/LetterBanner';
import RecommendMentoringPostsSection from '@components/common/section/RecommendMentoringPostsSection/RecommendMentoringPostsSection';
import { SearchSection } from '@components/atoms/Search';
import './MainPage.scss';

const MainPage = () => {
  return (
    <div className="mainPage_section_wrapper">
      <SearchSection />
      <section className="study_section">
        <StudySection />
      </section>
      <section className="mento_recommend body_section">
        <RecommendMentoringPostsSection />
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
