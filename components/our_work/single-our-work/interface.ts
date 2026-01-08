export interface User {
  name: string;
  image: string;
  createdAt: string;
  role: string;
  _id: string;
}

export interface Attachment {
  type: "image" | "video" | "file";
  url?: string;
  thumbnail?: string;
  title?: string;
  meta?: string;
}

export interface CommentData {
  _id: string;
  owner: User;
  comment: string;
  title?: string;
  content: string;
  likes: number;
  replies: number;
  createdAt: string;
  forum: string;
  image: string[];
  type: string;
  attachments?: Attachment[];
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}
