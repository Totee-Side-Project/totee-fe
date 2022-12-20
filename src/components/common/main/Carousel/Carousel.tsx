import React from 'react';
// import Swiper Components
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay, Pagination, SwiperOptions } from 'swiper';
import type { ReactElement } from 'react';
// import css
import 'swiper/swiper-bundle.min.css';
import Skeleton from 'react-loading-skeleton';

SwiperCore.use([Autoplay, Pagination]);

interface Props {
  children: ReactElement | ReactElement[];
  options: SwiperOptions;
  style: {};
  fallback: ReactElement;
}

export function Carousel({ children, options, style, fallback }: Props) {
  const components = React.Children.map(children, (component, index) => (
    <SwiperSlide key={index}>{component}</SwiperSlide>
  ));

  return (
    <Swiper {...options} style={style}>
      {!components.length ? (
        <SwiperSlide>{fallback}</SwiperSlide>
      ) : (
        React.Children.map(children, (component, index) => (
          <SwiperSlide key={index}>{component}</SwiperSlide>
        ))
      )}
      {/* {React.Children.map(children, (component, index) => (
        <SwiperSlide key={index}>{component}</SwiperSlide>
      ))} */}
    </Swiper>
  );
}
