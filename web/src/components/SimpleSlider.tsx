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
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 1080,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 1
        }
      }
    ]
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
            <div className="grid h-full w-72 grid-cols-2">
              <div className=" h-80 w-64 rounded-lg m-3 flex-col justify-center items-center py-10">
                <img className="h-64 w-64 object-cover rounded-lg " src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/97a77168-2be8-4b24-b4ac-6c18fad9b82b/de14s16-7c08a3ae-da52-4c21-b5ea-585c4ad6a08c.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzk3YTc3MTY4LTJiZTgtNGIyNC1iNGFjLTZjMThmYWQ5YjgyYlwvZGUxNHMxNi03YzA4YTNhZS1kYTUyLTRjMjEtYjVlYS01ODVjNGFkNmEwOGMucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.-zbEv8p3S701f1wT0t8SqkApl4_vZyKVDAdYL__SH38"/>
                <h3 className="text-white text-3xl text-center font-bold py-4 mx-3">Event1</h3>
              </div>
              <div className="flex justify-end py-7">
                <div className="w-28 h-14 bg-primary-orange flex justify-center rounded-[3rem]">
                  <div className="text-white text-2xl font-bold py-2.5">8 May</div>
                </div>
              </div>
            </div>
          </div>
          <div key={2}>
            <div className="grid h-full w-72 grid-cols-2">
              <div className=" h-80 w-64 rounded-lg m-3 flex-col justify-center items-center py-10">
                <img className="h-64 w-64 object-cover rounded-lg " src="https://cloudfront-us-east-1.images.arcpublishing.com/opb/UODRDCE3KTLWUWUHHRETSAXL7U.jpg"/>
                <h3 className="text-white text-3xl text-center font-bold py-4 mx-3">Event2</h3>
              </div>
              <div className="flex justify-end py-7">
                <div className="w-28 h-14 bg-primary-orange flex justify-center rounded-[3rem]">
                  <div className="text-white text-2xl font-bold py-2.5">8 May</div>
                </div>
              </div>
            </div>
          </div>
          <div key={3}>
            <h3 className=" h-96 bg-red-100 rounded-lg m-3"> </h3>
          </div>
          <div key={4}>
            <div className="grid h-full w-72 grid-cols-2">
              <div className=" h-80 w-64 rounded-lg m-3 flex-col justify-center items-center py-10">
                <img className="h-64 w-64 object-cover rounded-lg " src="https://pbs.twimg.com/media/CT0P8I_WwAAUBsn.jpg"/>
                <h3 className="text-white text-3xl text-center font-bold py-4 mx-3">Event4</h3>
              </div>
              <div className="flex justify-end py-7">
                <div className="w-28 h-14 bg-primary-orange flex justify-center rounded-[3rem]">
                  <div className="text-white text-2xl font-bold py-2.5">8 May</div>
                </div>
              </div>
            </div>
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
