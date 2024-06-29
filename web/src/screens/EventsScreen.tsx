import EventGallery from "@components/EventGallery";
import Header from "@components/Header";
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
      <Header />
      {/* Upcoming events section*/}
      <UpcomingEvents is_events_page={true} />
      <PastEvents />
      <EventGallery />
      <div></div>
    </>
  );
};

export default EventsScreen;
