import React from 'react';
import BannerImg from '@assets/background-image.png';
import BackgroundImg from '@assets/background.png';
import classes from './banner.module.scss';

export function Banner() {
  return (
    <>
    <section className={classes.banner_wrapper}>
      <div className={classes.circle}>
        <h1 className={classes.title}>스터디와 <span className={classes.highlight}>멘토·멘티</span>를 찾는<br></br>가장 쉬운 방법</h1>
        <img src={BannerImg} alt="사이좋은 사람들" className={classes.img}/>
        {/* <img src={BackgroundImg} alt="" className={classes.backgroundImg}/> */}
      </div>
    </section>
    <section className={classes.banner_footer}></section>
    </>
  )
}
