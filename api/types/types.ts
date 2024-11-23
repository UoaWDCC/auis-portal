import "express";
import { SessionContainer } from "supertokens-node/recipe/session";

export interface User {
  id: number;
  name: string;
  email: string;
  universityId: string;
  upi: string;
  yearOfStudy: string;
  studyField: string;
  isMember: boolean;
  status: string;
  memberExpiryDate: string;
  institution: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  createdById: number | null;
  updatedById: number | null;
}

declare global {
  namespace Express {
    interface Request {
      session?: SessionContainer;
    }
  }
}

export interface UpdateUserInfoBody {
  email: string;
  name: string;
  universityId: string;
  upi: string;
  yearOfStudy: string;
  fieldOfStudy: string;
  isDomestic: string;
  institution: string;
}
