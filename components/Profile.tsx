import { IGroup, IUser } from "../interfaces/models";
import Image from "next/image";
import { FormEvent, useEffect, useState } from "react";

export default function Profile(props: {
  user: IUser | undefined;
  groups: IGroup[] | undefined;
}) {
  const { user, groups } = props;
  const [userForm, setUserForm] = useState({
    username: user?.username,
    about: user?.about,
  });
  const [editProfile, setEditProfile] = useState(false);

  function editModal() {
    if (!editProfile) {
      setEditProfile(true);
      return;
    }
    setEditProfile(false);
  }

  function userFormChange(event: FormEvent<HTMLInputElement>) {
    const value = event.currentTarget.value;
    setUserForm({
      ...userForm,
      [event.currentTarget.name]: value,
    });
  }

  async function userFormSubmit(event: FormEvent) {
    event.preventDefault();

    console.log(userForm);
    editModal();
  }

  useEffect(() => {
    if (user && user.username && user.about) {
      setUserForm({
        username: user.username,
        about: user.about,
      });
    }
  }, [user, editProfile]);

  return (
    <div className="w-full flex flex-wrap md:flex-nowrap overflow-hidden">
      {!editProfile && (
        <div className="w-96 h-fit flex flex-col justify-center items-center m-16 overflow-hidden border border-gray-900 shadow-md rounded-lg">
          <div className="p-4 sm:flex sm:w-full sm:justify-around">
            <div>
              <h5 className="text-xl font-bold text-gray-900">
                {user?.username}
              </h5>
            </div>

            <div className="flex-shrink-0 hidden ml-3 sm:block">
              <div className="w-16 h-16 rounded-lg shadow-sm bg-slate-600" />
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
              className="py-2 px-4 bg-red-600 hover:bg-red-700 focus:ring-red-500 focus:ring-offset-red-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg "
            >
              DELETE ACCOUNT
            </button>
          </div>
        </div>
      )}
      {editProfile && (
        <form
          onSubmit={userFormSubmit}
          className="w-96 h-fit flex flex-col justify-center items-center m-16 border border-gray-900 shadow-md rounded-lg"
        >
          <div className="p-4 sm:flex sm:w-full sm:justify-around">
            <div>
              <h5 className="w-full text-xl font-bold text-gray-900">
                <input
                  onChange={userFormChange}
                  type="string"
                  name="username"
                  value={userForm.username}
                  placeholder="Username"
                />
              </h5>
            </div>

            <div className="flex-shrink-0 hidden ml-3 sm:block">
              <div className="w-16 h-16 rounded-lg shadow-sm bg-slate-600" />
            </div>
          </div>

          <div className="p-4">
            <input
              onChange={userFormChange}
              type="string"
              name="about"
              value={userForm.about}
              placeholder="Write something about yourself"
            />
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
      )}

      <div className="h-fit relative flex flex-col p-8 m-16 overflow-hidden border border-gray-900 shadow-md rounded-lg">
        <p className="text-center text-3xl font-bold text-gray-800 dark:text-white">
          {user?.username}
        </p>
        <p className="text-center mb-12 text-xl font-normal text-gray-500 dark:text-gray-300">
          are part of
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {groups &&
            groups.map((group) => {
              return (
                <div key={group._id.toString()}>
                  <div className="p-4">
                    <div className="flex-col  flex justify-center items-center">
                      <div className="flex-shrink-0">
                        <div className="block relative">
                          <div className="w-16 h-16 bg-slate-600 rounded-lg shadow-md">
                            <Image
                              src={"/vercel.svg"}
                              alt={"vercel"}
                              width={64}
                              height={64}
                            />
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
    </div>
  );
}
