import { DeleteModalProps } from "../interfaces/Components";

export default function DeleteModal(props: DeleteModalProps) {
  const { userFormChange, deleteModal, deleteAccountSubmit } = props;
  return (
    <div className="fixed top-0 left-0 w-screen h-screen z-50 bg-slate-300 bg-opacity-75 origin-center flex justify-center items-center appear-done enter-done">
      <div className="bg-slate-800 text-white w-11/12 max-w-md text-center pt-10 rounded-lg shadow-lg appear-done enter-done">
        <div className="flex flex-col items-center gap-4 px-4 mb-4">
          <h2 className="text-3xl font-medium">Wait!</h2>
          <p className="mt-2 w-10/12 max-w-full mx-auto text-gray-300 text-base">
            Are you sure you want to delete your account? This process is not
            reversible
          </p>
          <input
            type="string"
            name="username"
            onChange={userFormChange}
            placeholder="Type your username to confirm"
            className="w-full rounded-md p-1 text-black"
          />
        </div>
        <div className="flex mt-10 justify-center py-4 px-4 border-t border-gray-300 false">
          <button
            onClick={deleteModal}
            className="mx-4 inline-block rounded-lg font-medium border border-solid cursor-pointer text-center text-base py-3 px-6 text-blue-400 bg-transparent border-blue-400 hover:bg-blue-400 hover:text-white"
          >
            Cancel
          </button>
          <button
            onClick={deleteAccountSubmit}
            className="mx-4 false inline-block rounded-lg font-medium border border-solid cursor-pointer text-center text-base py-3 px-6 text-white bg-red-500 border-red-500 hover:bg-red-600 hover:border-red-600"
          >
            Delete my account
          </button>
        </div>
      </div>
    </div>
  );
}
