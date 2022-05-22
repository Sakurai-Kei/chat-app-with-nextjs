import { FormEvent, useEffect, useRef, useState } from "react";
import Link from "next/link";
import format from "date-fns/format";
import { IMessage } from "../interfaces/models";
import { ChatGroupProps } from "../interfaces/Components";
import dynamic from "next/dynamic";

const DynamicComponent = dynamic(() => import("./Emoji"), { ssr: false });

export default function ChatGroup(props: ChatGroupProps) {
  const { group, mutateGroup, userId } = props;
  const messageEndRef = useRef<HTMLDivElement>(null);
  const [chatForm, setChatForm] = useState({
    content: "",
  });
  const [emojiModal, setEmojiModal] = useState(false);

  function scrollToBottom() {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  function showEmojiModal() {
    if (emojiModal) {
      setEmojiModal(false);
      return;
    }
    setEmojiModal(true);
    setTimeout(() => {
      scrollToBottom();
    }, 100);
  }

  function chatFormChange(event: FormEvent<HTMLTextAreaElement>) {
    const value = event.currentTarget.value;
    setChatForm({
      ...chatForm,
      [event.currentTarget.name]: value,
    });
  }

  async function chatFormSubmit(event: FormEvent) {
    event.preventDefault();
    if (chatForm.content.trim().length === 0) {
      return;
    }
    const data = {
      content: chatForm.content,
      groupId: group._id.toString(),
      userId,
    };

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

  useEffect(() => {
    scrollToBottom();
  }, [group]);

  useEffect(() => {
    if (emojiModal) {
      setEmojiModal(false);
    }
  }, [chatForm]);

  return (
    <div className="flex flex-col flex-grow overflow-hidden">
      <div className="flex items-center gap-4 flex-shrink-0 h-16 bg-slate-800 border-b border-gray-300 px-4">
        <div className="w-12 h-12 flex justify-center items-center hover:bg-slate-400 hover:rounded-md">
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
                  <div className="h-10 w-10 rounded flex-shrink-0 bg-slate-500"></div>
                  <div className="ml-2">
                    <div className="-mt-1">
                      <span className="text-sm font-semibold">
                        {message.user.username.toString()}
                      </span>
                      <span className="ml-1 text-xs text-gray-500">
                        {format(new Date(message.timestamp), "KK.mm a, PPP")}
                      </span>
                    </div>
                    <p className="text-sm">{message.content}</p>
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
                <DynamicComponent
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
