import { Types } from "mongoose";

export interface IMessage {
  content: string;
  isImage: boolean;
  instance: "RoomInstance" | "Group";
  refId: Types.ObjectId | (IGroup | IRoomInstance);
  user: Types.ObjectId | IUser;
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
  groups: Types.DocumentArray<IGroup> | IGroup[];
  roomInstances: Types.DocumentArray<IRoomInstance> | IRoomInstance[];
}

export interface IGroup {
  _id: Types.ObjectId | string;
  name: string;
  about: string;
  members: Types.DocumentArray<IUser> | IUser[];
  messages: Types.DocumentArray<IMessage> | IMessage[];
  imgsrc: string;
}

export interface IRoomInstance {
  _id: Types.ObjectId;
  members: Types.DocumentArray<IUser> | IUser[];
  messages: Types.DocumentArray<IMessage> | IMessage[];
}
