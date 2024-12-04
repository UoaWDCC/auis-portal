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

export interface PrimaryDeveloper {
  id: number;
  name: string;
  linkedIn: string;
  github: string;
}

export interface SecondaryDeveloper {
  id: number;
  name: string;
  github: string;
}

export interface PartnerImage {
  id: number;
  name: string;
  image: string;
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
export interface Introduction {
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

export interface EventAndTicket {
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
  ticket: Ticket[];
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

export interface TicketAndQuestion {
  id: number;
  name: string;
  question: Question[];
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
  ticketLinkBypass: boolean;
  bypassTicketLink: string;
  stripeLink: string;
}

export interface PurchasableMembership {
  id: number;
  title: string;
  expiry: string;
  price: number;
  stripeLink: string;
  description: string;
  membershipLinkBypass: boolean;
  bypassMembershipLink: string;
}

export interface membershipExpiryDate {
  userExpiryDate: string;
}
