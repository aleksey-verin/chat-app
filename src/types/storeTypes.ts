interface iRootMessages {
  messages: iMessage[];
}

interface iMessage {
  _id: string;
  text: string;
  user: iUser;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface iUser {
  email: string;
  name: string;
}
