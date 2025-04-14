export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
}

export class User {
  id: string;
  username: string;
  email: string;
  password?: string; // Hashed, optional as we might not always fetch it
  apiKey?: string; // Hashed, optional
  firstName?: string;
  lastName?: string;
  createdAt: Date;
  updatedAt: Date;
  role: UserRole;
  isEmailConfirmed: boolean;
}
