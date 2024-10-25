export interface User {
    created_at:         string;
    created_by_id:      number | null;
    email:              string;
    id:                 number;
    institution:        string;
    is_member:          boolean;
    member_expiry_date: string;
    name:               string;
    published_at:       string;
    status:             string;
    study_field:        string;
    university_id:      string;
    updated_at:         string;
    updated_by_id:      number | null;
    upi:                string;
    year_of_study:      string;
}
