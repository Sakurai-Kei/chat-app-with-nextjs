import { FormEvent, useState } from "react";
import { IUser } from "../interfaces/models";

export default function MemberList(props: any) {
  const { group, mutateGroup } = props;
  const [showMember, setShowMember] = useState(false);
  const [showAddMember, setShowAddMember] = useState(false);
  const [findUserId, setFindUserId] = useState({
    memberId: "",
  });

  function addMemberComponent() {
    if (showAddMember) {
      setShowAddMember(false);
    } else {
      setShowAddMember(true);
    }
  }

  function addMemberChange(event: FormEvent<HTMLInputElement>) {
    const value = event.currentTarget.value;
    setFindUserId({
      ...findUserId,
      [event.currentTarget.name]: value,
    });
  }

  async function addMemberSubmit(event: FormEvent) {
    event.preventDefault();

    if (findUserId.memberId.trim().length === 0) {
      return;
    }

    const data = {
      memberId: findUserId.memberId,
      groupId: group._id.toString(),
    };
    const JSONdata = JSON.stringify(data);
    const endpoint = "/api/groups/addMember";
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSONdata,
    };
    const response = await fetch(endpoint, options);
    if (response.status === 200) {
      mutateGroup();
      setFindUserId({
        ...findUserId,
        memberId: "",
      });
      addMemberComponent();
    } else {
      const result = await response.json();
      console.error("Error has occured: " + result.error);
    }
  }

  function showMemberComponent() {
    if (showMember) {
      setShowMember(false);
    } else {
      setShowMember(true);
    }
  }

  if (!showMember) {
    return (
      <button
        onClick={showMemberComponent}
        className="w-12 flex justify-center items-center rounded-md hover:bg-slate-400"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9 3C6.23858 3 4 5.23858 4 8C4 10.7614 6.23858 13 9 13C11.7614 13 14 10.7614 14 8C14 5.23858 11.7614 3 9 3ZM6 8C6 6.34315 7.34315 5 9 5C10.6569 5 12 6.34315 12 8C12 9.65685 10.6569 11 9 11C7.34315 11 6 9.65685 6 8Z"
            fill="#2E3A59"
          ></path>
          <path
            d="M16.9084 8.21828C16.6271 8.07484 16.3158 8.00006 16 8.00006V6.00006C16.6316 6.00006 17.2542 6.14956 17.8169 6.43645C17.8789 6.46805 17.9399 6.50121 18 6.5359C18.4854 6.81614 18.9072 7.19569 19.2373 7.65055C19.6083 8.16172 19.8529 8.75347 19.9512 9.37737C20.0496 10.0013 19.9987 10.6396 19.8029 11.2401C19.6071 11.8405 19.2719 12.3861 18.8247 12.8321C18.3775 13.2782 17.8311 13.6119 17.2301 13.8062C16.6953 13.979 16.1308 14.037 15.5735 13.9772C15.5046 13.9698 15.4357 13.9606 15.367 13.9496C14.7438 13.8497 14.1531 13.6038 13.6431 13.2319L13.6421 13.2311L14.821 11.6156C15.0761 11.8017 15.3717 11.9248 15.6835 11.9747C15.9953 12.0247 16.3145 12.0001 16.615 11.903C16.9155 11.8059 17.1887 11.639 17.4123 11.416C17.6359 11.193 17.8035 10.9202 17.9014 10.62C17.9993 10.3198 18.0247 10.0006 17.9756 9.68869C17.9264 9.37675 17.8041 9.08089 17.6186 8.82531C17.4331 8.56974 17.1898 8.36172 16.9084 8.21828Z"
            fill="#2E3A59"
          ></path>
          <path
            d="M19.9981 21C19.9981 20.475 19.8947 19.9551 19.6938 19.47C19.4928 18.9849 19.1983 18.5442 18.8271 18.1729C18.4558 17.8017 18.0151 17.5072 17.53 17.3062C17.0449 17.1053 16.525 17.0019 16 17.0019V15C16.6821 15 17.3584 15.1163 18 15.3431C18.0996 15.3783 18.1983 15.4162 18.2961 15.4567C19.0241 15.7583 19.6855 16.2002 20.2426 16.7574C20.7998 17.3145 21.2417 17.9759 21.5433 18.7039C21.5838 18.8017 21.6217 18.9004 21.6569 19C21.8837 19.6416 22 20.3179 22 21H19.9981Z"
            fill="#2E3A59"
          ></path>
          <path
            d="M16 21H14C14 18.2386 11.7614 16 9 16C6.23858 16 4 18.2386 4 21H2C2 17.134 5.13401 14 9 14C12.866 14 16 17.134 16 21Z"
            fill="#2E3A59"
          ></path>
        </svg>
      </button>
    );
  } else {
    return (
      <div className="border flex flex-col flex-shrink-0 w-1/4 max-w-xs overflow-scroll border-l border-gray-300 bg-gray-100">
        <div className="flex items-center h-16 border-b border-gray-300 px-4">
          <div>
            <h2 className="text-sm font-semibold leading-none">
              Group Members
            </h2>
            <a className="text-xs leading-none" href="#">
              Group Name Placeholder
            </a>
          </div>
          <button
            onClick={showMemberComponent}
            className="flex items-center justify-center w-6 h-6 rounded hover:bg-gray-300 ml-auto"
          >
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
          <div className="flex gap-2 flex-col items-center justify-center mt-2">
            {showAddMember && (
              <button
                onClick={addMemberComponent}
                className="w-12 flex justify-center items-center bg-red-400 shadow-md rounded-md hover:bg-red-500"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 19H2C2 15.6863 4.68629 13 8 13C11.3137 13 14 15.6863 14 19H12C12 16.7909 10.2091 15 8 15C5.79086 15 4 16.7909 4 19ZM20.294 15.706L18 13.413L15.707 15.706L14.293 14.292L16.585 12L14.293 9.707L15.707 8.293L18 10.586L20.293 8.293L21.707 9.707L19.414 12L21.707 14.293L20.294 15.706ZM8 12C5.79086 12 4 10.2091 4 8C4 5.79086 5.79086 4 8 4C10.2091 4 12 5.79086 12 8C11.9972 10.208 10.208 11.9972 8 12ZM8 6C6.9074 6.00111 6.01789 6.87885 6.00223 7.97134C5.98658 9.06383 6.85057 9.9667 7.94269 9.99912C9.03481 10.0315 9.95083 9.1815 10 8.09V8.49V8C10 6.89543 9.10457 6 8 6Z"
                    fill="#2E3A59"
                  ></path>
                </svg>
              </button>
            )}
            {!showAddMember && (
              <button
                onClick={addMemberComponent}
                className="w-12 flex justify-center items-center bg-blue-400 shadow-md rounded-md hover:bg-blue-500"
                disabled={showAddMember}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 19H2C2 15.6863 4.68629 13 8 13C11.3137 13 14 15.6863 14 19H12C12 16.7909 10.2091 15 8 15C5.79086 15 4 16.7909 4 19ZM19 16H17V13H14V11H17V8H19V11H22V13H19V16ZM8 12C5.79086 12 4 10.2091 4 8C4 5.79086 5.79086 4 8 4C10.2091 4 12 5.79086 12 8C11.9972 10.208 10.208 11.9972 8 12ZM8 6C6.9074 6.00111 6.01789 6.87885 6.00223 7.97134C5.98658 9.06383 6.85057 9.9667 7.94269 9.99912C9.03481 10.0315 9.95083 9.1815 10 8.09V8.49V8C10 6.89543 9.10457 6 8 6Z"
                    fill="#2E3A59"
                  ></path>
                </svg>
              </button>
            )}
            {showAddMember && (
              <form onSubmit={addMemberSubmit} className="flex gap-4">
                <input
                  onChange={addMemberChange}
                  value={findUserId.memberId}
                  className="rounded-md shadow-md"
                  name="memberId"
                  placeholder="Username"
                />
                <button className="w-12 rounded-md shadow-md bg-blue-400">
                  Add
                </button>
              </form>
            )}
          </div>
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
}
