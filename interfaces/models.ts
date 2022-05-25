import { Types } from "mongoose";

export interface IMessage {
  content: string;
  isImage: boolean;
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
  imgsrc: string;
}

export interface IGroup {
  _id: Types.ObjectId | string;
  name: string;
  about: string;
  members: Types.DocumentArray<IUser> | IUser[];
  messages: IMessage[];
  imgsrc: string;
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
