export interface User {
  name: string;
  description: string;
  email: string;
  year_of_study: number;
}

export interface UserComplex {
  user_id: number;
  email: string;
  uoa_id?: string;
  upi?: string;
  institution?: string;
  year?: string;
  study_field?: string;
  name: string;
  is_admin: boolean;
  is_paid: boolean;
  is_info_confirmed: boolean;
  created_at: Date;
}
