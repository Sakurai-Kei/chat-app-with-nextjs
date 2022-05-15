import { Types } from "mongoose";

export interface IMessage {
  content: string;
  user: IUser;
  timestamp: Date;
  _id: Types.ObjectId;
}

export interface IUser {
  _id: Types.ObjectId;
  username: string;
  password: string;
  email: string;
  about: string;
  groups: Types.DocumentArray<IGroup> | IGroup[];
  contactList: Types.DocumentArray<IUser> | IUser[];
}

export interface IGroup {
  _id: Types.ObjectId;
  name: string;
  about: string;
  members: Types.DocumentArray<IUser> | IUser[];
  messages: IMessage[];
}

export interface IRoomInstance {
  _id: Types.ObjectId;
  members: Types.DocumentArray<IUser>;
  messages: IMessage[];
}

export interface IGroupInstance {
  _id: Types.ObjectId;
  member: Types.ObjectId | number;
  messages: IMessage[];
}
