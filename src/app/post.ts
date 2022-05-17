export interface Post {
  photo: string | null,
  title: string,
  description: string,
  likes: string[],
  comments: [],
  sortID: number,
  createdBy: string,
  bookmarks: string[]
}

export interface User {
  email: string,
  name: string,
  logo: string,
  userID: string,
  status: string,
  background: string,
  followers: string[],
  following: string[]
 }

export interface EditDescription {
  title: string,
  description: string
}

export interface Like {
  likes: string[] | undefined
}

export interface NewComment {
  text: string,
  userID: string,
  date: number
}

export interface EditUser {
  name: string,
  logo: string | null,
  status: string,
  background: string | null,
}

export type ID = {
  id: string;
}

export type PostStore = Post & ID;
export type UserStore = User & ID;

