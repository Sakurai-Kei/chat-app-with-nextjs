import { Types } from "mongoose";

export interface IMessage {
  content: string;
  isImage: boolean;
  instance: "private" | "group";
  user: Types.ObjectId;
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
  groups: Types.DocumentArray<IGroup> | Types.ObjectId[] | IGroup[];
  roomInstances:
    | Types.DocumentArray<IRoomInstance>
    | Types.ObjectId[]
    | IRoomInstance[];
}

export interface IGroup {
  _id: Types.ObjectId | string;
  name: string;
  about: string;
  members: Types.DocumentArray<IUser> | Types.ObjectId[] | IUser[];
  messages: Types.DocumentArray<IMessage> | Types.ObjectId[] | IMessage[];
  imgsrc: string;
}

export interface IRoomInstance {
  _id: Types.ObjectId;
  members: Types.DocumentArray<IUser>;
  messages: Types.DocumentArray<IMessage> | Types.ObjectId[] | IMessage[];
}
