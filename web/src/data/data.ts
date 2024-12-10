import peacockLogo from "../assets/peacock.png";
import { EventsSlider } from "../types/types";
export const FacebookLink = "https://www.facebook.com/auis.uoa/";
export const InstagramLink =
  "https://www.instagram.com/au.indiansociety/?hl=en";
export const LinkedinLink = "https://www.linkedin.com/company/auindiansociety/";
export const GithubLink = "https://github.com/UoaWDCC/auis-portal";
export const EmailLink = "au.indiansociety@gmail.com";
export const TiktokLink = "https://tiktok.com";

export const primaryDevelopers = [
  {
    id: 1,
    name: "Guryash Singh Matharu",
    linkedIn: "https://www.linkedin.com/in/g-s-m/",
    github: "https://github.com/gmat224",
  },
  {
    id: 2,
    name: "Tarun Ramachandran",
    linkedIn: "https://www.linkedin.com/in/tarunram01/",
    github: "https://github.com/Ratchet7x5",
  },
  {
    id: 3,
    name: "Harsheel Singh",
    linkedIn: "https://www.linkedin.com/in/harsheelsingh/",
    github: "https://github.com/Harsheel12",
  },
  {
    id: 4,
    name: "Naren Rohan",
    linkedIn: "https://www.linkedin.com/in/naren-rohan/",
    github: "https://github.com/nroh555",
  },
];

export const secondaryDevelopers = [
  {
    id: 1,
    name: "Devesh Duptala",
    github: "https://github.com/duptala",
  },
  {
    id: 2,
    name: "Karmveer Singh",
    github: "https://github.com/Karmveer27",
  },
  {
    id: 3,
    name: "Chalisa Bond",
    github: "https://github.com/cbon848",
  },
  {
    id: 4,
    name: "Emma Chen",
    github: "https://github.com/emm4chen",
  },
  {
    id: 5,
    name: "Diya Kurien",
    github: "https://github.com/dkur670",
  },
  {
    id: 6,
    name: "Nicholas Lianto",
    github: "https://github.com/nlia656",
  },
];

// Handle case with no events
const today = new Date();
const showNoUpcomingEventOne: EventsSlider = {
  id: -1,
  title: "No Upcoming Events Right Now",
  eventDateStart: today.toISOString(),
  isLive: true,
  location: "University of Auckland",
  image: peacockLogo,
};

const showNoUpcomingEventTwo: EventsSlider = {
  id: -2,
  title: "No Upcoming Events Right Now",
  eventDateStart: today.toISOString(),
  isLive: true,
  location: "University of Auckland",
  image: peacockLogo,
};

const showNoUpcomingEventThree: EventsSlider = {
  id: -3,
  title: "No Upcoming Events Right Now",
  eventDateStart: today.toISOString(),
  isLive: true,
  location: "University of Auckland",
  image: peacockLogo,
};

export const showNoUpcomingEvents: EventsSlider[] = [
  showNoUpcomingEventOne,
  showNoUpcomingEventTwo,
  showNoUpcomingEventThree,
];

const showNoPastEventOne: EventsSlider = {
  id: -1,
  title: "No Past Events Right Now",
  eventDateStart: today.toISOString(),
  isLive: true,
  location: "University of Auckland",
  image: peacockLogo,
};

const showNoPastEventTwo: EventsSlider = {
  id: -2,
  title: "No Past Events Right Now",
  eventDateStart: today.toISOString(),
  isLive: true,
  location: "University of Auckland",
  image: peacockLogo,
};

const showNoPastEventThree: EventsSlider = {
  id: -3,
  title: "No Past Events Right Now",
  eventDateStart: today.toISOString(),
  isLive: true,
  location: "University of Auckland",
  image: peacockLogo,
};

export const showNoPastEvents: EventsSlider[] = [
  showNoPastEventOne,
  showNoPastEventTwo,
  showNoPastEventThree,
];
