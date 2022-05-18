import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { groups, users } from "../lib/mockData";
import useNavBar from "../lib/useNavBar";
import useUser from "../lib/useUser";
import CreateGroupModal from "./CreateGroupModal";
import { FormEvent } from "react";
import { IGroup, IRoomInstance } from "../interfaces/models";
import { useRouter } from "next/router";
import CreateInstanceModal from "./CreateInstanceModal";

export default function NavBar(props: any) {
  const router = useRouter();
  const { _id, navBar, mutateNavBar } = props;
  const [groupForm, setGroupForm] = useState({
    name: "",
    about: "",
  });
  const [instanceForm, setInstanceForm] = useState({
    userId: _id,
    targetMemberUsername: "",
  });
  const [errors, setErrors] = useState({
    error: "",
  });
  const [showChatModal, setShowChatModal] = useState(false);
  const [showInstanceModal, setShowInstanceModal] = useState(false);
  const [showNavBarComponent, setShowNavBarComponent] = useState(false);

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

    if (groupForm.name.trim().length === 0) {
      return;
    }

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
      chatModal();
      mutateNavBar.mutateGroups();
    } else {
      const result = await response.json();
      setErrors({
        error: `Status Code: ${response.status}(${result.error})`,
      });
    }
  }

  function instanceFormChange(event: FormEvent<HTMLInputElement>) {
    const value = event.currentTarget.value;
    setInstanceForm({
      ...instanceForm,
      [event.currentTarget.name]: value,
    });
  }

  async function instanceFormSubmit(event: FormEvent) {
    event.preventDefault();

    if (instanceForm.targetMemberUsername.trim().length === 0) {
      return;
    }

    const JSONdata = JSON.stringify(instanceForm);
    const endpoint = "/api/room-instances/createInstance";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSONdata,
    };

    const response = await fetch(endpoint, options);
    if (response.status === 200) {
      instanceModal();
      mutateNavBar.mutateRoomInstances();
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

  function instanceModal() {
    if (!showInstanceModal) {
      setShowInstanceModal(true);
    } else {
      setShowInstanceModal(false);
    }
  }

  function navBarComponent() {
    if (!showNavBarComponent) {
      setShowNavBarComponent(true);
    } else {
      setShowNavBarComponent(false);
    }
  }

  if (!showNavBarComponent) {
    return (
      <button
        onClick={navBarComponent}
        className="w-12 flex justify-center items-center rounded-r-md bg-slate-800 hover:bg-slate-700 hover:animate-bounceRight"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8 5H21V7H8V5ZM3 4.5H6V7.5H3V4.5ZM3 10.5H6V13.5H3V10.5ZM3 16.5H6V19.5H3V16.5ZM8 11H21V13H8V11ZM8 17H21V19H8V17Z"
            fill="white"
          ></path>
        </svg>
      </button>
    );
  } else {
    return (
      <>
        <div className="flex flex-col items-center flex-shrink-0 w-16 border-r border-gray-300 bg-slate-600 py-3">
          <button
            onClick={navBarComponent}
            className="w-12 mb-4 flex justify-center items-center rounded-md hover:bg-indigo-400"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8 5H21V7H8V5ZM3 4.5H6V7.5H3V4.5ZM3 10.5H6V13.5H3V10.5ZM3 16.5H6V19.5H3V16.5ZM8 11H21V13H8V11ZM8 17H21V19H8V17Z"
                fill="white"
              ></path>
            </svg>
          </button>
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
                        router.push("/app/instance/" + instance._id.toString());
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
          <button
            className="flex items-center justify-center w-10 h-10 rounded-lg bg-transparent mt-4 hover:bg-indigo-400"
            onClick={chatModal}
            disabled={showChatModal}
          >
            <svg
              className="w-6 h-6 fill-current"
              fill="none"
              stroke="white"
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
          <button
            onClick={instanceModal}
            className="flex items-center justify-center w-10 h-10 rounded-lg bg-transparent mt-4 hover:bg-indigo-400"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19 10H17V7H14V5H17V2H19V5H22V7H19V10Z"
                fill="white"
              ></path>
              <path
                d="M21 12H19V15H8.334C7.90107 14.9988 7.47964 15.1393 7.134 15.4L5 17V5H12V3H5C3.89543 3 3 3.89543 3 5V21L7.8 17.4C8.14582 17.1396 8.56713 16.9992 9 17H19C20.1046 17 21 16.1046 21 15V12Z"
                fill="white"
              ></path>
            </svg>
          </button>
        </div>
        {showChatModal && (
          <div className="z-10 w-full absolute">
            <CreateGroupModal
              chatModal={chatModal}
              groupFormChange={groupFormChange}
              groupFormSubmit={groupFormSubmit}
            />
          </div>
        )}
        {showInstanceModal && (
          <div className="z-10 w-full absolute">
            <CreateInstanceModal
              instanceModal={instanceModal}
              instanceFormChange={instanceFormChange}
              instanceFormSubmit={instanceFormSubmit}
            />
          </div>
        )}
      </>
    );
  }
}
