export interface ReviewEntity {
  id: string;
  userId: string;
  bookId: string;
  rating: number;
  comment: string;
  createdAt?: Date;
  user?: {
    id: string;
    firstName?: string;
    profileImage?: string;
  };
}
