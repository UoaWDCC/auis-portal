export interface User {
  id: number;
  name: string;
  email: string;
  university_id: string;
  upi: string;
  year_of_study: string;
  study_field: string;
  is_member: boolean;
  status: string;
  member_expiry_date: string;
  institution: string;
  created_at: string;
  updated_at: string;
  published_at: string;
  created_by_id: number | null;
  updated_by_id: number | null;
}
