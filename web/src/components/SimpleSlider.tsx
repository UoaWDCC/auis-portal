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
    <>
      <div className="flex">
        <div className="flex flex-grow items-center justify-center">
          <IoArrowBackCircleOutline
            onClick={previous}
            className="mx-4 hidden h-16 w-16 sm:flex"
          />
        </div>
        <div className="w-11/12 sm:w-[calc(100vw-14rem)]">
          <Slider ref={sliderRef} {...settings}>
            <div>test</div>
          </Slider>
        </div>
        <div className="flex flex-grow items-center justify-center">
          <IoArrowForwardCircleOutline
            onClick={next}
            className="mx-4 hidden h-16 w-16 sm:flex"
          />
        </div>
      </div>
    </>
  );
};

export default SimpleSlider;
