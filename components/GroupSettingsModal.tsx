import Image from "next/image";
import { GroupSettingsModalProps } from "../interfaces/Components";

export default function GroupSettingModal(props: GroupSettingsModalProps) {
  const {
    group,
    showGroupSettingsModal,
    groupForm,
    groupFormChange,
    groupFormSubmit,
  } = props;
  return (
    <section className="w-full h-full flex justify-center items-center bg-slate-500 bg-opacity-50 z-10">
      <form
        onSubmit={groupFormSubmit}
        className="container max-w-2xl mx-auto shadow-md md:w-3/4"
      >
        <div className="p-4 bg-slate-800 border-t-2 border-indigo-400 rounded-lg">
          <div className="max-w-sm mx-auto md:w-full md:mx-0">
            <div className="inline-flex items-center space-x-4">
              <a href="#" className="block relative">
                <div className="w-20 h-20 rounded-lg">
                  {group && group.imgsrc && (
                    <Image
                      src={group.imgsrc}
                      alt={group.name}
                      width={80}
                      height={80}
                      layout="responsive"
                      className="hover:opacity-50"
                    />
                  )}
                  {(!group || !group.imgsrc) && (
                    <div className="animate-pulse w-20 h-20 rounded-lg bg-slate-500"></div>
                  )}
                </div>
              </a>
              <h1 className="text-white">{group.name}</h1>
            </div>
          </div>
        </div>
        <div className="space-y-6 bg-white rounded-lg shadow-md">
          <hr />
          <div className="items-center w-full p-4 space-y-4 text-gray-500 md:inline-flex md:space-y-0">
            <h2 className="max-w-sm mx-auto md:w-1/3">Group Info</h2>
            <div className="max-w-sm mx-auto space-y-5 md:w-2/3">
              <div>
                <div className=" relative ">
                  <input
                    onChange={groupFormChange}
                    value={groupForm.name}
                    type="text"
                    name="name"
                    className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    placeholder="Group Name"
                  />
                </div>
              </div>
              <div>
                <div className=" relative ">
                  <input
                    onChange={groupFormChange}
                    value={groupForm.about}
                    type="text"
                    name="about"
                    className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    placeholder="Group Bio"
                  />
                </div>
              </div>
            </div>
          </div>
          <hr />
          <div className="items-center w-full p-8 space-y-4 text-gray-500 md:inline-flex md:space-y-0">
            <h2 className="max-w-sm mx-auto md:w-4/12">Change Group Image</h2>
            <div className="w-full max-w-sm pl-2 mx-auto space-y-5 md:w-5/12 md:pl-9 md:inline-flex">
              <div className=" relative ">
                <input
                  onChange={groupFormChange}
                  value={groupForm.imgsrc}
                  type="text"
                  name="imgsrc"
                  className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  placeholder="Image Link"
                />
              </div>
            </div>
            <div className="text-center md:w-3/12 md:pl-6">
              <button
                type="button"
                onClick={showGroupSettingsModal}
                className="py-2 px-4  bg-red-600 hover:bg-pink-700 focus:ring-pink-500 focus:ring-offset-pink-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
              >
                Cancel
              </button>
            </div>
          </div>
          <hr />
          <div className="w-full px-4 pb-4 ml-auto text-gray-500 md:w-1/3">
            <button
              type="submit"
              className="py-2 px-4  bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}
