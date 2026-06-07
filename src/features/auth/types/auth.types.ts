export interface ISignUp {
  email: string;
  password: string;
  data: {
    name: string;
    job_title?: string;
  };
}

export interface IUser {
  email: string;
  email_verified: boolean;
  job_title: string;
  name: string;
  phone_verified: boolean;
  sub: string;
}
