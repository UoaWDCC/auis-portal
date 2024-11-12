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
