import { useState, useRef, memo } from "react";
import CreateGroupModal from "./CreateGroupModal";
import { FormEvent } from "react";
import { useRouter } from "next/router";
import CreateInstanceModal from "./CreateInstanceModal";
import { NavBarProps } from "../interfaces/Components";
import { useCycle } from "framer-motion";
import { motion } from "framer-motion";
import Image from "next/image";
import { useDimensions } from "../lib/useDimension";
import {
  sidebar,
  navItem,
  listVariant,
} from "../lib/framer-motion-util/sidebar";

export default memo(NavBar);

function NavBar(props: NavBarProps) {
  const router = useRouter();
  const { _id, user, mutateUser } = props;
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
  const [isOpen, toggleOpen] = useCycle(false, true);
  const containerRef = useRef(null);
  const { height } = useDimensions(containerRef);

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
    const endpoint = "/api/v2/groups";
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
      mutateUser();
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
    const endpoint = "/api/v2/room-instances";
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
      mutateUser();
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

  return (
    <>
      <motion.nav
        initial={false}
        animate={isOpen ? "open" : "closed"}
        custom={height}
        ref={containerRef}
        className="w-32 md:w-20 flex flex-col bg-slate-800 overflow-hidden"
      >
        <motion.div
          className="flex h-screen w-28 md:w-20 bg-slate-300"
          variants={sidebar}
          onClick={() => toggleOpen()}
        >
          {!isOpen && user && user.imgsrc && (
            <motion.div
              initial={false}
              animate={isOpen ? { y: [0, 1000] } : { y: [1000, 0] }}
              variants={sidebar}
            >
              <Image
                src={user.imgsrc}
                alt={user.username}
                height={80}
                width={80}
                layout="fixed"
                className="rounded-2xl"
              />
            </motion.div>
          )}
          {isOpen && (
            <motion.ul variants={navItem} className="h-full p-4 flex flex-col">
              <div className="flex flex-col gap-4">
                {user.roomInstances &&
                  user.roomInstances.map((instance) => {
                    const otherUser = instance.members.filter(
                      (instanceMember) => {
                        return instanceMember.username !== user.username;
                      }
                    )[0];
                    return (
                      <motion.li
                        variants={listVariant}
                        animate={{ x: [-1000, 0] }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        key={instance._id.toString()}
                      >
                        <div
                          onClick={() => {
                            router.push(
                              "/app/instance/" + instance._id.toString()
                            );
                          }}
                          className="w-10 h-10 rounded-lg hover:opacity-50"
                        >
                          {instance && instance.members && otherUser.imgsrc && (
                            <Image
                              quality={100}
                              priority={true}
                              src={otherUser.imgsrc}
                              placeholder="blur"
                              blurDataURL={otherUser.imgsrc}
                              width={40}
                              height={40}
                              layout="intrinsic"
                              alt={otherUser.username}
                              className="rounded-lg shadow-md"
                            />
                          )}
                          {!otherUser.imgsrc && (
                            <div
                              onClick={() => {
                                router.push(
                                  "/app/instance/" + instance._id.toString()
                                );
                              }}
                              className="animate-pulse w-10 h-10 rounded-lg bg-slate-500 hover:bg-slate-600"
                            ></div>
                          )}
                        </div>
                      </motion.li>
                    );
                  })}
                {user.groups &&
                  user.groups.map((group) => {
                    return (
                      <motion.li
                        variants={listVariant}
                        animate={{ x: [-1000, 0] }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        key={group._id.toString()}
                      >
                        <div>
                          {group.imgsrc && (
                            <div
                              onClick={() => {
                                router.push(
                                  "/app/group/" + group._id.toString()
                                );
                              }}
                              className="w-10 h-10 rounded-lg hover:opacity-50"
                            >
                              <Image
                                quality={100}
                                priority={true}
                                src={group.imgsrc}
                                placeholder="blur"
                                blurDataURL={group.imgsrc}
                                width={40}
                                height={40}
                                layout="intrinsic"
                                alt={"shared by " + group.about}
                                className="rounded-lg shadow-md"
                              />
                            </div>
                          )}
                          {!group.imgsrc && (
                            <div
                              onClick={() => {
                                router.push(
                                  "/app/group/" + group._id.toString()
                                );
                              }}
                              className="animate-pulse w-10 h-10 rounded-lg bg-gray-400 hover:bg-gray-500"
                            ></div>
                          )}
                        </div>
                      </motion.li>
                    );
                  })}
              </div>
              <motion.button
                variants={listVariant}
                animate={{ x: [-1000, 0] }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
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
              </motion.button>
              <motion.button
                variants={listVariant}
                animate={{ x: [-1000, 0] }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
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
              </motion.button>
              <motion.li
                variants={listVariant}
                animate={{ x: [-1000, 0] }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="mt-auto w-10 h-10 rounded-lg bg-gray-400 hover:bg-gray-500"
              >
                <div>
                  {user && user.imgsrc && (
                    <div
                      onClick={() => {
                        setTimeout(() => {
                          router.push("/app/user/" + user.username);
                        }, 500);
                      }}
                      className="hover:opacity-50"
                    >
                      <Image
                        quality={100}
                        priority={true}
                        src={user.imgsrc}
                        placeholder="blur"
                        blurDataURL={user.imgsrc}
                        width={40}
                        height={40}
                        layout="intrinsic"
                        alt={"shared by " + user.username}
                        className="rounded-lg shadow-md"
                      />
                    </div>
                  )}
                  {(!user || !user.imgsrc) && (
                    <div
                      onClick={() => {
                        router.push("/app/user/" + user.username);
                      }}
                      className="animate-pulse w-10 h-10 rounded-lg shadow-sm bg-slate-600"
                    />
                  )}
                </div>
              </motion.li>
            </motion.ul>
          )}
        </motion.div>
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
      </motion.nav>
    </>
  );
}
