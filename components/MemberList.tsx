import { IUser } from "../interfaces/models";

export default function MemberList(props: any) {
  const { group, mutateGroup } = props;
  return (
    <div className="border flex flex-col flex-shrink-0 w-1/4 max-w-xs border-l border-gray-300 bg-gray-100">
      <div className="flex items-center h-16 border-b border-gray-300 px-4">
        <div className="">
          <h2 className="text-sm font-semibold leading-none">Group Members</h2>
          <a className="text-xs leading-none" href="#">
            Group Name Placeholder
          </a>
        </div>
        <button className="flex items-center justify-center w-6 h-6 rounded hover:bg-gray-300 ml-auto">
          <svg
            className="w-5 h-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <div className="flex flex-col flex-grow overflow-auto">
        {group &&
          group.members.map((member: Partial<IUser>) => {
            return (
              <div
                key={member._id!.toString()}
                className="flex px-4 py-4 border-b border-gray-300"
              >
                <div className="h-10 w-10 rounded flex-shrink-0 bg-gray-300"></div>
                <div className="ml-2">
                  <div className="-mt-1">
                    <span className="text-sm font-semibold">
                      {member.username}
                    </span>
                  </div>
                  <p className="text-sm">{member.about}</p>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
