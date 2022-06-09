import Head from "next/head";
import useUser from "../../../lib/useUser";
import { withSessionSsr } from "../../../lib/withSession";
import { useChatInstance } from "../../../lib/useChat";
import useNavBar from "../../../lib/useNavBar";
import NavBar from "../../../components/NavBar";
import ChatInstance from "../../../components/ChatInstance";
import { InstanceChatRoomPage } from "../../../interfaces/pages";
import { IUser } from "../../../interfaces/models";
import dbConnect from "../../../lib/mongoDB";
import RoomInstance from "../../../models/RoomInstance";
import Message from "../../../models/Message";
import User from "../../../models/User";

export const getServerSideProps = withSessionSsr(
  async function getServerSideProps({ req, query }) {
    const user = req.session.user;
    const { id } = query as { id: string };
    await dbConnect();

    if (!user) {
      return {
        redirect: {
          destination: "/log-in",
          permanent: false,
        },
      };
    }

    const messageModel = Message;
    const userModel = User;

    const roomInstance = await RoomInstance.findById(id, {
      messages: { $slice: -15 },
    })
      .lean()
      .populate({
        path: "messages",
        populate: {
          path: "user",
          select: "-password -email -about",
        },
      })
      .populate({ path: "members", select: "-password -email" })
      .exec();

    return {
      props: {
        user: req.session.user,
        roomInstance: JSON.stringify(roomInstance),
        instanceId: id,
      },
    };
  }
);

export default function InstanceChatRoom(props: InstanceChatRoomPage) {
  const { instanceId } = props;
  useUser({
    redirectTo: "/log-in",
    redirectIfFound: false,
  });
  const { _id, username } = props.user!;
  const { user, mutateUser } = useNavBar(_id);
  const { instance = props.roomInstance, mutateInstance } =
    useChatInstance(instanceId);

  return (
    <>
      <Head>
        {instance && instance.members && (
          <title>
            Private Instance:{" "}
            {instance &&
              instance.members &&
              instance.members.filter(
                (member: Partial<IUser>) => member.username !== username
              )[0].username}
          </title>
        )}
      </Head>
      <div className="flex w-screen h-screen md:w-screen md:h-screen text-gray-700">
        <NavBar _id={_id} user={user!} mutateUser={mutateUser} />
        <ChatInstance
          userId={_id}
          instance={instance}
          mutateInstance={mutateInstance}
        />
      </div>
    </>
  );
}
