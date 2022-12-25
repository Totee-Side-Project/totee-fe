import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay, Pagination } from 'swiper';
import 'swiper/swiper-bundle.min.css';
import 'swiper/components/navigation/navigation.min.css';

import { ImageWithWebp } from '@components/atoms';
import Banner1Img from '@assets/png/main_banner.png';
import Banner1ImgWebp from '@assets/webp/main_banner.webp';
import Banner2Img from '@assets/webp/study_banner.webp';
import Banner2ImgWebp from '@assets/webp/study_banner.webp';
import Banner3Img from '@assets/webp/mentor_mentee_banner.webp';
import Banner3ImgWebp from '@assets/webp/mentor_mentee_banner.webp';

// import my custom pagination.scss
import './pagination.scss';
import classes from './banner.module.scss';

SwiperCore.use([Autoplay, Pagination]);

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
          autoplay={{ delay: 4000, disableOnInteraction: false }} // 추가
          // observer={true}
          // observeParents={true}
        >
          <SwiperSlide className={classes.banner_item}>
            <ImageWithWebp
              src={Banner1Img}
              alt="스터디와 멘토를 찾는 가장 편안한 방법"
              className={classes.banner_img}
              srcSet={Banner1ImgWebp}
            />
          </SwiperSlide>
          <SwiperSlide className={classes.banner_item}>
            <ImageWithWebp
              src={Banner2Img}
              alt="커리어 성장을 위한 다양한 스터디 탐색"
              className={classes.banner_img}
              srcSet={Banner2ImgWebp}
            />
          </SwiperSlide>
          <SwiperSlide className={classes.banner_item}>
            <ImageWithWebp
              src={Banner3Img}
              alt="커리어 성장을 위한 다양한 스터디 탐색"
              className={classes.banner_img}
              srcSet={Banner3ImgWebp}
            />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}
