import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  IoArrowBackCircleOutline,
  IoArrowForwardCircleOutline,
} from "react-icons/io5";
import { useRef } from "react";

export default function SimpleSlider() {
  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  const next = () => {
    sliderRef.current?.slickNext();
  };
  const previous = () => {
    sliderRef.current?.slickPrev();
  };

  const sliderRef = useRef<Slider>(null);

  function SliderNoArrow() {
    return (
      <div className="">
        <Slider ref={sliderRef} {...settings}>
          <div key={1}>
            <h3 className=" h-96 bg-red-100 rounded-lg m-3"> </h3>
          </div>
          <div key={2}>
            <h3 className=" h-96 bg-red-100 rounded-lg m-3"> </h3>
          </div>
          <div key={3}>
            <h3 className=" h-96 bg-red-100 rounded-lg m-3"> </h3>
          </div>
        </Slider>
      </div>
    );
  }

  return (
    <>
      <div className=" flex">
        <div className="flex flex-grow justify-center items-center ">
          <IoArrowBackCircleOutline
            onClick={previous}
            className="hidden sm:flex w-16 h-16 mx-4"
          />
        </div>
        <div className=" sm:w-[calc(100vw-14rem)] w-11/12">
          <SliderNoArrow />
        </div>
        <div className="flex flex-grow justify-center items-center">
          <IoArrowForwardCircleOutline
            onClick={next}
            className="hidden sm:flex w-16 h-16 mx-4"
          />
        </div>
      </div>
    </>
  );
}
