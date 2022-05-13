import { useRouter } from "next/router";
import { FormEvent, FormEventHandler, useState } from "react";
import { IMessage } from "../interfaces/models";
import { chatMessages } from "../lib/mockData";
import { groups, users } from "../lib/mockData";

export default function Chat(props: any) {
  const { group, mutateGroup, userId } = props;
  const [chatForm, setChatForm] = useState({
    content: "",
  });

  function chatFormChange(event: FormEvent<HTMLTextAreaElement>) {
    const value = event.currentTarget.value;
    setChatForm({
      ...chatForm,
      [event.currentTarget.name]: value,
    });
  }

  async function chatFormSubmit(event: FormEvent) {
    event.preventDefault();

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

  return (
    <div className="flex flex-col flex-grow">
      <div className="flex items-center flex-shrink-0 h-16 bg-white border-b border-gray-300 px-4">
        <div>
          {group && (
            <>
              <h1 className="text-sm font-bold leading-none">{group.name}</h1>
              <span className="text-xs leading-none">{group.about}</span>
            </>
          )}
        </div>
      </div>
      <>
        {group &&
          group.messages.map((message: IMessage) => {
            return (
              <div key={message._id.toString()}>
                <div className="flex px-4 py-3">
                  <div className="h-10 w-10 rounded flex-shrink-0 bg-gray-300"></div>
                  <div className="ml-2">
                    <div className="-mt-1">
                      <span className="text-sm font-semibold">
                        {message.user.username.toString()}
                      </span>
                      <span className="ml-1 text-xs text-gray-500">
                        {message.timestamp.toString()}
                      </span>
                    </div>
                    <p className="text-sm">{message.content}</p>
                  </div>
                </div>
                <div className="flex flex-col items-center mt-2">
                  <hr className="w-full" />
                  <span className="flex items-center justify-center -mt-3 bg-white h-6 px-3 rounded-full border text-xs font-semibold mx-auto">
                    Today
                  </span>
                </div>
              </div>
            );
          })}
      </>

      <div className="bg-white p-4">
        <form
          onSubmit={chatFormSubmit}
          className="flex items-center border-2 border-gray-300 rounded-sm p-1"
        >
          <button className="flex-shrink flex items-center justify-center h-6 w-6 rounded hover:bg-gray-200">
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
            className="flex-grow text-sm px-3 border-l border-gray-300 ml-1"
            placeholder="Message council-of-elrond"
          ></textarea>
          <button className="flex-shrink flex items-center justify-center h-6 w-6 rounded hover:bg-gray-200">
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
          <button className="flex-shrink flex items-center justify-center h-6 w-6 rounded hover:bg-gray-200">
            <span className="leading-none w-4 h-4 -mt-px">@</span>
          </button>
          <button className="flex-shrink flex items-center justify-center h-6 w-6 rounded hover:bg-gray-200">
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
          <button className="flex-shrink flex items-center justify-center h-6 w-6 rounded hover:bg-gray-200">
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
