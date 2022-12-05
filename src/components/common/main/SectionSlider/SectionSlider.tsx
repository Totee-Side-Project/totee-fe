import Slider from 'react-slick';
import next from '@assets/png/nextarrow.png';
import prev from '@assets/png/prevarrow.png';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styled from '@emotion/styled';
import './sectionSlider.scss';
import { useMediaQuery } from 'react-responsive';
import { useNavigate } from 'react-router-dom';
interface Props {
  children: JSX.Element | JSX.Element[] | boolean;
}
export function SectionSlider({ children }: Props) {
  const isPc = useMediaQuery({ minWidth: 1163 });
  const isTablet = useMediaQuery({ maxWidth: 1163, minWidth: 750 });
  const isPhone = useMediaQuery({ maxWidth: 750 });

  let navigate = useNavigate();

  const settings = {
    // className: 'center',
    // dots: true,
    centerMode: true,
    infinite: true,
    centerPadding: '60px',
    slidesToShow: 1,
    speed: 500,
    variableWidth: true,
    prevArrow: (
      <div>
        <div
          className="ArrowWrapper left"
          style={{ backgroundImage: `url("${prev}")` }}
        ></div>
      </div>
    ),
    nextArrow: (
      <div>
        <div
          className="ArrowWrapper right"
          style={{ backgroundImage: `url("${next}")` }}
        ></div>
      </div>
    ),
  };

  return (
    <div className="section_slider_container">
      <StyledSlider {...settings}>{children}</StyledSlider>
    </div>
  );
}

const StyledSlider = styled(Slider)`
  height: 300px;
  width: none;
  position: relative;

  /* .slick-slide {
    width: 400px;
    cursor: pointer;
  } */
`;
