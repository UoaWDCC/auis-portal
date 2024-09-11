import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  IoArrowBackCircleOutline,
  IoArrowForwardCircleOutline,
} from "react-icons/io5";
import { useRef } from "react";

interface EventSliderProps {
  children: React.ReactNode;
  cardType?: "upcoming" | "past";
}

const EventSlider: React.FC<EventSliderProps> = ({ children, cardType }) => {
  const sliderRef = useRef<Slider>(null);

  const settings = {
    dots: true,
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

  // Helper function to group children into chunks of 3 for "past" events
  const groupChildren = (childrenArray: React.ReactNode[]) => {
    const grouped: React.ReactNode[][] = [];
    for (let i = 0; i < childrenArray.length; i += 3) {
      grouped.push(childrenArray.slice(i, i + 3));
    }
    return grouped;
  };

  const childrenArray = Array.isArray(children) ? children : [children]; // Ensure children is always an array

  return (
    <div className="flex w-full items-center justify-center">
      {/* Previous Arrow */}
      <IoArrowBackCircleOutline
        onClick={previous}
        className="mx-4 hidden h-16 w-16 text-gray-400 hover:cursor-pointer sm:flex"
      />

      {/* Slider container */}
      <div className="h-auto w-full sm:w-[calc(100%-8rem)]">
        <Slider ref={sliderRef} {...settings}>
          {/* Conditionally group past events into sets of 3 */}
          {cardType === "past"
            ? groupChildren(childrenArray).map((group, index) => (
                <div key={index} className="p-2">
                  <div className="flex flex-col">
                    {group.map((child, subIndex) => (
                      <div key={subIndex} className="p-2">
                        {child}
                      </div>
                    ))}
                  </div>
                </div>
              ))
            : // For upcoming events, simply render each child
              childrenArray.map((child, index) => (
                <div key={index} className="p-2">
                  {child}
                </div>
              ))}
        </Slider>
      </div>

      {/* Next Arrow */}
      <IoArrowForwardCircleOutline
        onClick={next}
        className="mx-4 hidden h-16 w-16 text-gray-400 hover:cursor-pointer sm:flex"
      />
    </div>
  );
};

export default EventSlider;
