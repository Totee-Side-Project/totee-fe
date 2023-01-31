import { HTMLAttributes, useState } from 'react';
import Slider from 'react-slick';
import { SectionTitle } from '@components/atoms';
import RecommendMentorCard from '@components/common/card/RecommendMentoringCard/RecommendMentoringCard';
import NEXT_ARROW_ICON from '@assets/png/nextarrow.png';
import PREVIOUS_ARROW_ICON from '@assets/png/prevarrow.png';
import classes from './RecommendMentoringPostsSection.module.scss';
import { useGetMentoringList } from '@hooks/query/useGetQuery';
import MentoringPostDetailModal from '@components/common/mentoring/MentoringPostDetailModal';
import { IMentoring } from '@api/mentoring/types';

const SECTION_TEXTS = {
  subtitle: 'Level Up Mentoring',
  title: '커리어 성장을 위한 멘토링',
  description:
    '커리어 성장을 위한 멘토링을 찾으시나요? 멘토와 멘토를 잇는 토티가 여러분께 딱맞는 멘토링을 추천해드려요.',
};

const SLIDER_OPTIONS = {
  slidesToShow: 5,
  speed: 500,
};

interface SliderNavigateIconProps extends HTMLAttributes<HTMLDivElement> {
  navigateTo: 'previous' | 'next';
}

function SliderNavigateIcon({
  navigateTo,
  className,
  ...props
}: SliderNavigateIconProps) {
  const newClassName = className?.concat(` ${classes.navigate_icon_button}`);

  const navigationTypeToIconMap: Record<typeof navigateTo, string> = {
    next: NEXT_ARROW_ICON,
    previous: PREVIOUS_ARROW_ICON,
  };

  return (
    <div className={newClassName} {...props}>
      <div
        style={{
          backgroundImage: `url(${navigationTypeToIconMap[navigateTo]})`,
        }}
        className={classes.icon}
      />
    </div>
  );
}

function RecommendMentoringPostsSection() {
  const [currentModalMentoringPost, setCurrentModalMentoringPost] =
    useState<IMentoring | null>(null);

  const { data, isLoading, isError } = useGetMentoringList({
    page: 0,
    size: 20,
  });

  if (isLoading) {
    // TODO: 로딩 UI
    return <></>;
  }

  if (isError) {
    // TODO: 에러 처리
    return <></>;
  }

  if (
    data === undefined ||
    data.data.body.data.content.length < SLIDER_OPTIONS.slidesToShow
  ) {
    // TODO: 데이터 없을 경우 처리
    return <></>;
  }

  const handleCloseClick = () => {
    setCurrentModalMentoringPost(null);
  };

  const getRecommendMentorCardHandler = (mentoring: IMentoring) => {
    return () => {
      setCurrentModalMentoringPost(mentoring);
    };
  };

  return (
    <>
      {currentModalMentoringPost !== null ? (
        <MentoringPostDetailModal
          mentoring={currentModalMentoringPost}
          onCloseClick={handleCloseClick}
          onApplyClick={() => {}}
        />
      ) : null}
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
            prevArrow={<SliderNavigateIcon navigateTo="previous" />}
            nextArrow={<SliderNavigateIcon navigateTo="next" />}
          >
            {data?.data.body.data.content.map((mentoring) => (
              <RecommendMentorCard
                key={mentoring.mentoringId}
                mentoring={mentoring}
                onClick={getRecommendMentorCardHandler(mentoring)}
              />
            ))}
          </Slider>
        </div>
      </section>
    </>
  );
}

export default RecommendMentoringPostsSection;
