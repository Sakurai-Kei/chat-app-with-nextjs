import { useRouter } from "next/router";
import useUser from "../lib/useUser";

export default function Pricing() {
  const router = useRouter();
  const { user } = useUser();

  return (
    <div className="bg-gray-900">
      <div className="container px-6 py-8 mx-auto">
        <div className="xl:items-center xl:-mx-4 xl:flex">
          <div className="flex flex-col items-center xl:items-start xl:mx-8">
            <h1 className="text-3xl font-medium text-white capitalize lg:text-4xl">
              Our Pricing Plan
            </h1>

            <div className="mt-4">
              <span className="inline-block w-40 h-1 bg-indigo-500 rounded-full"></span>
              <span className="inline-block w-3 h-1 mx-1 bg-indigo-500 rounded-full"></span>
              <span className="inline-block w-1 h-1 bg-indigo-500 rounded-full"></span>
            </div>

            <p className="mt-4 font-medium text-white">
              You can get All Access by selecting your plan!
            </p>

            <p className="mt-4 font-light text-white">
              Disclaimer: This is a prototype web app and I do not charge
              anything.
            </p>
          </div>

          <div className="flex-1 xl:mx-8">
            <div className="mt-8 space-y-8 md:-mx-4 md:flex md:items-center md:justify-center md:space-y-0 xl:mt-0">
              <div className="max-w-sm mx-auto border rounded-lg md:mx-4">
                <div className="p-6">
                  <h1 className="text-xl font-medium text-white capitalize lg:text-3xl">
                    Essential
                  </h1>

                  <p className="mt-4 text-gray-300">
                    This plan covers all basic function expected of a chat app.
                    It is free to use
                  </p>

                  <h2 className="mt-4 text-2xl font-medium text-gray-300 sm:text-4xl">
                    $0 <span className="text-base font-medium">/Month</span>
                  </h2>

                  <p className="mt-1 text-gray-300">Yearly payment</p>

                  <button
                    onClick={() => {
                      if (user) {
                        router.push("/app");
                      } else {
                        router.push("/register");
                      }
                    }}
                    className="w-full px-4 py-2 mt-6 tracking-wide text-white capitalize transition-colors duration-200 transform bg-indigo-500 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600 focus:ring focus:ring-indigo-300 focus:ring-opacity-80"
                  >
                    Start Now
                  </button>
                </div>

                <hr className="border-gray-200" />

                <div className="p-6">
                  <h1 className="text-lg font-medium text-white capitalize lg:text-xl">
                    What&apos;s included:
                  </h1>

                  <div className="mt-8 space-y-4">
                    <div className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5 text-blue-500"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>

                      <span className="mx-4 text-gray-300">
                        Create private chat instances
                      </span>
                    </div>

                    <div className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5 text-blue-500"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>

                      <span className="mx-4 text-gray-300">Create groups</span>
                    </div>

                    <div className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5 text-blue-500"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>

                      <span className="mx-4 text-gray-300">
                        Invite other users to your group
                      </span>
                    </div>

                    <div className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5 text-blue-500"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>

                      <span className="mx-4 text-gray-300">
                        Image and mp4 support for i.imgur.com domain
                      </span>
                    </div>

                    <div className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5 text-blue-500"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>

                      <span className="mx-4 text-gray-300">
                        PWA / Mobile Ready
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
