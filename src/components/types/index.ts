export interface User {
  id: string;
  email: string;
  role: 'admin' | 'agency';
};

export interface SignUpData {
  email: string;
  password: string;
  confirm_password: string;
  role: 'ADMIN' | 'AGENCY';
  company_name?: string;
  address?: string;
  contact_details?: string;
};

export interface LoginData {
  email: string;
  password: string;
};

export interface AgencyDashboardData {
  agency_summary: {
    id: string;
    email: string;
    company_name: string;
    address: string;
    contact_details?: string;
    is_active: boolean;
  };
};

export interface AgencyData {
  id: string;
  email: string;
  company_name: string;
  address: string;
  contact_details?: string;
  is_active: boolean;
};

export interface AgencyUpdateData {
  company_name: string;
  address: string;
  contact_details: string;
};

export interface AdminUserList {
  id: string;
  email: string;
  role: string;
  date_joined: string;
  company_name: string;
  address: string;
  contact_details: string;
  is_active: boolean;
}

export interface PaginatedRspData {
  count: number;
  next: string | null;
  previous: string | null;
  results: AdminUserList[];
}

export interface AdminDelData {
  id: string;
}
