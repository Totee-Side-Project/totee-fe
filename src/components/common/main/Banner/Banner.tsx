import React from 'react';
import BannerImg from '@assets/banner.png';
import BannerIcon from '@assets/banner_icon_1.png';
import classes from './banner.module.scss';

export function Banner() {
  return (
    <>
    <section className={classes.banner_wrapper}>
      <div className={classes.banner_inner_wrapper}>
          <div className={classes.banner_item}>
            <div className={classes.banner_description}>
              <h1 className={classes.title}>스터디와 <span className={classes.highlight}>멘토·멘티</span>를 찾는<br></br>가장 쉬운 방법</h1>
              <span className={classes.subtitle}>간단하게 내 주변의 실력있는 멘토를 찾아<br></br> 함께 배우고, 성장하며 나의 실력을 쌓아보세요</span>
            </div>
          </div>
          <div className={classes.banner_item}>
            <img src={BannerIcon} alt="배너 아이콘" className={classes.banner_icon}/>
          </div>
        {/* <img src={BackgroundImg} alt="" className={classes.backgroundImg}/> */}
        </div>
        <img src={BannerImg} alt="배경화면" className={classes.img}/>
    </section>
    </>
  )
}
