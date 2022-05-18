import { IronSessionData } from "iron-session";

// export interface InstanceChatRoomPage {
//     user: IronSessionData;
//     instanceId: string
// }

export type InstanceChatRoomPage = IronSessionData & { instanceId: string };

export type GroupChatRoomPage = IronSessionData & { id: string };
