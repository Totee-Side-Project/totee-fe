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
import RecommendPostCard from './RecommendPostCard';
import RecommendMentorCard from './RecommendMentorCard';

function RecommendSlider(props: any) {
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

  const periodChange = (arr: any) => {
    if (arr.period == 'VeryShortTerm') {
      return <span>1개월미만</span>;
    } else if (arr.period == 'ShortTerm') {
      return <span>1~3개월</span>;
    } else if (arr.period == 'MidTerm') {
      return <span>3~6개월</span>;
    } else if (arr.period == 'LongTerm') {
      return <span>6개월이상</span>;
    } else {
      return null;
    }
  };

  const clickCard = (e: any) => {
    navigate(`/detail/${e.target.id}`);
  };

  return (
    props.recommendData && (
      <div className="content_wrapper">
        <>
          <StyledSlider {...settings}>
            {/* {props.recommendData.map((item: any) => {
              return (
                <>
                <RecommendPostCard onClickCard={clickCard} item={item}/>
                <RecommendPostCard onClickCard={clickCard} item={item}/>

                </>
              );
            })} */}
            {/* {props.recommendData.map((item: any) => {
              return (
                <>
                <RecommendMentorCard key={`recommend-mento-card-${item.id}`}/>
                <RecommendMentorCard key={`recommend-mento-card-1`}/>
                </>
              );
            })} */}
            <RecommendMentorCard key={`recommend-mento-card-1`}/>
            <RecommendMentorCard key={`recommend-mento-card-2`}/>
            <RecommendMentorCard key={`recommend-mento-card-3`}/>
            <RecommendMentorCard key={`recommend-mento-card-4`}/>



            {/* {props.recommendData.length < 4 ? (
              <div
                className="card_container"
                onClick={clickCard}
                style={{ width: 400 }}
              >
                <div className="card_image_wrapper"></div>
                <div className="card_title"></div>
              </div>
            ) : null}
            <div
                className="card_container"
                onClick={clickCard}
                style={{ width: 400 }}
              >
                <div className="card_image_wrapper"></div>
                <div className="card_title"></div>
              </div> */}
          </StyledSlider>
        </>
      </div>
    )
  );
}

export default RecommendSlider;

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
