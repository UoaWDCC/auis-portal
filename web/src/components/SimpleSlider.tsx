import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  IoArrowBackCircleOutline,
  IoArrowForwardCircleOutline,
} from "react-icons/io5";
import { ReactNode, useRef } from "react";

interface SimpleSliderProps {
  children: ReactNode;
}

const SimpleSlider: React.FC<SimpleSliderProps> = ({ children }) => {
  const sliderRef = useRef<Slider>(null);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3, // Show 3 slides at a time
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const next = () => {
    sliderRef.current?.slickNext();
  };

  const previous = () => {
    sliderRef.current?.slickPrev();
  };

  return (
    <div className="flex">
      <div className="flex flex-grow justify-center items-center">
        <IoArrowBackCircleOutline
          onClick={previous}
          className="hidden sm:flex w-16 h-16 mx-4"
        />
      </div>
      <div className="sm:w-[calc(100vw-14rem)] w-11/12">
        <Slider ref={sliderRef} {...settings}>
          {children}
        </Slider>
      </div>
      <div className="flex flex-grow justify-center items-center">
        <IoArrowForwardCircleOutline
          onClick={next}
          className="hidden sm:flex w-16 h-16 mx-4"
        />
      </div>
    </div>
  );
};

export default SimpleSlider;
