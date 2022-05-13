import { withSessionSsr } from "../../../lib/withSession";
import useNavBar from "../../../lib/useNavBar";
import NavBar from "../../../components/NavBar";
import Chat from "../../../components/Chat";
import MemberList from "../../../components/MemberList";
import useChatGroup from "../../../useChat";
import { useRouter } from "next/router";

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

export default function ChatRoom(props: any) {
  const router = useRouter();
  const { user, id } = props;
  const { _id, username } = user;
  const { navBar, mutateNavBar } = useNavBar(_id);
  const { group, mutateGroup } = useChatGroup(id);

  return (
    <div className="flex sm:min-w-screen sm:min-h-screen md:w-screen md:h-screen text-gray-700">
      <NavBar _id={_id} navBar={navBar} mutateNavBar={mutateNavBar} />
      <Chat group={group} mutateGroup={mutateGroup} />
      <MemberList group={group} mutateGroup={mutateGroup} />
    </div>
  );
}
