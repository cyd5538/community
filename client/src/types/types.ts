export type Comment = {
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

export type User = {
  profileImage: string | null;
  _id: string;
  nickname: string;
  email: string;
  createdAt: string;
};

export type Post = {
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
