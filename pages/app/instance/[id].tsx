import { useRouter } from "next/router";
import Head from "next/head";
import { withSessionSsr } from "../../../lib/withSession";
import { useChatInstance } from "../../../lib/useChat";
import useNavBar from "../../../lib/useNavBar";
import NavBar from "../../../components/NavBar";
import ChatInstance from "../../../components/ChatInstance";
import { InstanceChatRoomPage } from "../../../interfaces/pages";
import { useEffect } from "react";
import { IUser } from "../../../interfaces/models";

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

export default function InstanceChatRoom(props: InstanceChatRoomPage) {
  const router = useRouter();
  const { user, instanceId } = props;
  const { _id, username } = user!;
  const { navBar, mutateNavBar } = useNavBar(_id);
  const { instance, mutateInstance } = useChatInstance(instanceId);

  return (
    <>
      <Head>
        {instance && instance.members && (
          <title>
            Private Instance:{" "}
            {
              instance.members.filter(
                (member: Partial<IUser>) => member.username !== user?.username
              )[0].username
            }
          </title>
        )}
      </Head>
      <div className="flex w-screen h-screen md:w-screen md:h-screen text-gray-700">
        <NavBar _id={_id} navBar={navBar} mutateNavBar={mutateNavBar} />
        <ChatInstance
          userId={_id}
          instance={instance}
          mutateInstance={mutateInstance}
        />
      </div>
    </>
  );
}
