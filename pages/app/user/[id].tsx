import NavBar from "../../../components/NavBar";
import Chat from "../../../components/ChatGroup";
import MemberList from "../../../components/MemberList";

export default function ChatRoom() {
  return (
    <div className="flex sm:min-w-screen sm:min-h-screen md:w-screen md:h-screen text-gray-700">
      <NavBar />
      <Chat />
      <MemberList />
    </div>
  );
}
