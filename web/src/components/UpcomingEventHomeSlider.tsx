import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  IoArrowBackCircleOutline,
  IoArrowForwardCircleOutline,
} from "react-icons/io5";
import { useRef } from "react";
import LoadingSpinner from "./LoadingSpinner";
import { useQuery, gql } from "@apollo/client";
import UpcomingEventHomeCard from "./UpcomingEventHomeCard";
import { GET_EVENTS } from "../graphql/queries";
import dayjs from "dayjs";
import { Mapper } from "../utils/Mapper";
import type { Event } from "../types/types";

export default function UpcomingEventHomeSlider() {
  const sliderRef = useRef<Slider>(null);

  const {
    loading: eventsLoading,
    error: eventsError,
    data: eventsData,
  } = useQuery<Event>(GET_EVENTS);

  if (eventsLoading) {
    return <LoadingSpinner />;
  }

  if (eventsError) {
    return <div>CMS Offline</div>;
  }

  if (!eventsData) {
    return <div>No data available</div>;
  }

  const events = Mapper.mapToEvents(eventsData);

  const now = dayjs(); // current date and time
  const upcomingEvents = events
    .filter((event) => dayjs(event.eventDateStart).isAfter(now)) // only future events
    .sort((a, b) => dayjs(a.eventDateStart).diff(dayjs(b.eventDateStart))); // sort by start date

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
      <div>
        <Slider ref={sliderRef} {...settings}>
          {upcomingEvents.map((event) => (
            <div key={event.id}>
              <UpcomingEventHomeCard upcomingEvent={event} />
            </div>
          ))}
        </Slider>
      </div>
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
