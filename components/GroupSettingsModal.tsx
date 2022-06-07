import { useState, useRef, FormEvent } from "react";
import { GroupSettingsModalProps } from "../interfaces/Components";
import Image from "next/image";
import UploadImage from "./UploadImage";

export default function GroupSettingModal(props: GroupSettingsModalProps) {
  const {
    group,
    showGroupSettingsModal,
    groupForm,
    mutateGroup,
    groupFormChange,
    groupFormSubmit,
  } = props;

  const uploadImageRef = useRef<HTMLDivElement>(null);
  const inputImageRef = useRef<HTMLInputElement>(null);
  const [stagedImage, setStagedImage] = useState<File>();
  const [uploadImageModal, setUploadImageModal] = useState(false);

  function showUploadImageModal() {
    if (uploadImageModal) {
      setUploadImageModal(false);
      return;
    }
    setUploadImageModal(true);
  }

  function stagedImageChange(event: FormEvent<HTMLInputElement>) {
    const files = event.currentTarget.files;

    if (files && files.length > 0) {
      setStagedImage(files[0]);
      return;
    }
    return;
  }
  // THIS IS TO EDIT GROUP IMAGE
  async function stagedImageUpload(event: FormEvent) {
    event.preventDefault();
    if (!stagedImage) {
      return;
    }
    const body = new FormData();
    body.append("picture", stagedImage);
    const endpoint =
      "/api/v2/groups/uploadImage?groupId=" + group._id!.toString();
    const options = {
      method: "POST",
      body,
    };
    const response = await fetch(endpoint, options);
    if (response.status === 200) {
      setStagedImage(undefined);
      showUploadImageModal();
      mutateGroup();
      return;
    }
    const result = await response.json();
    console.error(result.error);
  }

  return (
    <section className="w-full h-full flex justify-center items-center bg-slate-500 bg-opacity-50 z-10">
      <form
        onSubmit={groupFormSubmit}
        className="container max-w-2xl mx-auto shadow-md md:w-3/4"
      >
        <div className="p-4 bg-slate-800 border-t-2 border-indigo-400 rounded-lg">
          <div className="max-w-sm mx-auto md:w-full md:mx-0">
            <div className="inline-flex items-center space-x-4">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  showUploadImageModal();
                  setTimeout(() => {
                    uploadImageRef.current!.className =
                      "transition ease-in-out w-full h-full absolute top-full left-0 -translate-y-full bg-slate-500 bg-opacity-50 z-10";
                  });
                }}
                className="block relative"
              >
                <div className="w-24 h-24 rounded-lg">
                  {group && group.imgsrc && (
                    <Image
                      quality={100}
                      priority={true}
                      src={group.imgsrc}
                      width={96}
                      height={96}
                      layout="responsive"
                      className="rounded-lg shadow-md"
                      alt={group.imgsrc}
                    />
                  )}
                  {(!group || !group.imgsrc) && (
                    <div className="animate-pulse w-20 h-20 rounded-lg bg-slate-500"></div>
                  )}
                </div>
              </button>
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
          <hr />
          <div className="w-full flex gap-4 px-4 pb-4 ml-auto text-gray-500 md:w-1/3">
            <button
              onClick={showGroupSettingsModal}
              className="py-2 px-4  bg-red-600 hover:bg-red-700 focus:ring-red-500 focus:ring-offset-red-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
            >
              Cancel
            </button>
            <button
              type="submit"
              className="py-2 px-4  bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
            >
              Save
            </button>
          </div>
        </div>
      </form>
      {uploadImageModal && (
        <div
          ref={uploadImageRef}
          className="transition ease-in-out w-full h-full absolute top-full left-0 bg-slate-500 bg-opacity-50 z-10"
        >
          <UploadImage
            stagedImage={stagedImage}
            stagedImageChange={stagedImageChange}
            stagedImageUpload={stagedImageUpload}
            inputImageRef={inputImageRef}
            showUploadImageModal={showUploadImageModal}
          />
        </div>
      )}
    </section>
  );
}
