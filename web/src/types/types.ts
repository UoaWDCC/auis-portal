export interface Exec {
  id: number;
  image: string;
  position: string;
  role: string;
  name: string;
  description: string;
}

export interface Props {
  execs: Exec[];
}

export interface ExecCardProps {
  exec: Exec;
}

export interface Developer {
  id: number;
  name: string;
  linkedIn: string;
  github: string;
}

export interface DeveloperCardProps {
  developer: Developer;
}

export interface Partner {
  id: number;
  type: string;
  name: string;
  description: string;
  image: string;
  location: string;
}

export interface PartnerCardProps {
  colour: string;
  partner: Partner;
}

export interface Social {
  id: number;
  type: string;
  link: string;
}

export interface SomePhoto {
  id: number;
  title: string;
  year: string;
  image: string;
}

export interface Value {
  id: number;
  title: string;
  description: string;
  image: string;
}

export interface ValueCardProps {
  value: Value;
}

export interface Introduction {
  id: number;
  description: string;
  events: string;
  members: string;
  followers: string;
}

export interface PreviousTeam {
  id: number;
  name: string;
  role: string;
  year: string;
}

export interface PreviousTeamCardProps {
  year: string;
  teams: {
    Presidents: PreviousTeam[];
    Executives: PreviousTeam[];
  };
}

export interface Event {
  id: number;
  title: string;
  description: string;
  subtitle: string;
  location: string;
  locationLink: string;
  eventDateStart: string;
  eventDateEnd: string;
  isLive: boolean;
  termsAndConditions: string;
  eventCapacityRemaining: number;
  image: string;
}

export interface EventGallery {
  id: number;
  image: string;
}

export interface Question {
  id: number;
  question: string;
  checkForMemberEmail: boolean;
}

export interface Ticket {
  id: number;
  name: string;
  discountCode: string;
  discountPrice: number;
  price: number;
  isMemberOnly: boolean;
  isDouble: boolean;
  numTicketsLeft: number;
  ticketDescription: string;
  startDateTicketSales: string;
  isTicketLive: boolean;
}
