import { IGroup, IGroupInstance, IMessage, IUser } from "../interfaces/models";

export const users: IUser[] = [
  {
    _id: 123465789,
    username: "User One",
    password: "random",
    email: "random@gmail.com",
    about: "About user one",
    groups: [],
    contactList: [],
  },
  {
    _id: 987654321,
    username: "User Two",
    password: "random",
    email: "secondBest@gmail.com",
    about: "About user two",
    groups: [],
    contactList: [],
  },
];

export const chatMessages: IMessage[] = [
  {
    content: "Message One",
    user: 123456789,
    timestamp: new Date(2022, 4, 9),
  },
  {
    content: "Message Two",
    user: 987654321,
    timestamp: new Date(2022, 4, 8),
  },
];

export const groups: IGroup[] = [
  {
    _id: 123465789,
    name: "Group One",
    about: "About group one",
    members: [],
  },
  {
    _id: 987654321,
    name: "Group two",
    about: "About group two",
    members: [],
  },
];

export const groupInstances: IGroupInstance[] = [
  {
    _id: 123465789, // ID for document
    member: 123456789, // ID for reference
    messages: [],
  },
  {
    _id: 987654321, // ID for document
    member: 987654321, // ID for reference
    messages: [],
  },
];
