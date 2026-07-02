export interface IMember {
  member_id: string;
  project_id: string;
  user_id: string;
  metadata: {
    sub: string;
    name: string;
    email: string;
    job_title: string;
    email_verified: boolean;
    phone_verified: boolean;
  };
  role: 'owner' | 'viewer' | 'member' | 'admin';
}

export interface IInviteMemberRequest {
  p_email: string;
  p_project_id: string;
  p_app_url: string;
  p_base_url: string;
}
