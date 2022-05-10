import { Types } from "mongoose";

interface IMessage {
  content: string;
  user: Types.ObjectId;
  timestamp: Date;
}

export interface IUser {
  _id: Types.ObjectId;
  username: string;
  password: string;
  email: string;
  about: string;
  groups: Types.DocumentArray<IGroup>;
}

export interface IGroup {
  _id: Types.ObjectId;
  name: string;
  about: string;
  members: Types.DocumentArray<IUser>;
}

export interface IRoomInstance {
  _id: Types.ObjectId;
  members: Types.DocumentArray<IUser>;
  messages: IMessage[];
}

export interface IGroupInstance {
  _id: Types.ObjectId;
  member: Types.ObjectId;
  messages: IMessage[];
}
