import React, { useEffect } from 'react';
import Slider from 'react-slick';
import next from '@assets/nextarrow.png';
import prev from '@assets/prevarrow.png';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styled from '@emotion/styled';
import './recommend.scss';
import { useMediaQuery } from 'react-responsive';
import { useNavigate } from 'react-router-dom';
import RecommendMentorCard from '../../card/RecommentMentorCard/RecommendMentorCard';
import BestMentorCard from '../../card/BestMentorCard/BestMentorCard';

function RecommendMentoSlider(props: any) {
  const isPc = useMediaQuery({ minWidth: 1163 });
  const isTablet = useMediaQuery({ maxWidth: 1163, minWidth: 750 });
  const isPhone = useMediaQuery({ maxWidth: 750 });

  let navigate = useNavigate();

  const settings = {
    className: 'center',
    centerMode: true,
    infinite: true,
    centerPadding: '60px',
    slidesToShow: 1,
    speed: 500,
    variableWidth: true,
    prevArrow: (
      <div>
        <div
          className="ArrowWrapper"
          style={{ backgroundImage: `url("${prev}")` }}
        ></div>
      </div>
    ),
    nextArrow: (
      <div>
        <div
          className="ArrowWrapper"
          style={{ backgroundImage: `url("${next}")` }}
        ></div>
      </div>
    ),
  };
  
  const Mentorcard  = ()=> props.type==="recommend"? <RecommendMentorCard/> : <BestMentorCard/>

  return (
      <div className="content_wrapper">
        <>
          <StyledSlider {...settings}>
            <Mentorcard key={`recommend-mento-card-1`}/>
            <Mentorcard key={`recommend-mento-card-2`}/>
            <Mentorcard key={`recommend-mento-card-3`}/>
            <Mentorcard key={`recommend-mento-card-4`}/>
          </StyledSlider>
        </>
      </div>
  )
}

export default RecommendMentoSlider;

const StyledSlider = styled(Slider)`
  height: 260px;
  width: none;
  margin: 100px;
  position: relative;
  /* .slick-slide {
    width: 400px;
    cursor: pointer;
  } */
`;
