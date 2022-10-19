import React from 'react';
// import Swiper Components
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay, Pagination, SwiperOptions } from 'swiper';
import type { ReactElement } from 'react';
// import css
import 'swiper/swiper-bundle.min.css';

SwiperCore.use([Autoplay, Pagination]);

interface Props {
  children: ReactElement | ReactElement[];
  options: SwiperOptions;
  style: {};
}

// 1. 불러오는 측에서 css파일을 import 해온다면 Carousel Component의 의존성이 줄어들지 않을까?
// 2. SwiperSlide의 갯수또한 외부에서 주입받는다면?
export function Carousel({ children, options, style }: Props) {
  return (
    <Swiper {...options} style={style}>
      {React.Children.map(children, (component, index) => (
        <SwiperSlide key={index}>{component}</SwiperSlide>
      ))}
    </Swiper>
  );
}
