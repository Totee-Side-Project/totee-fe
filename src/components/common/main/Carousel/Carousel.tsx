// import Swiper Components
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay, Pagination, SwiperOptions } from 'swiper';
import type { ReactNode } from 'react';
// import css
import 'swiper/swiper-bundle.min.css';

SwiperCore.use([Autoplay, Pagination]);

interface Props {
  children: ReactNode[];
  options: SwiperOptions;
  style: {};
}

// 1. 불러오는 측에서 css파일을 import 해온다면 Carousel Component의 의존성이 줄어들지 않을까?
// 2. SwiperSlide의 갯수또한 외부에서 주입받는다면?
export function Carousel({ children, options, style }: Props) {
  return (
    <Swiper {...options} style={style}>
      {children.map((component, index) => (
        <SwiperSlide key={index}>{component}</SwiperSlide>
      ))}
    </Swiper>
  );
}

//   return (
//     <div className="css_banner_wrap">
//       <div className={classes.banner_wrap}>
//         <Swiper
//           className={classes.banner}
//           spaceBetween={50}
//           slidesPerView={1}
//           pagination={{
//             clickable: true,
//             type: 'bullets',
//           }}
//           autoplay={{ delay: 4000, disableOnInteraction: false }} // 추가
//           // observer={true}
//           // observeParents={true}
//         >
//           <SwiperSlide className={classes.banner_item}>
//             <img
//               src={Banner1Img}
//               alt="스터디와 멘토를 찾는 가장 편안한 방법"
//               className={classes.banner_img}
//             />
//           </SwiperSlide>
//           <SwiperSlide className={classes.banner_item}>
//             <img
//               src={Banner2Img}
//               alt="커리어 성장을 위한 다양한 스터디 탐색"
//               className={classes.banner_img}
//             />
//           </SwiperSlide>
//           <SwiperSlide className={classes.banner_item}>
//             <img
//               src={Banner3Img}
//               alt="커리어 성장을 위한 다양한 스터디 탐색"
//               className={classes.banner_img}
//             />
//           </SwiperSlide>
//         </Swiper>
//       </div>
//     </div>
//   );
// }
