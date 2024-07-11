import React from "react";
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
  cardType?: "upcoming" | "past";
}

const SimpleSlider: React.FC<SimpleSliderProps> = ({ children, cardType }) => {
  const sliderRef = useRef<Slider>(null);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: cardType === "past" ? 1 : 3,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: cardType === "past" ? 1 : 2,
          slidesToScroll: 1,
          infinite: false,
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
    <div className="flex w-full items-center justify-center">
      <IoArrowBackCircleOutline
        onClick={previous}
        className="mx-4 hidden h-16 w-16 sm:flex text-gray-400 hover:cursor-pointer"
      />
      <div className="h-auto w-full sm:w-[calc(100%-8rem)]">
        <Slider ref={sliderRef} {...settings}>
          {cardType === "past"
            ? React.Children.toArray(children)
              .reduce((acc: any, child: any, index: number) => {
                if (index % 3 === 0) acc.push([]);
                acc[acc.length - 1].push(child);
                return acc;
              }, [])
              .map((group: any, index: number) => (
                <div key={index} className="p-2">
                  <div className="flex flex-col">
                    {group.map((child: any, subIndex: number) => (
                      <div key={subIndex} className="p-2">
                        {child}
                      </div>
                    ))}
                  </div>
                </div>
              ))
            : React.Children.map(children, (child, index) => (
              <div key={index} className="p-2">
                {child}
              </div>
            ))}
        </Slider>
      </div>
      <IoArrowForwardCircleOutline
        onClick={next}
        className="mx-4 hidden h-16 w-16 sm:flex text-gray-400 hover:cursor-pointer"
      />
    </div>
  );
};

export default SimpleSlider;
