export class Post {
  id?: number;
  title?: string;
  content: string = "";
  author?: User;
  authorId?: number;
  parentPostId?: number;
  responses?: Post[];
  topic?: Topic;
  dateIni: string = "";
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
