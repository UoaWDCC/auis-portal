import { Event } from "../types/types";
import peacockLogo from "../assets/peacock.png";

export const FacebookLink = "https://www.facebook.com/auis.uoa/";
export const InstagramLink =
  "https://www.instagram.com/au.indiansociety/?hl=en";
export const LinkedinLink = "https://www.linkedin.com/company/auindiansociety/";
export const GithubLink = "https://github.com/UoaWDCC/auis-portal";
export const EmailLink = "mailto:au.indiansociety@gmail.com";

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
    linkedIn: "https://www.linkedin.com/in/bobsmith/",
    github: "https://github.com/bobsmith",
  },
  {
    id: 3,
    name: "Harsheel Singh",
    linkedIn: "https://www.linkedin.com/in/charliebrown/",
    github: "https://github.com/charliebrown",
  },
  {
    id: 4,
    name: "Naren Rohan",
    linkedIn: "https://www.linkedin.com/in/dianaprince/",
    github: "https://github.com/dianaprince",
  },
];

export const secondaryDevelopers = [
  {
    id: 1,
    name: "Alice Johnson",
    linkedIn: "https://www.linkedin.com/in/alicejohnson/",
    github: "https://github.com/alicejohnson",
  },
  {
    id: 2,
    name: "Bob Smith",
    linkedIn: "https://www.linkedin.com/in/bobsmith/",
    github: "https://github.com/bobsmith",
  },
  {
    id: 3,
    name: "Charlie Brown",
    linkedIn: "https://www.linkedin.com/in/charliebrown/",
    github: "https://github.com/charliebrown",
  },
  {
    id: 4,
    name: "Diana Prince",
    linkedIn: "https://www.linkedin.com/in/dianaprince/",
    github: "https://github.com/dianaprince",
  },
  {
    id: 5,
    name: "Evan Davis",
    linkedIn: "https://www.linkedin.com/in/evandavis/",
    github: "https://github.com/evandavis",
  },
];

  // Handle case with no events
  const today = new Date();
  const showNoEvent: Event = {
    id: -1,
    title: "No Upcoming Events Right Now",
    description: "description",
    subtitle: "subtitle",
    eventDateStart: today.toISOString(),
    eventDateEnd: "termsAndConditions",
    isLive: true,
    termsAndConditions: "termsAndConditions",
    eventCapacityRemaining: 0,
    location: "University of Auckland",
    locationLink: "locationLink",
    image: peacockLogo,
  };
  export const showNoEvents: Event[] = [showNoEvent, showNoEvent, showNoEvent];