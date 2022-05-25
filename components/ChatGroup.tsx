import { FormEvent, useEffect, useRef, useState } from "react";
import Link from "next/link";
import format from "date-fns/format";
import { IMessage } from "../interfaces/models";
import { ChatGroupProps } from "../interfaces/Components";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter } from "next/router";
import GroupSettingModal from "./GroupSettingsModal";

const DynamicComponentEmojiModal = dynamic(() => import("./Emoji"), {
  ssr: false,
});
const DynamicComponentVideoPlayer = dynamic(() => import("./VideoPlayer"));

export default function ChatGroup(props: ChatGroupProps) {
  const { group, mutateGroup, userId } = props;
  const router = useRouter();
  const messageEndRef = useRef<HTMLDivElement>(null);
  const groupSettingsRef = useRef<HTMLDivElement>(null);
  const [chatForm, setChatForm] = useState({
    content: "",
  });
  const [groupForm, setGroupForm] = useState({
    _id: "",
    name: "",
    about: "",
    imgsrc: "",
  });
  const [emojiModal, setEmojiModal] = useState(false);
  const [groupSettingsModal, setGroupSettingsModal] = useState(false);

  function scrollToBottom() {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  function showEmojiModal() {
    if (emojiModal) {
      setEmojiModal(false);
      return;
    }
    setEmojiModal(true);
  }

  function showGroupSettingsModal() {
    if (groupSettingsModal) {
      setGroupSettingsModal(false);
      return;
    }
    setGroupSettingsModal(true);
  }

  function chatFormChange(event: FormEvent<HTMLTextAreaElement>) {
    const value = event.currentTarget.value;
    setChatForm({
      ...chatForm,
      [event.currentTarget.name]: value,
    });
  }

  function groupFormChange(event: FormEvent<HTMLInputElement>) {
    const value = event.currentTarget.value;
    setGroupForm({
      ...groupForm,
      [event.currentTarget.name]: value,
    });
  }

  async function chatFormSubmit(event: FormEvent) {
    event.preventDefault();
    if (chatForm.content.trim().length === 0) {
      return;
    }
    let data = {
      content: chatForm.content,
      isImage: false,
      groupId: group._id.toString(),
      userId,
    };
    if (chatForm.content.match("https://")) {
      data = {
        ...data,
        isImage: true,
      };
    }

    const JSONdata = JSON.stringify(data);
    const endpoint = "/api/groups/instance/createMessage";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSONdata,
    };

    const response = await fetch(endpoint, options);
    if (response.status === 200) {
      setChatForm({
        ...chatForm,
        content: "",
      });
      mutateGroup();
    } else {
      const result = await response.json();
      console.error(`Status Code: ${response.status}(${result.error})`);
    }
  }

  async function groupFormSubmit(event: FormEvent) {
    event.preventDefault();
    if (groupForm.name.trim().length === 0) {
      return;
    }
    const JSONdata = JSON.stringify(groupForm);
    const endpoint = "/api/groups/update";
    const options = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSONdata,
    };

    const response = await fetch(endpoint, options);
    if (response.status === 200) {
      mutateGroup();
      showGroupSettingsModal();
    } else {
      const result = await response.json();
      console.error(`Status Code: ${response.status}(${result.error})`);
    }
  }

  useEffect(() => {
    scrollToBottom();
  }, [group]);

  useEffect(() => {
    setEmojiModal(false);
  }, [chatForm]);

  useEffect(() => {
    if (group && group.name && group.about) {
      setGroupForm({
        _id: group._id.toString(),
        name: group.name,
        about: group.about,
        imgsrc: group.imgsrc,
      });
    }
  }, [group, groupSettingsModal]);

  return (
    <div className="flex flex-col flex-grow overflow-hidden">
      <div className="flex items-center gap-4 flex-shrink-0 h-16 bg-slate-800 border-b border-gray-300 px-4">
        <div className="w-12 h-12 flex justify-center items-center rounded-lg hover:bg-slate-500">
          <Link href={"/app"}>
            <a>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 13L11.293 3.70697C11.6835 3.31659 12.3165 3.31659 12.707 3.70697L22 13H20V21C20 21.5523 19.5523 22 19 22H14V15H10V22H5C4.44772 22 4 21.5523 4 21V13H2Z"
                  fill="white"
                ></path>
              </svg>
            </a>
          </Link>
        </div>
        <div className="w-12 h-12 flex justify-center items-center rounded-lg hover:bg-slate-500">
          <button
            onClick={() => {
              showGroupSettingsModal();
              setTimeout(() => {
                groupSettingsRef.current!.className =
                  "transition ease-in-out w-full h-full absolute bottom-full left-0 translate-y-full bg-slate-500 bg-opacity-50 z-10";
              });
            }}
            className="text-white"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.8199 22H10.1799C9.71003 22 9.30347 21.673 9.20292 21.214L8.79592 19.33C8.25297 19.0921 7.73814 18.7946 7.26092 18.443L5.42392 19.028C4.97592 19.1709 4.48891 18.9823 4.25392 18.575L2.42992 15.424C2.19751 15.0165 2.27758 14.5025 2.62292 14.185L4.04792 12.885C3.98312 12.2961 3.98312 11.7019 4.04792 11.113L2.62292 9.816C2.27707 9.49837 2.19697 8.98372 2.42992 8.576L4.24992 5.423C4.48491 5.0157 4.97192 4.82714 5.41992 4.97L7.25692 5.555C7.50098 5.37416 7.75505 5.20722 8.01792 5.055C8.27026 4.91269 8.52995 4.78385 8.79592 4.669L9.20392 2.787C9.30399 2.32797 9.71011 2.00049 10.1799 2H13.8199C14.2897 2.00049 14.6958 2.32797 14.7959 2.787L15.2079 4.67C15.4887 4.79352 15.7622 4.93308 16.0269 5.088C16.2739 5.23081 16.5126 5.38739 16.7419 5.557L18.5799 4.972C19.0276 4.82967 19.514 5.01816 19.7489 5.425L21.5689 8.578C21.8013 8.98548 21.7213 9.49951 21.3759 9.817L19.9509 11.117C20.0157 11.7059 20.0157 12.3001 19.9509 12.889L21.3759 14.189C21.7213 14.5065 21.8013 15.0205 21.5689 15.428L19.7489 18.581C19.514 18.9878 19.0276 19.1763 18.5799 19.034L16.7419 18.449C16.5093 18.6203 16.2677 18.7789 16.0179 18.924C15.7557 19.0759 15.4853 19.2131 15.2079 19.335L14.7959 21.214C14.6954 21.6726 14.2894 21.9996 13.8199 22ZM7.61992 16.229L8.43992 16.829C8.62477 16.9652 8.81743 17.0904 9.01692 17.204C9.20462 17.3127 9.39788 17.4115 9.59592 17.5L10.5289 17.909L10.9859 20H13.0159L13.4729 17.908L14.4059 17.499C14.8132 17.3194 15.1998 17.0961 15.5589 16.833L16.3799 16.233L18.4209 16.883L19.4359 15.125L17.8529 13.682L17.9649 12.67C18.0141 12.2274 18.0141 11.7806 17.9649 11.338L17.8529 10.326L19.4369 8.88L18.4209 7.121L16.3799 7.771L15.5589 7.171C15.1997 6.90671 14.8132 6.68175 14.4059 6.5L13.4729 6.091L13.0159 4H10.9859L10.5269 6.092L9.59592 6.5C9.39772 6.58704 9.20444 6.68486 9.01692 6.793C8.81866 6.90633 8.62701 7.03086 8.44292 7.166L7.62192 7.766L5.58192 7.116L4.56492 8.88L6.14792 10.321L6.03592 11.334C5.98672 11.7766 5.98672 12.2234 6.03592 12.666L6.14792 13.678L4.56492 15.121L5.57992 16.879L7.61992 16.229ZM11.9959 16C9.78678 16 7.99592 14.2091 7.99592 12C7.99592 9.79086 9.78678 8 11.9959 8C14.2051 8 15.9959 9.79086 15.9959 12C15.9932 14.208 14.2039 15.9972 11.9959 16ZM11.9959 10C10.9033 10.0011 10.0138 10.8788 9.99815 11.9713C9.98249 13.0638 10.8465 13.9667 11.9386 13.9991C13.0307 14.0315 13.9468 13.1815 13.9959 12.09V12.49V12C13.9959 10.8954 13.1005 10 11.9959 10Z"
                fill="white"
              ></path>
            </svg>
          </button>
          {groupSettingsModal && (
            <div
              ref={groupSettingsRef}
              className="transition ease-in-out w-full h-full absolute bottom-full left-0 bg-slate-500 bg-opacity-50 z-10"
            >
              <GroupSettingModal
                group={group}
                showGroupSettingsModal={showGroupSettingsModal}
                groupForm={groupForm}
                groupFormChange={groupFormChange}
                groupFormSubmit={groupFormSubmit}
              />
            </div>
          )}
        </div>
        <div>
          {group && (
            <>
              <h1 className="text-sm font-bold leading-none text-white">
                {group.name}
              </h1>
              <span className="text-xs leading-none text-gray-300">
                {group.about}
              </span>
            </>
          )}
        </div>
      </div>
      <div className="overflow-y-scroll">
        {group &&
          group.messages &&
          group.messages.map((message: IMessage) => {
            return (
              <div className="bg-slate-300" key={message._id.toString()}>
                <div className="flex px-4 py-3">
                  <div className="h-10 w-10 md:h-20 md:w-20 rounded-lg flex-shrink-0">
                    {message.user.imgsrc && (
                      <Image
                        onClick={() => {
                          router.push("/app/user/" + message.user.username);
                        }}
                        src={message.user.imgsrc}
                        alt={message.user.username}
                        width={100}
                        height={100}
                        layout="responsive"
                        className="rounded-lg hover:opacity-70"
                      />
                    )}
                    {!message.user.imgsrc && (
                      <div className="animate-pulse w-10 h-10 md:w-20 md:h-20 flex-shrink-0 bg-slate-500 rounded-lg"></div>
                    )}
                  </div>
                  <div className="ml-2">
                    <div className="-mt-1">
                      <span className="text-sm font-semibold">
                        {message.user.username.toString()}
                      </span>
                      <span className="ml-1 text-xs text-gray-500">
                        {format(new Date(message.timestamp), "KK.mm a, PPP")}
                      </span>
                    </div>
                    {!message.isImage && (
                      <p className="text-sm">{message.content}</p>
                    )}
                    {message.isImage && message.content.match(".mp4") && (
                      <DynamicComponentVideoPlayer
                        sources={[
                          {
                            src: message.content,
                            type: "video/mp4",
                          },
                        ]}
                      />
                    )}
                    {message.isImage && !message.content.match(".mp4") && (
                      <Image
                        quality={100}
                        priority={true}
                        src={message.content}
                        width={480}
                        height={480}
                        layout="intrinsic"
                        alt={"shared by " + message.user.username.toString()}
                      />
                    )}
                  </div>
                </div>
                <div className="flex flex-col items-center mt-2">
                  <hr className="w-full" />
                </div>
              </div>
            );
          })}
        {!group && (
          <div className="w-full flex justify-center items-center">
            <svg
              className="animate-spin"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.995 4.00001C7.8362 3.99432 4.36664 7.17599 4.01299 11.3197C3.65933 15.4634 6.53955 19.187 10.6391 19.8862C14.7387 20.5853 18.6903 18.0267 19.73 14H17.649C16.6318 16.8771 13.617 18.5324 10.6434 17.8465C7.66989 17.1605 5.68488 14.3519 6.03079 11.3199C6.3767 8.28792 8.94332 5.99856 11.995 6.00001C13.5845 6.00234 15.1064 6.64379 16.218 7.78002L13 11H20V4.00001L17.649 6.35002C16.1527 4.84464 14.1175 3.99873 11.995 4.00001Z"
                fill="#2E3A59"
              ></path>
            </svg>
          </div>
        )}
        <div ref={messageEndRef}></div>
      </div>

      <div className="bg-slate-800 p-4 mt-auto">
        <form
          onSubmit={chatFormSubmit}
          className="flex items-center border-2 border-gray-300 bg-slate-500 rounded-sm px-1"
        >
          <button
            type="button"
            className="flex-shrink flex items-center justify-center h-6 w-6 rounded hover:bg-gray-200"
          >
            <svg
              className="h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </button>
          <textarea
            onChange={chatFormChange}
            name="content"
            value={chatForm.content}
            className="flex-grow align-middle resize-none text-sm px-3 border-l border-gray-300 ml-1"
          ></textarea>
          <button
            type="button"
            className="flex-shrink flex items-center justify-center h-6 w-6 rounded hover:bg-gray-200"
          >
            <svg
              className="h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <button
            type="button"
            className="flex-shrink flex items-center justify-center h-6 w-6 rounded hover:bg-gray-200"
          >
            <span className="leading-none w-4 h-4 -mt-px">@</span>
          </button>
          <div className="flex flex-col">
            <div className="absolute ml-20 md:mr-20 -translate-x-full -translate-y-full">
              {emojiModal && (
                <DynamicComponentEmojiModal
                  chatForm={chatForm}
                  setChatForm={setChatForm}
                />
              )}
            </div>
            <button
              type="button"
              onClick={showEmojiModal}
              className="flex-shrink flex items-center justify-center h-6 w-6 rounded hover:bg-gray-200"
            >
              <svg
                className="h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-.464 5.535a1 1 0 10-1.415-1.414 3 3 0 01-4.242 0 1 1 0 00-1.415 1.414 5 5 0 007.072 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
          <button
            type="button"
            className="flex-shrink flex items-center justify-center h-6 w-6 rounded hover:bg-gray-200"
          >
            <svg
              className="h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <button
            className="flex-shrink flex items-center justify-center h-6 w-6 rounded hover:bg-gray-200"
            type="submit"
          >
            <svg
              className="h-4 w-4 transform rotate-90"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
}
