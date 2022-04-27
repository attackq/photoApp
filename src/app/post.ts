export interface Post {
  photo: string | null,
  title: string,
  description: string,
  likes: number,
  comments: number
}

export interface EditDescription {
  title: string,
  description: string
}

export type ID = {
  id: string;
}

export type PostStore = Post & ID;
