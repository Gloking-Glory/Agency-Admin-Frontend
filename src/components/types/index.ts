export interface User {
  id: string;
  email: string;
  role: 'admin' | 'agency';
}

export interface AgencyDashboardRspData {
  agency_summary: {
    id: string;
    email: string;
    company_name: string;
    address: string;
    contact_details?: string;
    is_active: boolean;
  };
}

export interface AgencyDashboardRqstData {
  id: string
}

export interface SignUpData {
  email: string;
  password: string;
  confirm_password: string;
  role: 'ADMIN' | 'AGENCY';
  company_name?: string;
  address?: string;
  contact_details?: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface AgencyUpdateData {
  name: string;
  address: string;
  contactDetails?: string;
  city: string;
  country: string;
}

export interface AgencyUpdate {
  company_name: string;
  address: string;
  contact_details: string;
}