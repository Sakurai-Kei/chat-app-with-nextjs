import { withSessionSsr } from "../../../lib/withSession";
import useNavBar from "../../../lib/useNavBar";
import NavBar from "../../../components/NavBar";
import ChatGroup from "../../../components/ChatGroup";
import MemberList from "../../../components/MemberList";
import { useChatGroup } from "../../../lib/useChat";
import { useRouter } from "next/router";
import { GroupChatRoomPage } from "../../../interfaces/pages";

export const getServerSideProps = withSessionSsr(
  async function getServerSideProps({ req, query }) {
    const user = req.session.user;
    const { id } = query;

    if (!user) {
      return {
        redirect: {
          destination: "/log-in",
          permanent: false,
        },
      };
    }

    return {
      props: {
        user: req.session.user,
        id,
      },
    };
  }
);

export default function GroupChatRoom(props: GroupChatRoomPage) {
  const router = useRouter();
  const { user, id } = props;
  const { _id, username } = user!;
  const { navBar, mutateNavBar } = useNavBar(_id);
  const { group, mutateGroup } = useChatGroup(id);

  return (
    <div className="flex w-screen h-screen md:w-screen md:h-screen text-gray-700">
      <NavBar _id={_id} navBar={navBar} mutateNavBar={mutateNavBar} />
      <ChatGroup userId={_id} group={group} mutateGroup={mutateGroup} />
      <MemberList group={group} mutateGroup={mutateGroup} />
    </div>
  );
}
