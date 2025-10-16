import AgencyDashboard from '../../components/dashboard/agencyDashboard';
export interface SignUpResponseType {
  message: string;
  user: {
    id: string;
    email: string;
    role: string;
    date_joined: string;
  };
}

export interface SignUpErrorType {
  [key: string]: string[];
}

export interface LoginResponseType {
  message: string;
  user: {
    id: string;
    email: string;
    role: string;
  };
  tokens: {
    refresh: string;
    access: string;
  };
}

export interface LoginErrorType {
  error?: string;
}

export interface AgencyDashboardErrType {
  [key: string]: string[];
}
