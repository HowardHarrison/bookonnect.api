export interface UserEntity {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  profileImage?: string;
  savedBooks: string[];
}
