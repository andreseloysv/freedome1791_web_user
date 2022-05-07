export class Post {
  id?: number;
  title?: string;
  content = "";
  author?: User;
  authorId?: number;
  parentPostId?: number;
  responses?: Post[];
  topic?: Topic;
  dateIni = "";
}
export class User {
  id?: number;
  firstName?: string;
  secondName?: string;
  firstSurname?: string;
  secondSurname?: string;
  email?: string;
  username?: string;
  profileImage?: string;
  posts?: Post[];
}

export class Topic {
  id?: number;
  name?: string;
  description?: string;
  expire?: string;
  autoDestroy?: string;
}
