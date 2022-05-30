import { withSessionSsr } from "../../../lib/withSession";
import Head from "next/head";
import useNavBar from "../../../lib/useNavBar";
import NavBar from "../../../components/NavBar";
import ChatGroup from "../../../components/ChatGroup";
import MemberList from "../../../components/MemberList";
import { useChatGroup } from "../../../lib/useChat";
import { GroupChatRoomPage } from "../../../interfaces/pages";
import dbConnect from "../../../lib/mongoDB";
import Group from "../../../models/Group";

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

    const group = await Group.findById(id, { messages: { $slice: -15 } })
      .lean()
      .populate({
        path: "messages",
        populate: {
          path: "user",
          select: "-password -email -about",
        },
      })
      .populate({
        path: "members",
        select: "-password -email",
      })
      .exec();

    return {
      props: {
        user: req.session.user,
        group: JSON.stringify(group),
        groupId: id,
      },
    };
  }
);

export default function GroupChatRoom(props: GroupChatRoomPage) {
  const { user, groupId } = props;
  const { _id } = user!;
  const { navBar, mutateNavBar } = useNavBar(_id);
  const { group = props.group, mutateGroup } = useChatGroup(groupId);

  return (
    <>
      <Head>
        {group && group.name && <title>Group Instance: {group.name}</title>}
      </Head>
      <div className="flex w-screen h-screen md:w-screen md:h-screen text-gray-700">
        <NavBar _id={_id} navBar={navBar} mutateNavBar={mutateNavBar} />
        <ChatGroup userId={_id} group={group} mutateGroup={mutateGroup} />
        <MemberList group={group} mutateGroup={mutateGroup} />
      </div>
    </>
  );
}
