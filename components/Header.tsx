import Link from "next/link";
import { useState } from "react";
import useUser from "../lib/useUser";

export default function Header() {
  const { user, mutateUser } = useUser();
  const [show, setShow] = useState(false);

  function showMenu() {
    if (!show) {
      setShow(true);
    } else {
      setShow(false);
    }
  }

  return (
    <header className="shadow-sm bg-indigo-900">
      <div className="max-w-screen-xl p-4 mx-auto">
        <div className="flex items-center justify-between space-x-4 lg:space-x-10">
          <div className="flex lg:w-0 lg:flex-1">
            <svg
              className="w-20 h-10"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16 2C17.1046 2 18 2.89543 18 4L4 4L4 15.1765C2.89543 15.1765 2 14.281 2 13.1765V4C2 2.89543 2.89543 2 4 2H16Z"
                fill="yellow"
              ></path>
              <path
                d="M14 22L11.3333 19.1765H8C6.89543 19.1765 6 18.281 6 17.1765V8C6 6.89543 6.89543 6 8 6H20C21.1046 6 22 6.89543 22 8V17.1765C22 18.281 21.1046 19.1765 20 19.1765H16.6667L14 22ZM15.8046 17.1765L20 17.1765V8L8 8V17.1765H12.1954L14 19.0872L15.8046 17.1765Z"
                fill="yellow"
              ></path>
            </svg>
          </div>

          <nav className="hidden space-x-8 text-sm font-medium md:flex">
            <Link href={"/"}>
              <a className="text-white hover:text-blue-500">Home</a>
            </Link>
          </nav>

          {!user && (
            <div className="items-center justify-end flex-1 hidden space-x-4 sm:flex">
              <Link href={"/log-in"}>
                <a className="px-5 py-2 text-sm font-medium text-white bg-indigo-500 hover:bg-indigo-600 rounded-lg">
                  Log in
                </a>
              </Link>
              <Link href={"/register"}>
                <a className="px-5 py-2 text-sm font-medium text-white bg-indigo-500 hover:bg-indigo-600 rounded-lg">
                  Sign up
                </a>
              </Link>
            </div>
          )}
          {user && (
            <div className="items-center justify-end flex-1 hidden space-x-4 sm:flex">
              <Link href={"/app"}>
                <a className="px-5 py-2 text-sm font-medium text-white bg-indigo-500 hover:bg-indigo-600 rounded-lg">
                  Enter the Chat Room
                </a>
              </Link>
              <Link href={"/api/log-out"}>
                <a className="px-5 py-2 text-sm font-medium text-white bg-indigo-500 hover:bg-indigo-600 rounded-lg">
                  Log out
                </a>
              </Link>
            </div>
          )}

          <div className="relative inline-block text-left">
            <div className="sm:hidden">
              <button
                className="p-2 text-gray-600 bg-gray-100 rounded-lg"
                type="button"
                onClick={showMenu}
              >
                <span className="sr-only">Open menu</span>
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 6h16M4 12h16M4 18h16"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  />
                </svg>
              </button>
            </div>
            {show && !user && (
              <div className="sm:hidden origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                <div
                  className="py-1 "
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="options-menu"
                >
                  <Link href={"/"}>
                    <a
                      className="block px-4 py-2 text-md text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      role="menuitem"
                    >
                      <span className="flex flex-col">
                        <span>Home</span>
                      </span>
                    </a>
                  </Link>
                  <Link href={"/log-in"}>
                    <a
                      className="block px-4 py-2 text-md text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      role="menuitem"
                    >
                      <span className="flex flex-col">
                        <span>Log in</span>
                      </span>
                    </a>
                  </Link>
                  <Link href={"/register"}>
                    <a
                      className="block px-4 py-2 text-md text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      role="menuitem"
                    >
                      <span className="flex flex-col">
                        <span>Sign up</span>
                      </span>
                    </a>
                  </Link>
                </div>
              </div>
            )}
            {show && user && (
              <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                <div
                  className="py-1 "
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="options-menu"
                >
                  <Link href={"/"}>
                    <a
                      className="block px-4 py-2 text-md text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      role="menuitem"
                    >
                      <span className="flex flex-col">
                        <span>Home</span>
                      </span>
                    </a>
                  </Link>
                  <Link href={"/app"}>
                    <a
                      className="block px-4 py-2 text-md text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      role="menuitem"
                    >
                      <span className="flex flex-col">
                        <span>Enter the Chat Room</span>
                      </span>
                    </a>
                  </Link>
                  <Link href={"/api/log-out"}>
                    <a
                      className="block px-4 py-2 text-md text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      role="menuitem"
                    >
                      <span className="flex flex-col">
                        <span>Log out</span>
                      </span>
                    </a>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
