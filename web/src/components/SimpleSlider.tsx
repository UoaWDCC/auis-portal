import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { GET_EVENTS } from "../graphql/queries";
import {
  IoArrowBackCircleOutline,
  IoArrowForwardCircleOutline,
} from "react-icons/io5";
import { useEffect, useRef, useState } from "react";
import LoadingSpinner from "./LoadingSpinner";
import { useQuery } from "@apollo/client";
import { Mapper } from "@utils/Mapper";
import type { Event } from "../types/types";
import UpcomingEventHomeCard from "./UpcomingEventHomeCard";

export default function SimpleSlider() {
  const sliderRef = useRef<Slider>(null);
  const {
    loading: eventsLoading,
    data: eventsData,
    error: eventsError,
  } = useQuery(GET_EVENTS);

  if (eventsLoading) {
    return <LoadingSpinner />;
  }

  if (eventsError) {
    return <div>CMS Offline</div>;
  }

  //const events: Event[] = Mapper.mapToEvents(eventsData.events.data);

  const settings = {
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
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 1,
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

  function SliderNoArrow() {
    return (
      <>
        {loading ? (
          <LoadingSpinner />
        ) : (
        <>
          {noEvents ? (
            <div>There are no events to display</div>
          ) : (
            <div>
              <Slider ref={sliderRef} {...settings}>
                {event.map((events) => (
                <div key={events.id}>
                  <UpcomingEventHomeCard upcomingEvent={events} />
                </div>
            ))}
            </Slider>
          </div>
          )}
        </>
        )}
      </>
      
    );
  }

  return (
    <div className="flex">
      <div className="flex flex-grow items-center justify-center">
        <IoArrowBackCircleOutline
          onClick={previous}
          className="mx-4 hidden h-16 w-16 sm:flex"
        />
      </div>
      <div className="w-11/12 sm:w-[calc(100vw-14rem)]">
        <SliderNoArrow />
      </div>
      <div className="flex flex-grow items-center justify-center">
        <IoArrowForwardCircleOutline
          onClick={next}
          className="mx-4 hidden h-16 w-16 sm:flex"
        />
      </div>
    </div>
  );
}
