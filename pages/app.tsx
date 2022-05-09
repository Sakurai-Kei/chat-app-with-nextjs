import NavBar from "../components/NavBar";
import Chat from "../components/Chat";
import MemberList from "../components/MemberList";

export default function Layout() {
  return (
    <div className="flex sm:min-w-screen sm:min-h-screen md:w-screen md:h-screen text-gray-700">
      <NavBar />
      <Chat />
      <MemberList />
    </div>
  );
}
