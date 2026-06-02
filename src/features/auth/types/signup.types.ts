export interface ISignUp {
  email: string;
  password: string;
  data: {
    name: string;
    job_title?: string;
  };
}
