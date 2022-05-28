import React, {
  ChangeEventHandler,
  Dispatch,
  FormEvent,
  RefObject,
  SetStateAction,
} from "react";
import type { ReactElement, ReactNode, SyntheticEvent } from "react";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import { IGroup, IRoomInstance, IUser } from "./models";
import { KeyedMutator } from "swr";

interface Errors {
  error: string;
}

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export interface LayoutProps {
  children: React.ReactNode;
}

export interface ErrorAlertProps {
  errors: Errors;
}

export interface NavBarProps {
  _id: string;
  navBar: {
    user?: IUser;
    roomInstances?: IRoomInstance[];
    groups?: IGroup[];
  };
  mutateNavBar: {
    mutateUser: KeyedMutator<IUser>;
    mutateRoomInstances: KeyedMutator<IRoomInstance[]>;
    mutateGroups: KeyedMutator<IGroup[]>;
  };
}

export interface ChatInstanceProps {
  userId: string;
  instance: IRoomInstance;
  mutateInstance: KeyedMutator<IRoomInstance>;
}

export interface GroupSettingsModalProps {
  group: Partial<IGroup>;
  showGroupSettingsModal: () => void;
  groupForm: Partial<IGroup>;
  mutateGroup: KeyedMutator<IGroup>;
  groupFormChange: (event: FormEvent<HTMLInputElement>) => void;
  groupFormSubmit: (event: FormEvent) => Promise<void>;
}

export interface DeleteModalProps {
  deleteModal: () => void;
  userFormChange: (event: FormEvent<HTMLInputElement>) => void;
  deleteAccountSubmit: (
    event: SyntheticEvent<HTMLButtonElement>
  ) => Promise<void>;
}

export interface EmojiProps {
  chatForm: {
    content: string;
  };
  setChatForm: Dispatch<SetStateAction<{ content: string }>>;
}

export interface UploadImageProps {
  stagedImage: File | undefined;
  stagedImageChange: (event: FormEvent<HTMLInputElement>) => void;
  stagedImageUpload: (event: FormEvent) => Promise<void>;
  inputImageRef: RefObject<HTMLInputElement>;
}

export interface EmojiObject {
  activeSkinTone: string;
  emoji: string;
  names: string[];
  originalUnified: string;
  unified: string;
}

export interface ChatGroupProps {
  userId: string;
  group: IGroup;
  mutateGroup: KeyedMutator<IGroup>;
}

export interface ChatModalProps {
  chatModal: () => void;
  groupFormSubmit: (event: FormEvent) => Promise<void>;
  groupFormChange: (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

export interface InstanceModalProps {
  instanceModal: () => void;
  instanceFormSubmit: (event: FormEvent) => Promise<void>;
  instanceFormChange: (event: FormEvent<HTMLInputElement>) => void;
}

export interface MemberListProps {
  group: IGroup;
  mutateGroup: KeyedMutator<IGroup>;
}

export interface RegisterFormProps {
  errors: Errors;
  isProcessing: boolean;
  handleSubmit: (event: FormEvent) => Promise<void>;
  handleChange: (event: FormEvent<HTMLInputElement>) => void;
}

export interface LogInFormProps {
  errors: Errors;
  isProcessing: boolean;
  handleSubmit: (event: FormEvent) => Promise<void>;
  handleChange: (event: FormEvent<HTMLInputElement>) => void;
}
