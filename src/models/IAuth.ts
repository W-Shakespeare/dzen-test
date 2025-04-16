// import { USER_ROLE } from './IShared';

export interface IAuthLoginBody {
  username: string;
  password: string;
  remember?: boolean;
}

export interface IAuthResponse {
  token: string;
  status?: number;
}

export interface IToken {
  token: string;
}

export interface IAuthRegisterBody {
  username: string;
  password: string;
  // user_type: string;
  email: string;
  age?: number;
  home_studying?: boolean;
  ref_link?: string;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface IRegister {
  username: string;
  email: string;
  password: string;
}
