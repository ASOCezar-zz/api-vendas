export interface IUpdateProfile {
  name: string;
  password?: string;
  old_password?: string;
  email: string;
  user_id: string;
}
