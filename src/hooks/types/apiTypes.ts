export interface SignUpResponseType {
  message: string;
  user: {
    id: string;
    email: string;
    role: string;
    date_joined: string;
  };
}

export interface GenErrType {
  [key: string]: string[] | undefined;
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

export interface AgencyUpdateRspType {
  message: string;
  account_info: {
    email: string,
    id: string,
    is_active: boolean
  }
}

export interface AdminDelRspType {
  message: string;
}
