import Image from "next/image";
import { useRouter } from "next/router";
import { useState, FormEvent } from "react";
import { IGroup, IUser } from "../interfaces/models";
import useUser from "../lib/useUser";
import { AnimatePresence, motion } from "framer-motion";

export default function SearchFunction() {
  const { user, mutateUser } = useUser();
  const router = useRouter();
  const [searchForm, setSearchForm] = useState({
    name: "",
    category: "User",
  });
  const [searchResult, setSearchResult] = useState<IUser[] | IGroup[]>([]);
  const [errors, setErrors] = useState({
    error: "",
  });

  function searchFormChange(
    event: FormEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const value = event.currentTarget.value;
    setSearchForm({
      ...searchForm,
      [event.currentTarget.name]: value,
    });
  }

  async function searchFormSubmit(event: FormEvent) {
    event.preventDefault();

    if (searchForm.name.trim().length === 0 || !searchForm.category) {
      setSearchResult([]);
      return;
    }

    if (searchForm.category === "User") {
      const endpoint = `/api/v2/users?name=${searchForm.name}`;
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await fetch(endpoint, options);
      if (response.status === 200) {
        const result = await response.json();
        setSearchResult(result);
      }
      if (response.status !== 200) {
        const result = await response.json();
        setErrors({
          error: result.error,
        });
      }
      return;
    }

    if (searchForm.category === "Group") {
      const endpoint = `/api/v2/groups?name=${searchForm.name}`;
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await fetch(endpoint, options);
      if (response.status === 200) {
        const result = await response.json();
        setSearchResult(result);
      }
      if (response.status !== 200) {
        const result = await response.json();
        setErrors({
          error: result.error,
        });
      }
      return;
    }
  }

  async function openInstance(event: FormEvent) {
    event.preventDefault();

    const JSONdata = JSON.stringify({
      userId: user!._id,
      targetMemberUsername: (event.currentTarget.firstChild as HTMLInputElement)
        .value,
    });
    const endpoint = "/api/v2/room-instances";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSONdata,
    };
    const response = await fetch(endpoint, options);
    if (response.status === 200 || response.status === 302) {
      const result = await response.json();
      router.push(`/app/instance/${result}`);
      return;
    }
    const result = await response.json();
    setErrors({
      error: result.error,
    });
    return;
  }

  return (
    <div className="w-full flex flex-col gap-10 pt-20 items-center bg-slate-300">
      <div>
        <form onSubmit={searchFormSubmit} className="">
          <label
            htmlFor="name"
            className="flex justify-center text-sm font-medium text-gray-700"
          >
            Find groups or users!
          </label>
          <div className="mt-1 flex rounded-md shadow-sm">
            <div className="flex items-center pointer-events-none bg-white rounded-l-lg">
              <button type="submit" className="text-gray-500 sm:text-sm">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18.677 19.607L12.962 13.891C10.4196 15.6985 6.91642 15.2564 4.90285 12.8739C2.88929 10.4915 3.03714 6.96361 5.24298 4.75802C7.44824 2.55147 10.9765 2.40298 13.3594 4.41644C15.7422 6.42989 16.1846 9.93347 14.377 12.476L20.092 18.192L18.678 19.606L18.677 19.607ZM9.48498 5.00001C7.58868 4.99958 5.95267 6.3307 5.56745 8.18745C5.18224 10.0442 6.15369 11.9163 7.89366 12.6703C9.63362 13.4242 11.6639 12.8529 12.7552 11.3021C13.8466 9.75129 13.699 7.64734 12.402 6.26402L13.007 6.86402L12.325 6.18402L12.313 6.17202C11.5648 5.4192 10.5464 4.99715 9.48498 5.00001Z"
                    fill="#2E3A59"
                  ></path>
                </svg>
              </button>
            </div>
            <input
              type="text"
              onChange={searchFormChange}
              name="name"
              id="name"
              className="focus:ring-indigo-500 py-2 px-4 focus:border-indigo-500 block w-full sm:text-sm"
              placeholder="Find them here!"
            />
            <div className="bg-white flex items-center rounded-r-lg">
              <label htmlFor="category" className="sr-only">
                Search Category
              </label>
              <select
                onChange={searchFormChange}
                id="category"
                name="category"
                className="focus:ring-indigo-500 py-2 px-4 border-t border-r border-gray-300 border-b bo focus:border-indigo-500 h-full pl-2 pr-7 border-transparent bg-transparent text-gray-500 sm:text-sm rounded-r-md"
              >
                <option>User</option>
                <option>Group</option>
              </select>
            </div>
          </div>
        </form>
      </div>
      <div>
        <section className="w-full md:w-full flex-grow flex flex-col items-center px-8 gap-8 mx-auto bg-slate-300">
          <h2 className="text-xl font-medium text-gray-800 capitalize md:text-2xl">
            Search Result
          </h2>
          <AnimatePresence>
            <motion.ul className="w-1/2 md:w-full flex flex-wrap md:gap-10">
              {searchResult &&
                searchResult.map((result: IUser | IGroup, delay = 0.5) => {
                  delay = delay / 25;
                  if ((result as IUser).username) {
                    return (
                      <motion.li
                        initial={{ opacity: 0 }}
                        animate={{ x: [1000, 0], opacity: 1 }}
                        transition={{
                          delay: delay,
                        }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-96 h-96"
                        key={result._id.toString()}
                      >
                        <div className="flex items-center justify-center">
                          <div className="w-full max-w-xs text-center">
                            <Image
                              className="mx-auto rounded-lg"
                              quality={100}
                              priority={true}
                              placeholder="blur"
                              blurDataURL={result.imgsrc}
                              src={result.imgsrc}
                              alt={(result as IUser).username}
                              width={192}
                              height={192}
                              layout="responsive"
                            />

                            <div className="mt-2">
                              <h3 className="text-lg font-medium text-gray-700">
                                {(result as IUser).username}
                              </h3>
                              <span className="mt-1 font-medium text-gray-600">
                                {result.about}
                              </span>
                            </div>
                            {user &&
                              user.username !== (result as IUser).username && (
                                <form onSubmit={openInstance}>
                                  <input
                                    hidden
                                    readOnly
                                    value={(result as IUser).username}
                                  />
                                  <button
                                    type="submit"
                                    className="py-1 px-4 rounded-lg shadow-md bg-blue-500 hover:bg-blue-600 text-white"
                                  >
                                    Open Chat Instance
                                  </button>
                                </form>
                              )}
                          </div>
                        </div>
                      </motion.li>
                    );
                  }
                  return (
                    <motion.li
                      initial={{ opacity: 0 }}
                      animate={{ x: [1000, 0], opacity: 1 }}
                      transition={{
                        delay: delay,
                      }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-96 h-96"
                      key={result._id.toString()}
                    >
                      <div className="flex items-center justify-center">
                        <div className="w-full max-w-xs text-center">
                          <Image
                            className="mx-auto rounded-lg"
                            quality={100}
                            priority={true}
                            placeholder="blur"
                            blurDataURL={result.imgsrc}
                            src={result.imgsrc}
                            alt={(result as IGroup).name}
                            width={192}
                            height={192}
                            layout="responsive"
                          />

                          <div className="mt-2">
                            <h3 className="text-lg font-medium text-gray-700">
                              {(result as IGroup).name}
                            </h3>
                            <span className="mt-1 font-medium text-gray-600">
                              {result.about}
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.li>
                  );
                })}
            </motion.ul>
          </AnimatePresence>
        </section>
      </div>
    </div>
  );
}
