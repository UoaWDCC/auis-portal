import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  IoArrowBackCircleOutline,
  IoArrowForwardCircleOutline,
} from "react-icons/io5";
import { useRef } from "react";

interface SimpleSliderProps {
  children: React.ReactNode;
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
    <div className="flex items-center justify-center w-full">
      <IoArrowBackCircleOutline
        onClick={previous}
        className="mx-4 hidden h-16 w-16 sm:flex"
      />
      <div className="w-full h-auto sm:w-[calc(100%-8rem)]">
        <Slider ref={sliderRef} {...settings}>
          {children}
        </Slider>
      </div>
      <IoArrowForwardCircleOutline
        onClick={next}
        className="mx-4 hidden h-16 w-16 sm:flex"
      />
    </div>
  );
};

export default SimpleSlider;
