import React, { useEffect } from 'react';
import Slider from 'react-slick';
import next from '@assets/nextarrow.png';
import prev from '@assets/prevarrow.png';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styled from '@emotion/styled';
import './recommend.scss';
import { useMediaQuery } from 'react-responsive';

function RecommendSlider(props: any) {
  const isPc = useMediaQuery({ minWidth: 1163 });
  const isTablet = useMediaQuery({ maxWidth: 1163, minWidth: 750 });
  const isPhone = useMediaQuery({ maxWidth: 750 });

  const changeSlide = () => {
    if (isPc) {
      return 3;
    } else if (isTablet) {
      return 2;
    } else if (isPhone) {
      return 1;
    }
  };

  const settings = {
    className: 'center',
    centerMode: true,
    infinite: true,
    centerPadding: '60px',
    slidesToShow: changeSlide(),
    speed: 500,
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

  return (
    props.recommendData && (
      <div className="content_wrapper">
        <StyledSlider {...settings}>
          {props.recommendData.map((arr: any) => {
            return (
              <div className="card_container">
                <div className="card_image_wrapper"></div>
                <div className="card_title">{arr.title}</div>
                <div
                  className="card_content"
                  dangerouslySetInnerHTML={{ __html: arr.content }}
                ></div>
                <div className="card_category">
                  <div className="card_category_content">
                    {periodChange(arr)}
                  </div>
                  <div className="card_category_content">
                    {arr.categoryName}
                  </div>
                  <div className="card_category_content">
                    {arr.status ? '모집중' : '모집완료'}
                  </div>
                </div>
              </div>
            );
          })}
          {props.recommendData.length < 4 ? (
            <div className="card_container">
              <div className="card_image_wrapper"></div>
              <div></div>
              <div className="card_content"></div>
            </div>
          ) : null}
        </StyledSlider>
      </div>
    )
  );
}

export default RecommendSlider;

const StyledSlider = styled(Slider)`
  height: 260px;
  width: 90%;
  margin: 100px;
  position: relative;
  .slick-slide .div {
    width: 400px;
    cursor: pointer;
  }
`;
