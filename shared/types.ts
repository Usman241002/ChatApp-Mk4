export type UserFormData = {
  username: string;
  age: number;
  gender: string;
  country: string;
};

export type User = {
  id: string;
  username: string;
  age: number;
  gender: string;
  country: string;
  isLoggedIn: boolean;
};

export type Message = {
  to: string;
  from: string;
  message: string;
};

export type MessageHistoryState = {
  [id: string]: {
    user: Omit<User, "isLoggedIn">;
    messages: Message[];
    unreadStatus: boolean;
  };
};
