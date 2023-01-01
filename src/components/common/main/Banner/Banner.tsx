import { ReactNode } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay, Pagination } from 'swiper';
import 'swiper/swiper-bundle.min.css';
import 'swiper/components/navigation/navigation.min.css';

import { ImageWithWebp, SectionTitle } from '@components/atoms';
// import Banner1Img from '@assets/png/main_banner.png';
// import Banner1ImgWebp from '@assets/webp/main_banner.webp';
// import Banner2Img from '@assets/webp/study_banner.webp';
// import Banner2ImgWebp from '@assets/webp/study_banner.webp';
// import Banner3Img from '@assets/webp/mentor_mentee_banner.webp';
// import Banner3ImgWebp from '@assets/webp/mentor_mentee_banner.webp';
import mentorItem from '@assets/png/banner/mentor_item.png';
import studyItem from '@assets/png/banner/study_item.png';
import toteeItem from '@assets/png/banner/totee_item.png';
import mentorBacakgroundImg from '@assets/png/banner/mentor_background.png';
import studyBacakgroundImg from '@assets/png/banner/study_background.png';
import toteeBacakgroundImg from '@assets/png/banner/totee_background.png';

// import my custom pagination.scss
import './pagination.scss';
import classes from './banner.module.scss';
import './bannerItem.scss';

SwiperCore.use([Autoplay, Pagination]);

interface Props {
  backgroundImg: string;
  left: ReactNode;
  right: ReactNode;
}

const BannerItem = ({ backgroundImg, left, right }: Props) => {
  return (
    <div
      className="bannerItem"
      style={{
        backgroundImage: `url(${backgroundImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
      }}
    >
      <div className="bannerItem_left">{left}</div>
      <div className="bannerItem_right">{right}</div>
    </div>
  );
};

export function Banner() {
  return (
    <div className="css_banner_wrap">
      <div className={classes.banner_wrap}>
        <Swiper
          className={classes.banner}
          spaceBetween={50}
          slidesPerView={1}
          pagination={{
            clickable: true,
            type: 'bullets',
          }}
          autoplay={{ delay: 8000, disableOnInteraction: false }} // 추가
          // observer={true}
          // observeParents={true}
        >
          <SwiperSlide className={classes.banner_item}>
            <BannerItem
              backgroundImg={toteeBacakgroundImg}
              left={
                <SectionTitle
                  title={
                    '스터디와 <mark>멘토·멘티</mark>를 찾는\n 가장 편안한 방법'
                  }
                  sub={''}
                  description={`간단하게 내 주변의 실력있는 멘토를 찾아\n함께 배우고, 성장하며 나의 실력을 쌓아보세요.`}
                />
              }
              right={
                <ImageWithWebp
                  src={toteeItem}
                  alt="스터디와 멘토 멘티를 찾는 가장 편안한 방법"
                  className={classes.banner_img}
                  srcSet={toteeItem}
                />
              }
            />
          </SwiperSlide>

          <SwiperSlide className={classes.banner_item}>
            <BannerItem
              backgroundImg={studyBacakgroundImg}
              left={
                <SectionTitle
                  title={'커리어 성장을 위한\n다양한 스터디 탐색'}
                  sub={''}
                  description={`커리어 성장을 위한 스터디를 찾으시나요?\n토티에는 이런저런 여러분야의 스터디가 모여있어요.`}
                  padding={'5% 0 0 0'}
                />
              }
              right={
                <ImageWithWebp
                  src={studyItem}
                  alt="커리어 성장을 위한 다양한 스터디 탐색"
                  className={classes.banner_img}
                  srcSet={studyItem}
                />
              }
            />
          </SwiperSlide>
          <SwiperSlide className={classes.banner_item}>
            <BannerItem
              backgroundImg={mentorBacakgroundImg}
              left={
                <SectionTitle
                  title={'커리어 성장을 위한 멘토링'}
                  sub={''}
                  description={`커리어 성장을 위한 멘토링을 찾으시나요?\n멘토와 멘티를 잇는 토티가 여러분께 딱 맞는 멘토링을 추천해드려요.`}
                />
              }
              right={
                <ImageWithWebp
                  src={mentorItem}
                  alt="커리어 성장을 위한 멘토링"
                  className={classes.banner_img}
                  srcSet={mentorItem}
                />
              }
            />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}
