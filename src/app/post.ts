export interface Post {
  photo: string,
  title: string,
  description: string,
  likes: number,
  comments: number
}

export type ID = {
  id: string;
}

export type PostStore = Post & ID;
