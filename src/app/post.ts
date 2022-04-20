export interface Post {
  photo: string,
  title: string,
  description: string,
  likes: number,
  comments: number
}

export type User = {
  name: string;
  surname: string;
};

export type ID = {
  id: string;
}

export type UserStore = User & ID;
