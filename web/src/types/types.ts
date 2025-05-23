export interface Exec {
  id: number;
  image: string;
  position: string;
  role: string;
  name: string;
  description: string;
  linkedInLink: string;
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
  isLive: boolean;
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

export interface MembershipTicketInfo {
  ticketIdCode: string;
  ticketName: string;
  qrCode: string;
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

export interface EventOrMembershipReturn {
  clientSecret: string;
}

export interface stripeSessionStatus {
  customer_email: string;
  status: string;
}
// data { updateUserInfoOrNewUser { userTicketId}}
export interface UpdateUserInfoOrNewUser {
  updateUserInfoOrNewUser: {
    userTicketId: number;
  };
}

export interface SubmitUpdateUserInfoOrNewUser {
  ticketId: number;
  name: string;
  email: string;
  phoneNumber: string;
  answers: QuestionAnswer[];
}

export interface AnswerList {
  questionId: number;
  answer: string;
}

export interface UserMetaData {
  bIsUserInfoComplete: boolean;
  bIsMembershipPaymentComplete: boolean;
}
