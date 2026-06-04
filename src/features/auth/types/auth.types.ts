export interface ISignUp {
  email: string;
  password: string;
  data: {
    name: string;
    job_title?: string;
  };
}

export interface IResetPassword {
  password: string;
  accessToken: string;
}
