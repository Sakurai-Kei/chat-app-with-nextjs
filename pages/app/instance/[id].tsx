import { useRouter } from "next/router";
import { withSessionSsr } from "../../../lib/withSession";
import { useChatInstance } from "../../../lib/useChat";
import useNavBar from "../../../lib/useNavBar";
import NavBar from "../../../components/NavBar";
import ChatInstance from "../../../components/ChatInstance";

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
        instanceId: id,
      },
    };
  }
);

export default function InstanceChatRoom(props: any) {
  const router = useRouter();
  const { user, instanceId } = props;
  const { _id, username } = user;
  const { navBar, mutateNavBar } = useNavBar(_id);
  const { instance, mutateInstance } = useChatInstance(instanceId);

  return (
    <div className="flex sm:min-w-screen sm:min-h-screen md:w-screen md:h-screen text-gray-700">
      <NavBar _id={_id} navBar={navBar} mutateNavBar={mutateNavBar} />
      <ChatInstance
        userId={_id}
        instance={instance}
        mutateInstance={mutateInstance}
      />
    </div>
  );
}
