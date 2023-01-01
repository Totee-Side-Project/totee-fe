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
  fallback: ReactElement;
  isLoading: boolean;
  isFetching: boolean;
}

export function Carousel({
  children,
  options,
  style,
  fallback,
  isLoading,
  isFetching,
}: Props) {
  return (
    <Swiper {...options} style={style}>
      {isFetching ? (
        <SwiperSlide>{fallback}</SwiperSlide>
      ) : (
        React.Children.map(children, (component, index) => (
          <SwiperSlide key={index}>{component}</SwiperSlide>
        ))
      )}
    </Swiper>
  );
}
