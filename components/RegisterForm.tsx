import Link from "next/link";
import { RegisterFormProps } from "../interfaces/Components";

export default function RegisterForm(props: RegisterFormProps) {
  const { errors, handleSubmit, handleChange } = props;
  return (
    <div className="flex flex-col max-w-md m-4 px-4 py-8 bg-white rounded-lg shadow sm:px-6 md:px-8 lg:px-10">
      <div className="self-center mb-2 text-xl font-light text-gray-800 sm:text-2xl">
        Create a new account
      </div>
      <span className="justify-center text-sm text-center text-gray-500 flex-items-center">
        Already have an account?
        <Link href={"/log-in"}>
          <a className="p-1 text-sm text-blue-500 underline hover:text-blue-700">
            Sign in
          </a>
        </Link>
      </span>
      {errors.error && (
        <div className="text-red-500 mt-2 text-xl">{errors.error}</div>
      )}

      <div className="p-6 mt-8">
        <form method="post" action="/api/sign-up" onSubmit={handleSubmit}>
          <div className="flex flex-col mb-2">
            <div className=" relative ">
              <input
                type="text"
                onChange={handleChange}
                className="rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                name="username"
                placeholder="Username"
              />
            </div>
          </div>
          <div className="flex flex-col mb-2">
            <div className=" relative ">
              <input
                type="password"
                onChange={handleChange}
                className="rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                name="password"
                placeholder="Password"
              />
            </div>
          </div>
          <div className="flex flex-col mb-2">
            <div className=" relative ">
              <input
                type="password"
                onChange={handleChange}
                className="rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                name="confirmPassword"
                placeholder="Confirm Password"
              />
            </div>
          </div>
          <div className="flex flex-col mb-2">
            <div className=" relative ">
              <input
                type="email"
                onChange={handleChange}
                className="rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                name="email"
                placeholder="Email"
              />
            </div>
          </div>
          <div className="flex w-full my-4">
            <button
              type="submit"
              className="py-2 px-4  bg-blue-500 hover:bg-blue-600 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
