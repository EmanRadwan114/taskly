export interface IMember {
  name: string;
  email: string;
  role: 'owner' | 'viewer' | 'member' | 'admin';
}
