export interface BookEntity {
  id: string;
  title: string;
  description?: string;
  publishDate?: Date | null;
  coverImage?: string;
  writer?: { id: string; name: string } | null;
  categories: Array<{ id: string; name: string }>;
}
