import Image from "next/image";
import Link from "next/link";
import { groups, users } from "../lib/mockData";
import useNavBar from "../lib/useNavBar";
import useUser from "../lib/useUser";

export default function NavBar() {
  const { user, mutateUser } = useUser();

  return (
    <div className="flex flex-col items-center flex-shrink-0 w-16 border-r border-gray-300 bg-gray-200 py-3">
      {/* <div className="flex flex-col gap-4">
        {user.contactList.map((contact) => {
          return (
            <div
              className="w-10 h-10 rounded-lg bg-gray-400 hover:bg-gray-500"
              key={contact._id.toString()}
            >
              <Link href={"/app/user/" + contact._id.toString()}>
                <Image
                  src={"/vercel.svg"}
                  alt={"vercel"}
                  width={40}
                  height={40}
                />
              </Link>
            </div>
          );
        })}
        {user.groups.map((group) => {
          return (
            <div
              className="w-10 h-10 rounded-lg bg-gray-400 hover:bg-gray-500"
              key={group._id.toString()}
            >
              <Link href={"/app/group/" + group._id.toString()}>
                <Image
                  src={"/vercel.svg"}
                  alt={"vercel"}
                  width={40}
                  height={40}
                />
              </Link>
            </div>
          );
        })}
      </div> */}

      {/* <a
        className="w-10 h-10 rounded-lg bg-gray-400 hover:bg-gray-500"
        href="#"
      ></a>
      <a
        className="w-10 h-10 rounded-lg bg-gray-400 mt-4 shadow-outline border-4 border-gray-200"
        href="#"
      ></a>
      <a
        className="relative w-10 h-10 rounded-lg bg-gray-400 mt-4 hover:bg-gray-500"
        href="#"
      >
        <span className="absolute w-3 h-3 rounded-full bg-blue-400 top-0 right-0 -mt-1 -mr-1"></span>
      </a>
      <a
        className="w-10 h-10 rounded-lg bg-gray-400 mt-4 hover:bg-gray-500"
        href="#"
      ></a> */}
      <a
        className="flex items-center justify-center w-10 h-10 rounded-lg bg-transparent mt-4 hover:bg-gray-400"
        href="#"
      >
        <svg
          className="w-6 h-6 fill-current"
          fill="none"
          stroke="currentColor"
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
      </a>
    </div>
  );
}
