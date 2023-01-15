import { SectionTitle } from '@components/atoms';
import RecommendMentorCard from '@components/common/card/RecommentMentorCard/RecommendMentorCard';
import { useRef } from 'react';
import Slider from 'react-slick';
import classes from './RecommendedMentoringPostsSection.module.scss';

const SECTION_TEXTS = {
  subtitle: 'Level Up Mentoring',
  title: '커리어 성장을 위한 멘토링',
  description:
    '커리어 성장을 위한 멘토링을 찾으시나요? 멘토와 멘토를 잇는 토티가 여러분께 딱맞는 멘토링을 추천해드려요.',
};

const SLIDER_OPTIONS = {
  slidesToShow: 5,
  speed: 5,
};

const COUNT_OF_CARD_PER_PAGE = 5;

const MOCK_POSTS = [...Array(12)];

function RecommendedMentoringPostsSection() {
  const currentCardIndex = useRef(0);

  // const filtered

  const handlePreviousClick = () => {
    const nextCardIndex = currentCardIndex.current - COUNT_OF_CARD_PER_PAGE;
  };

  return (
    <section className={classes.recommend_container}>
      <div className={classes.title_container}>
        <SectionTitle
          title={SECTION_TEXTS.title}
          sub={SECTION_TEXTS.subtitle}
          description={SECTION_TEXTS.description}
        />
      </div>
      <div className={classes.slider_container}>
        <Slider
          infinite
          speed={SLIDER_OPTIONS.speed}
          slidesToShow={SLIDER_OPTIONS.slidesToShow}
        >
          {MOCK_POSTS.map((_, index) => (
            <RecommendMentorCard key={index} onClick={() => {}} />
          ))}
        </Slider>
      </div>
    </section>
  );
}

export default RecommendedMentoringPostsSection;
