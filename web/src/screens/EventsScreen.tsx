import EventGallery from "@components/EventGallery";
import Header from "@components/Header";
import PastEvents from "@components/PastEvents";
import UpcomingEvents from "@components/UpcomingEvents";
import React from "react";

import { dummyPastEvents } from "../temporary/temporaryEventData";

const EventsScreen = () => {
  return (
    <>
      <Header />
      {/* Upcoming events section*/}
      <UpcomingEvents is_events_page={true} />
      <PastEvents pastEvents={dummyPastEvents} />
      <EventGallery />
      <div></div>
    </>
  );
};

export default EventsScreen;
