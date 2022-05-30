import { IronSessionData } from "iron-session";
import { IGroup, IRoomInstance } from "./models";

// export interface InstanceChatRoomPage {
//     user: IronSessionData;
//     instanceId: string
// }

export type InstanceChatRoomPage = IronSessionData & {
  roomInstance: IRoomInstance;
  instanceId: string;
};

export type GroupChatRoomPage = IronSessionData & {
  group: IGroup;
  groupId: string;
};
