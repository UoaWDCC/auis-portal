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

export interface Partner {
  id: number;
  type: string;
  name: string;
  description: string;
  image: string;
  location: string;
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
