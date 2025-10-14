export interface User {
  id: string;
  email: string;
  role: 'admin' | 'agency';
}

export interface Agency {
  id: string;
  email: string;
  name: string;
  address: string;
  contactDetails?: string;
  city: string;
  country: string;
  isActive: boolean;
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
