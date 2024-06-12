export interface User {
    description:   string;
    email:         string;
    name:          string;
    year_of_study: number;
}

export interface UserComplex {
    created_at:        Date;
    email:             string;
    institution?:      string;
    is_admin:          boolean;
    is_info_confirmed: boolean;
    is_paid:           boolean;
    name:              string;
    study_field?:      string;
    uoa_id?:           string;
    upi?:              string;
    user_id:           number;
    year?:             string;
}
