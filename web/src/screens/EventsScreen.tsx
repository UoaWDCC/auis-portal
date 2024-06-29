import EventGallery from "@components/EventGallery";
import PastEvents from "@components/PastEvents";
import UpcomingEvents from "@components/UpcomingEvents";
import React from "react";

interface placeholderData {
  image: string;
  title: string;
  date: string;
  location: string;
  is_paid: boolean;
}

const EventsScreen = () => {
  return (
    <>
      {/* Upcoming events section*/}
      <UpcomingEvents />
      <PastEvents />
      <EventGallery />
      <div></div>
    </>
  );
};

export default EventsScreen;
