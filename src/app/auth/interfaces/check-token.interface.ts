export interface CheckToken {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  avatar: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date | null;
  token: string;
}
