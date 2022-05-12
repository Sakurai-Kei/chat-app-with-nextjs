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
    <header className="shadow-sm">
      <div className="max-w-screen-xl p-4 mx-auto">
        <div className="flex items-center justify-between space-x-4 lg:space-x-10">
          <div className="flex lg:w-0 lg:flex-1">
            <span className="w-20 h-10 bg-gray-200 rounded-lg"></span>
          </div>

          <nav className="hidden space-x-8 text-sm font-medium md:flex">
            <Link href={"/"}>
              <a className="text-gray-500 hover:text-blue-500">Home</a>
            </Link>
          </nav>

          {!user && (
            <div className="items-center justify-end flex-1 hidden space-x-4 sm:flex">
              <Link href={"/log-in"}>
                <a className="px-5 py-2 text-sm font-medium text-gray-500 bg-gray-100 rounded-lg">
                  Log in
                </a>
              </Link>
              <Link href={"/register"}>
                <a className="px-5 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg">
                  Sign up
                </a>
              </Link>
            </div>
          )}
          {user && (
            <div className="items-center justify-end flex-1 hidden space-x-4 sm:flex">
              <Link href={"/app"}>
                <a className="px-5 py-2 text-sm font-medium text-gray-500 bg-gray-100 rounded-lg">
                  Enter the Chat Room
                </a>
              </Link>
              <Link href={"/api/log-out"}>
                <a className="px-5 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg">
                  Log out
                </a>
              </Link>
            </div>
          )}

          <div className="relative inline-block text-left">
            <div className="lg:hidden">
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
            {show && (
              <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5">
                <div
                  className="py-1 "
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="options-menu"
                >
                  <a
                    href="#"
                    className="block px-4 py-2 text-md text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white dark:hover:bg-gray-600"
                    role="menuitem"
                  >
                    <span className="flex flex-col">
                      <span>Home</span>
                    </span>
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-md text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white dark:hover:bg-gray-600"
                    role="menuitem"
                  >
                    <span className="flex flex-col">
                      <span>Log in</span>
                    </span>
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-md text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white dark:hover:bg-gray-600"
                    role="menuitem"
                  >
                    <span className="flex flex-col">
                      <span>Sign up</span>
                    </span>
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
