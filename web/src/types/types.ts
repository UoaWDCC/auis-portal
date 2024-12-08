export interface Exec {
  id: number;
  image: string;
  position: string;
  role: string;
  name: string;
  description: string;
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

export interface EventsSlider {
  id: number;
  title: string;
  location: string;
  eventDateStart: string;
  image: string;
  isLive: boolean;
}

export interface EventAndTickets {
  title: string;
  description: string;
  subtitle: string;
  location: string;
  eventDateStart: string;
  eventDateEnd: string;
  termsAndConditions: string;
  eventCapacityRemaining: number;
  image: string;
  tickets: Ticket[];
}

export interface EventGallery {
  id: number;
  image: string;
}

interface Question {
  id: number;
  question: string;
}

export interface TicketAndQuestion {
  ticketId: number;
  questions: Question[];
}

interface Ticket {
  id: number;
  name: string;
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

export interface MembershipExpiryDate {
  userExpiryDate: string;
}

export interface QuestionAnswer {
  question: string;
  questionId: number;
  indexId: number;
  answer: string;
}

export interface AttendanceList {
  name: string;
  id: number;
  userTicketCode: string;
  attendance: boolean;
}
export interface AttendanceReturn {
  name: string;
}
