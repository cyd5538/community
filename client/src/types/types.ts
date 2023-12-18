export type CommentType = {
  _id: string;
  createdAt: string;
  description: string;
  image: string;
  likes: any[]; 
  title: string;
  updatedAt: string;
  user: User;
  __v: number;
};

export type UserType = {
  profileImage: string | null;
  _id: string;
  nickname: string;
  email: string;
  createdAt: string;
};

export type PostType = {
  _id: string;
  comments: Comment[];
  createdAt: string;
  description: string;
  image: string;
  likes: any[]; 
  title: string;
  updatedAt: string;
  user: User;
  __v: number;
};
