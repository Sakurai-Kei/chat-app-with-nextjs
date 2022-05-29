import { InstanceModalProps } from "../interfaces/Components";

export default function CreateInstanceModal(props: InstanceModalProps) {
  const { instanceModal, instanceFormSubmit, instanceFormChange } = props;
  return (
    <section className="h-screen flex items-center bg-gray-100 bg-opacity-50">
      <div className="max-w-3xl px-6 py-16 bg-slate-800 rounded-md shadow-md mx-auto text-center">
        <h1 className="text-3xl font-semibold text-white">
          Want to talk to someone?
        </h1>
        <p className="max-w-md mx-auto mt-5 text-gray-300">
          Find them through their{" "}
          <span className="text-indigo-500">username</span> here!
        </p>

        <form className="flex flex-col mt-8 space-y-3 sm:space-y-0 sm:flex-row sm:justify-center sm:-mx-2">
          <input
            type="text"
            onChange={instanceFormChange}
            name="targetMemberUsername"
            className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            placeholder="Username"
          />
          <button
            onClick={instanceModal}
            className="px-4 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-red-700 rounded-md sm:mx-2 hover:bg-red-600 focus:outline-none focus:bg-red-600"
          >
            Close
          </button>
          <button
            onClick={instanceFormSubmit}
            className="px-4 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-blue-700 rounded-md sm:mx-2 hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            Find
          </button>
        </form>
      </div>
    </section>
  );
}
