import { Types } from "mongoose";

export interface IMessage {
  content: string;
  user: Types.ObjectId | number;
  timestamp: Date;
}

export interface IUser {
  _id: Types.ObjectId | number;
  username: string;
  password: string;
  email: string;
  about: string;
  groups: Types.DocumentArray<IGroup> | IGroup[];
  contactList: Types.DocumentArray<IUser> | IUser[];
}

export interface IGroup {
  _id: Types.ObjectId | number;
  name: string;
  about: string;
  members: Types.DocumentArray<IUser> | IUser[];
  messages: IMessage[];
}

export interface IRoomInstance {
  _id: Types.ObjectId | number;
  members: Types.DocumentArray<IUser>;
  messages: IMessage[];
}

export interface IGroupInstance {
  _id: Types.ObjectId | number;
  member: Types.ObjectId | number;
  messages: IMessage[];
}
