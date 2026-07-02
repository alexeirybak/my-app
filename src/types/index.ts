export type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

export type Comment = {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
};

export type User = {
  id: number;
  name: string;
  email: string;
  username: string;
  phone: string;
  website: string;
};

export type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};
