export type CommentType = {
  _id: string; 
  createdAt: string;
  post: string;
  text: string;
  updatedAt: string;
  likes: string[];
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


export type RoomType = {
  _id: string;
  room: string;
  owner: UserType;
  members: UserType[];
  maxMembers: number;
  currentMembers: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export type ChatType = {
  _id: string;
  __v: number;
  chat: string;
  createdAt: string;
  updatedAt: string;
  user: {
    id: string;
    name: string;
    profileImg: string | null
  }
}