import { IGroup, IUser } from "../interfaces/models";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormEvent, SyntheticEvent, useEffect, useState, useRef } from "react";
import ErrorAlert from "./ErrorAlert";
import ProcessingForm from "./ProcessingForm";
import { KeyedMutator } from "swr";
import DeleteModal from "./DeleteModal";
import UploadImage from "./UploadImage";
import Image from "next/image";

export default function Profile(props: {
  user: IUser | undefined;
  mutateUser: KeyedMutator<IUser>;
}) {
  const { user, mutateUser } = props;
  const router = useRouter();
  const uploadImageRef = useRef<HTMLDivElement>(null);
  const inputImageRef = useRef<HTMLInputElement>(null);
  const [userForm, setUserForm] = useState({
    username: user?.username,
    about: user?.about,
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState({
    error: "",
  });
  const [stagedImage, setStagedImage] = useState<File>();
  const [editProfile, setEditProfile] = useState(false);
  const [deleteAccount, setDeleteAccount] = useState(false);
  const [uploadImageModal, setUploadImageModal] = useState(false);

  function editModal() {
    if (!editProfile) {
      setEditProfile(true);
      return;
    }
    setEditProfile(false);
  }

  function deleteModal() {
    if (!deleteAccount) {
      setUserForm({
        ...userForm,
        username: "",
      });
      setDeleteAccount(true);
      return;
    }
    setDeleteAccount(false);
    setUserForm({
      ...userForm,
      username: user?.username,
    });
  }

  function showUploadImageModal() {
    if (uploadImageModal) {
      setUploadImageModal(false);
      return;
    }
    setUploadImageModal(true);
  }

  function userFormChange(
    event: FormEvent<HTMLTextAreaElement | HTMLInputElement>
  ) {
    const value = event.currentTarget.value;
    setUserForm({
      ...userForm,
      [event.currentTarget.name]: value,
    });
  }

  function stagedImageChange(event: FormEvent<HTMLInputElement>) {
    const files = event.currentTarget.files;

    if (files && files.length > 0) {
      setStagedImage(files[0]);
      return;
    }
    return;
  }

  async function userFormSubmit(event: FormEvent) {
    event.preventDefault();
    setIsProcessing(true);

    if (!userForm.about) {
      setIsProcessing(false);
      setErrors({
        error: "Your bio cannot be empty",
      });
      return;
    }

    const JSONdata = JSON.stringify(userForm);
    const endpoint = "/api/v2/users/" + user!._id.toString();
    const options = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSONdata,
    };
    const response = await fetch(endpoint, options);
    setIsProcessing(false);
    if (response.status === 200) {
      mutateUser();
      editModal();
      return;
    } else {
      const result = await response.json();
      setErrors({
        ...errors,
        error: result.error,
      });
    }
  }

  async function deleteAccountSubmit(event: SyntheticEvent<HTMLButtonElement>) {
    event.preventDefault();

    const JSONdata = JSON.stringify(userForm);
    const endpoint = "/api/v2/users/" + user!._id.toString();
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSONdata,
    };
    const response = await fetch(endpoint, options);
    if (response.status === 200) {
      mutateUser();
      router.push("/");
    } else {
      const result = await response.json();
      setErrors({
        ...errors,
        error: result.error,
      });
      deleteModal();
      setTimeout(() => {
        setErrors({
          error: "",
        });
      }, 5000);
    }
  }

  async function stagedImageUpload(event: FormEvent) {
    event.preventDefault();
    if (!stagedImage) {
      return;
    }
    const body = new FormData();
    body.append("picture", stagedImage);
    const endpoint = "/api/v2/users/uploadImage";
    const options = {
      method: "POST",
      body,
    };
    const response = await fetch(endpoint, options);
    if (response.status === 200) {
      setStagedImage(undefined);
      showUploadImageModal();
      mutateUser();
      return;
    }
    const result = await response.json();
    console.error(result.error);
  }

  useEffect(() => {
    if (user && user.username && user.about) {
      setUserForm({
        username: user.username,
        about: user.about,
      });
      setErrors({
        error: "",
      });
    }
  }, [user, editProfile]);

  return (
    <div className="w-full flex flex-col overflow-hidden">
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
          {user && (
            <>
              <h1 className="text-sm font-bold leading-none text-white">
                {user.username}&apos;s Profile
              </h1>
            </>
          )}
        </div>
      </div>
      <div className="w-full flex flex-wrap md:flex-nowrap overflow-hidden">
        {deleteAccount && (
          <DeleteModal
            userFormChange={userFormChange}
            deleteModal={deleteModal}
            deleteAccountSubmit={deleteAccountSubmit}
          />
        )}
        {errors && errors.error && (
          <div className="m-4">
            <ErrorAlert errors={errors} />
          </div>
        )}
        {!editProfile && (
          <div className="w-96 h-fit flex flex-col justify-center items-center my-16 mx-4 overflow-hidden border border-gray-900 shadow-md rounded-lg">
            <div className="p-4 flex w-full justify-around gap-2">
              <div>
                <h5 className="text-xl font-bold text-gray-900">
                  {user?.username}
                </h5>
              </div>

              <div className="flex-shrink-0 flex">
                <div className="w-24 h-24 rounded-lg shadow-sm">
                  {user && user.imgsrc && (
                    <div className="w-24 h-24 rounded-lg shadow-sm">
                      <Image
                        quality={100}
                        priority={true}
                        src={user.imgsrc}
                        alt={user.username}
                        placeholder="blur"
                        blurDataURL={user.imgsrc}
                        width={96}
                        height={96}
                        layout="intrinsic"
                        className="rounded-lg shadow-sm"
                      />
                    </div>
                  )}
                  {(!user || !user.imgsrc) && (
                    <div className="animate-pulse w-24 h-24 rounded-lg shadow-sm bg-slate-600" />
                  )}
                </div>
              </div>
            </div>

            <div className="p-4">
              <p className="text-sm text-gray-700">{user?.about}</p>
            </div>
            <div className="flex px-4 pb-4 gap-2">
              <button
                type="button"
                onClick={editModal}
                className="py-2 px-4 bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500 focus:ring-offset-yellow-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg "
              >
                Edit
              </button>
              <button
                type="button"
                onClick={deleteModal}
                className="py-2 px-4 bg-red-600 hover:bg-red-700 focus:ring-red-500 focus:ring-offset-red-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg "
              >
                DELETE ACCOUNT
              </button>
            </div>
          </div>
        )}
        {editProfile && (
          <>
            <form
              onSubmit={userFormSubmit}
              className="w-96 h-fit flex flex-col justify-center items-center m-16 border border-gray-900 shadow-md rounded-lg"
            >
              <div className="p-4 flex w-full justify-around">
                <div>
                  <h5 className="w-full text-xl font-bold text-gray-900">
                    {user?.username}
                  </h5>
                </div>

                <div className="flex-shrink-0 flex flex-col items-end ml-3 gap-2">
                  {user && user.imgsrc && (
                    <div
                      onClick={() => {
                        showUploadImageModal();
                        setTimeout(() => {
                          uploadImageRef.current!.className =
                            "transition ease-in-out w-full h-full absolute top-full left-0 -translate-y-full bg-slate-500 bg-opacity-50 z-10";
                        });
                      }}
                      className="w-24 h-24 rounded-lg shadow-md hover:opacity-50"
                    >
                      <Image
                        quality={100}
                        priority={true}
                        src={user.imgsrc}
                        alt={user.username}
                        placeholder="blur"
                        blurDataURL={user.imgsrc}
                        width={96}
                        height={96}
                        layout="intrinsic"
                        className="rounded-lg shadow-md"
                      />
                    </div>
                  )}
                  {(!user || !user.imgsrc) && (
                    <div
                      onClick={() => {
                        showUploadImageModal();
                        setTimeout(() => {
                          uploadImageRef.current!.className =
                            "transition ease-in-out w-full h-full absolute top-full left-0 -translate-y-full bg-slate-500 bg-opacity-50 z-10";
                        });
                      }}
                      className="animate-pulse w-16 h-16 rounded-lg shadow-sm bg-slate-600"
                    />
                  )}
                </div>
              </div>

              <div className="p-4">
                <textarea
                  onChange={userFormChange}
                  name="about"
                  value={userForm.about}
                  placeholder="Write something about yourself"
                  className="rounded-md h-20 shadow-md resize-none pl-1"
                />
                {isProcessing && <ProcessingForm />}
                {errors && errors.error && <ErrorAlert errors={errors} />}
              </div>

              <div className="flex px-4 pb-4 gap-2">
                <button
                  type="button"
                  onClick={editModal}
                  className="py-2 px-4 bg-red-600 hover:bg-red-700 focus:ring-red-500 focus:ring-offset-red-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg "
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="py-2 px-4 bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg "
                >
                  Save
                </button>
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
                />
              </div>
            )}
          </>
        )}

        {user && user.groups && user.groups.length !== 0 && (
          <div className="h-fit relative flex flex-col items-center justify-center p-8 m-16 overflow-hidden border border-gray-900 shadow-md rounded-lg">
            <p className="text-center text-3xl font-bold text-gray-800">
              {user?.username}
            </p>
            <p className="text-center mb-12 text-xl font-normal text-gray-500">
              is part of
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {user.groups.map((group) => {
                return (
                  <div key={group._id.toString()}>
                    <div className="p-4">
                      <div className="flex-col  flex justify-center items-center">
                        <div className="flex-shrink-0">
                          <div className="block relative">
                            <div
                              onClick={() => {
                                router.push(
                                  "/app/group/" + group._id.toString()
                                );
                              }}
                              className="w-24 h-24 rounded-lg shadow-md hover:opacity-50"
                            >
                              {group.imgsrc && (
                                <Image
                                  quality={100}
                                  priority={true}
                                  src={group.imgsrc}
                                  alt={group.name}
                                  placeholder="blur"
                                  blurDataURL={group.imgsrc}
                                  width={96}
                                  height={96}
                                  layout="intrinsic"
                                  className="rounded-lg shadow-md"
                                />
                              )}
                              {!group.imgsrc && (
                                <div className="w-20 h-20 bg-slate-600 rounded-lg shadow-md"></div>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="mt-2 text-center flex flex-col">
                          <span className="text-black text-lg font-medium">
                            {group.name}
                          </span>
                          <span className="text-gray-700 text-xs">
                            {group.about}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
