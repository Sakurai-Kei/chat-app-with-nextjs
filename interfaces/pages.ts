import { IronSessionData } from "iron-session";
import { IGroup, IRoomInstance, IUser } from "./models";

export type InstanceChatRoomPage = IronSessionData & {
  roomInstance: IRoomInstance;
  instanceId: string;
};

export type GroupChatRoomPage = IronSessionData & {
  group: IGroup;
  groupId: string;
};

export type AppPage = IronSessionData & {
  navBar: {
    user: IUser;
    groups: IGroup[];
    roomInstances: IRoomInstance[];
  };
};
