export type CommentType = {
  _id: string; 
  createdAt: string;
  post: string;
  text: string;
  updatedAt: string;
  user: {
    createdAt: string;
    nickname: string;
    profileImage: string | null;
    _id: string;
  };
  __v: number;
};

export type UserType = {
  profileImage: string | null;
  _id?: string;
  id?: string
  nickname: string;
  email: string;
  createdAt?: string;
};

export type PostType = {
  _id: string;
  comments: CommentType[];
  video: string | null;
  createdAt: string;
  description: string;
  image: string | null;
  likes: LikeType[]; 
  title: string;
  updatedAt: string;
  user: UserType;
  __v: number;
};

export type LikeType = {
  user: string;
  post: PostType;
  createdAt: string;
  description: string;
}

export type UserData = {
  email: string, 
  nickname?: string, 
  password: string
}