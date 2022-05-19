import { FormEvent } from "react";
import { ChatModalProps } from "../interfaces/Components";
import { IGroup } from "../interfaces/models";

export default function CreateGroupModal(props: ChatModalProps) {
  const { chatModal, groupFormChange, groupFormSubmit } = props;
  return (
    <section className="h-screen flex items-center bg-gray-100 bg-opacity-50">
      <form
        onSubmit={groupFormSubmit}
        className="container max-w-2xl mx-auto shadow-md md:w-3/4"
      >
        <div className="p-4 bg-slate-800 border-t-2 border-indigo-400 rounded-lg text-white">
          <div className="max-w-sm mx-auto md:w-full md:mx-0">
            <div className="flex w-full items-center space-x-4">
              <div className="block relative">
                <div>Group Creation Form</div>
              </div>
              <h1 className="text-gray-300">Create your chat group</h1>
            </div>
          </div>
        </div>
        <div className="space-y-6 bg-slate-300">
          <div className="items-center w-full p-4 space-y-4 text-gray-500 md:inline-flex md:space-y-0">
            <h2 className="max-w-sm mx-auto md:w-1/3 text-black">Group Name</h2>
            <div className="max-w-sm mx-auto md:w-2/3">
              <div className=" relative ">
                <input
                  type="text"
                  onChange={groupFormChange}
                  name="name"
                  className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  placeholder="Group Name"
                />
              </div>
            </div>
          </div>
          <hr />
          <div className="items-center w-full p-4 space-y-4 text-gray-500 md:inline-flex md:space-y-0">
            <h2 className="max-w-sm mx-auto md:w-1/3 text-black">About</h2>
            <div className="max-w-sm mx-auto space-y-5 md:w-2/3">
              <div>
                <div className=" relative ">
                  <input
                    type="text"
                    name="about"
                    onChange={groupFormChange}
                    className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    placeholder="About your group"
                  />
                </div>
              </div>
              <div></div>
            </div>
          </div>
          <div className="w-full flex gap-4 px-4 py-4 ml-auto bg-slate-700">
            <button
              onClick={chatModal}
              className="py-2 px-4  bg-red-600 hover:bg-red-700 focus:ring-red-500 focus:ring-offset-red-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
            >
              Cancel
            </button>
            <button
              type="submit"
              className="py-2 px-4  bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
            >
              Create!
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}
