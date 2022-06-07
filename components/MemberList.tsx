import { FormEvent, memo, useRef, useState } from "react";
import { AnimatePresence, motion, useCycle } from "framer-motion";
import { MemberListProps } from "../interfaces/Components";
import { IUser } from "../interfaces/models";
import { useRouter } from "next/router";
import isEqual from "lodash/isEqual";
import Image from "next/image";
import { useDimensions } from "../lib/useDimension";
import {
  sidebar,
  memberListSidebar,
  navItem,
  listVariant,
} from "../lib/framer-motion-util/constants";

export default memo(MemberList, (prevProp, nextProp) => {
  if (isEqual(prevProp.group.members, nextProp.group.members)) {
    return true;
  }
  return false;
});

function MemberList(props: MemberListProps) {
  const { group, mutateGroup } = props;
  const router = useRouter();
  const [showAddMember, setShowAddMember] = useState(false);
  const [findUserId, setFindUserId] = useState({
    memberId: "",
  });
  const [isOpen, toggleOpen] = useCycle(false, true);
  const containerRef = useRef(null);
  const { height, width } = useDimensions(containerRef);

  function addMemberComponent() {
    if (showAddMember) {
      setShowAddMember(false);
    } else {
      setShowAddMember(true);
    }
  }

  function addMemberChange(event: FormEvent<HTMLInputElement>) {
    const value = event.currentTarget.value;
    setFindUserId({
      ...findUserId,
      [event.currentTarget.name]: value,
    });
  }

  async function addMemberSubmit(event: FormEvent) {
    event.preventDefault();

    if (findUserId.memberId.trim().length === 0) {
      return;
    }

    const data = {
      memberId: findUserId.memberId,
      groupId: group._id.toString(),
    };
    const JSONdata = JSON.stringify(data);
    const endpoint = `/api/v2/groups/${group._id.toString()}`;
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
      setFindUserId({
        ...findUserId,
        memberId: "",
      });
      addMemberComponent();
    } else {
      const result = await response.json();
      console.error("Error has occured: " + result.error);
    }
  }

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.nav
            key={"memberListClosed"}
            initial={false}
            animate={isOpen ? "open" : "closed"}
            custom={width}
            ref={containerRef}
            exit={{ opacity: 0, x: [0, 100], width: 0 }}
            className="relative right-0 flex flex-col w-32 md:w-24 bg-slate-800 overflow-hidden"
          >
            <motion.div
              className="relative top-[50%] flex h-screen w-full bg-slate-300"
              variants={memberListSidebar}
              onClick={() => toggleOpen()}
            >
              {!isOpen && group && group.imgsrc && (
                <Image
                  src={group.imgsrc}
                  alt={group.name}
                  width={80}
                  height={80}
                  layout="fixed"
                />
              )}
            </motion.div>
          </motion.nav>
        )}
        {isOpen && (
          <motion.nav
            key={"memberListOpened"}
            initial={false}
            animate={isOpen ? "open" : "closed"}
            custom={width}
            ref={containerRef}
            exit={{ opacity: 0, width: 0 }}
            className="absolute md:relative right-0 flex flex-col w-screen md:w-1/4 bg-slate-800 overflow-hidden"
          >
            <motion.div
              className="flex h-screen w-full bg-slate-300"
              variants={memberListSidebar}
              onClick={() => toggleOpen()}
            >
              {isOpen && (
                <div className="flex flex-col flex-grow w-full h-screen z-10 text-white bg-slate-800">
                  <motion.ul variants={navItem} className="overflow-hidden">
                    <motion.li
                      variants={listVariant}
                      animate={{ y: [-1000, 0] }}
                      onClick={(event) => {
                        event.stopPropagation();
                      }}
                    >
                      <div className="flex items-center h-16 border-b border-gray-300 px-4">
                        <div className="flex flex-col gap-2">
                          <h2 className="text-sm font-semibold leading-none">
                            Group name
                          </h2>
                          <div className="text-xs leading-none text-gray-300">
                            Members
                          </div>
                        </div>
                      </div>
                    </motion.li>
                  </motion.ul>
                  <div className="flex flex-col flex-grow overflow-auto">
                    <motion.ul variants={navItem} className="overflow-hidden">
                      <motion.li
                        variants={listVariant}
                        animate={{ x: [1000, 0] }}
                        exit={{ x: [0, 1000] }}
                        onClick={(event) => {
                          event.stopPropagation();
                        }}
                      >
                        <div className="flex gap-2 flex-col items-center justify-center mt-2">
                          {showAddMember && (
                            <button
                              onClick={(event) => {
                                event.stopPropagation();
                                addMemberComponent();
                              }}
                              className="w-12 flex justify-center items-center bg-red-400 shadow-md rounded-md hover:bg-red-500"
                            >
                              <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M4 19H2C2 15.6863 4.68629 13 8 13C11.3137 13 14 15.6863 14 19H12C12 16.7909 10.2091 15 8 15C5.79086 15 4 16.7909 4 19ZM20.294 15.706L18 13.413L15.707 15.706L14.293 14.292L16.585 12L14.293 9.707L15.707 8.293L18 10.586L20.293 8.293L21.707 9.707L19.414 12L21.707 14.293L20.294 15.706ZM8 12C5.79086 12 4 10.2091 4 8C4 5.79086 5.79086 4 8 4C10.2091 4 12 5.79086 12 8C11.9972 10.208 10.208 11.9972 8 12ZM8 6C6.9074 6.00111 6.01789 6.87885 6.00223 7.97134C5.98658 9.06383 6.85057 9.9667 7.94269 9.99912C9.03481 10.0315 9.95083 9.1815 10 8.09V8.49V8C10 6.89543 9.10457 6 8 6Z"
                                  fill="#2E3A59"
                                ></path>
                              </svg>
                            </button>
                          )}
                          {!showAddMember && (
                            <button
                              onClick={(event) => {
                                event.stopPropagation();
                                addMemberComponent();
                              }}
                              className="w-12 flex justify-center items-center bg-blue-400 shadow-md rounded-md hover:bg-blue-500"
                              disabled={showAddMember}
                            >
                              <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M4 19H2C2 15.6863 4.68629 13 8 13C11.3137 13 14 15.6863 14 19H12C12 16.7909 10.2091 15 8 15C5.79086 15 4 16.7909 4 19ZM19 16H17V13H14V11H17V8H19V11H22V13H19V16ZM8 12C5.79086 12 4 10.2091 4 8C4 5.79086 5.79086 4 8 4C10.2091 4 12 5.79086 12 8C11.9972 10.208 10.208 11.9972 8 12ZM8 6C6.9074 6.00111 6.01789 6.87885 6.00223 7.97134C5.98658 9.06383 6.85057 9.9667 7.94269 9.99912C9.03481 10.0315 9.95083 9.1815 10 8.09V8.49V8C10 6.89543 9.10457 6 8 6Z"
                                  fill="#2E3A59"
                                ></path>
                              </svg>
                            </button>
                          )}
                          {showAddMember && (
                            <form
                              onSubmit={addMemberSubmit}
                              className="flex gap-4"
                            >
                              <input
                                onChange={addMemberChange}
                                onClick={(event) => {
                                  event.stopPropagation();
                                }}
                                value={findUserId.memberId}
                                className="rounded-md shadow-md px-1 text-black"
                                name="memberId"
                                placeholder="Username"
                              />
                              <button
                                type="submit"
                                onClick={(event) => {
                                  event.stopPropagation();
                                }}
                                className="w-12 rounded-md shadow-md bg-blue-400"
                              >
                                Add
                              </button>
                            </form>
                          )}
                        </div>
                      </motion.li>
                      {group &&
                        group.members.map((member: Partial<IUser>) => {
                          return (
                            <motion.li
                              variants={listVariant}
                              animate={{ x: [1000, 0] }}
                              exit={{ x: [0, 1000] }}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              key={member._id!.toString()}
                              onClick={(event) => {
                                event.stopPropagation();
                              }}
                            >
                              <div className="flex p-4 border-b border-gray-300">
                                <div className="h-24 w-24 rounded flex-shrink-0">
                                  {member.imgsrc && (
                                    <div>
                                      <Image
                                        quality={100}
                                        priority={true}
                                        src={member.imgsrc}
                                        alt={member.username}
                                        placeholder="blur"
                                        blurDataURL={member.imgsrc}
                                        width={96}
                                        height={96}
                                        className="rounded-lg shadow-sm"
                                      />
                                    </div>
                                  )}
                                  {!member.imgsrc && (
                                    <div className="animate-pulse w-10 h-10 md:w-20 md:h-20 flex-shrink-0 bg-slate-500 rounded-lg"></div>
                                  )}
                                </div>
                                <div className="ml-2">
                                  <div className="-mt-1">
                                    <span className="text-sm font-semibold">
                                      {member.username}
                                    </span>
                                  </div>
                                  <p className="text-sm text-gray-300">
                                    {member.about}
                                  </p>
                                </div>
                              </div>
                            </motion.li>
                          );
                        })}
                    </motion.ul>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
