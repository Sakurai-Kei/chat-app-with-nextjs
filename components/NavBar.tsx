import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { groups, users } from "../lib/mockData";
import useNavBar from "../lib/useNavBar";
import useUser from "../lib/useUser";
import ChatModal from "./ChatModal";
import { FormEvent } from "react";
import { IGroup, IRoomInstance } from "../interfaces/models";
import { useRouter } from "next/router";

export default function NavBar(props: any) {
  const router = useRouter();
  const { _id, navBar, mutateNavBar } = props;
  const [groupForm, setGroupForm] = useState({
    name: "",
    about: "",
  });
  const [errors, setErrors] = useState({
    error: "",
  });
  const [showChatModal, setShowChatModal] = useState(false);
  console.log(navBar);

  function groupFormChange(
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const value = event.currentTarget.value;
    setGroupForm({
      ...groupForm,
      [event.currentTarget.name]: value,
    });
  }

  async function groupFormSubmit(event: FormEvent) {
    event.preventDefault();

    const JSONdata = JSON.stringify(groupForm);
    const endpoint = "/api/groups/createGroup";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSONdata,
    };

    const response = await fetch(endpoint, options);
    if (response.status === 200) {
      console.log("Group Creation Success");
    } else {
      const result = await response.json();
      setErrors({
        error: `Status Code: ${response.status}(${result.error})`,
      });
    }
  }

  function chatModal() {
    if (!showChatModal) {
      setShowChatModal(true);
    } else {
      setShowChatModal(false);
    }
  }

  return (
    <>
      <div className="flex flex-col items-center flex-shrink-0 w-16 border-r border-gray-300 bg-gray-200 py-3">
        <div className="flex flex-col gap-4">
          {navBar.roomInstances &&
            navBar.roomInstances.map((instance: IRoomInstance) => {
              return (
                <div
                  className="w-10 h-10 rounded-lg bg-gray-400 hover:bg-gray-500"
                  key={instance._id.toString()}
                >
                  <Image
                    onClick={() => {
                      router.push("/app/user/" + instance._id.toString());
                    }}
                    src={"/vercel.svg"}
                    alt={"vercel"}
                    width={40}
                    height={40}
                  />
                </div>
              );
            })}
          {navBar.groups &&
            navBar.groups.map((group: IGroup) => {
              return (
                <div
                  className="w-10 h-10 rounded-lg bg-gray-400 hover:bg-gray-500"
                  key={group._id.toString()}
                >
                  <Image
                    onClick={() => {
                      router.push("/app/group/" + group._id.toString());
                    }}
                    src={"/vercel.svg"}
                    alt={"vercel"}
                    width={40}
                    height={40}
                  />
                </div>
              );
            })}
        </div>

        {/* <a
        className="w-10 h-10 rounded-lg bg-gray-400 hover:bg-gray-500"
        href="#"
      ></a>
      <a
        className="w-10 h-10 rounded-lg bg-gray-400 mt-4 shadow-outline border-4 border-gray-200"
        href="#"
      ></a>
      <a
        className="relative w-10 h-10 rounded-lg bg-gray-400 mt-4 hover:bg-gray-500"
        href="#"
      >
        <span className="absolute w-3 h-3 rounded-full bg-blue-400 top-0 right-0 -mt-1 -mr-1"></span>
      </a>
      <a
        className="w-10 h-10 rounded-lg bg-gray-400 mt-4 hover:bg-gray-500"
        href="#"
      ></a> */}
        <button
          className="flex items-center justify-center w-10 h-10 rounded-lg bg-transparent mt-4 hover:bg-gray-400"
          onClick={chatModal}
          disabled={showChatModal}
        >
          <svg
            className="w-6 h-6 fill-current"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            ></path>
          </svg>
        </button>
      </div>
      {showChatModal && (
        <div className="z-10 w-full flex flex-col">
          <ChatModal
            chatModal={chatModal}
            groupFormChange={groupFormChange}
            groupFormSubmit={groupFormSubmit}
          />
        </div>
      )}
    </>
  );
}
