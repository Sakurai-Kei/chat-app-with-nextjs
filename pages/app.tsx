import NavBar from "../components/NavBar";
import Head from "next/head";
import { withSessionSsr } from "../lib/withSession";
import useNavBar from "../lib/useNavBar";
import AppHome from "../components/AppHome";
import type { AppPage } from "../interfaces/pages";
import User from "../models/User";
import dbConnect from "../lib/mongoDB";
import RoomInstance from "../models/RoomInstance";
import Group from "../models/Group";

export const getServerSideProps = withSessionSsr(
  async function getServerSideProps({ req }) {
    const user = req.session.user;
    await dbConnect();

    if (!user) {
      return {
        redirect: {
          destination: "/log-in",
          permanent: false,
        },
      };
    }

    const userExist = await User.findById(user._id).lean().exec();
    if (!userExist) {
      return {
        redirect: {
          destination: "/log-in",
          permanent: false,
        },
      };
    }

    const roomInstance = await RoomInstance.find({
      members: user._id,
    })
      .lean()
      .populate({ path: "members", select: "-password -email" })
      .exec();

    const group = await Group.find({ members: user._id }).lean().exec();

    const navBar = {
      user: userExist,
      roomInstances: roomInstance,
      groups: group,
    };

    return {
      props: {
        user: req.session.user,
        navBar: JSON.parse(JSON.stringify(navBar)),
      },
    };
  }
);

export default function App(props: AppPage) {
  const { _id } = props.user!;
  const { navBar = props.navBar, mutateNavBar } = useNavBar(_id);

  return (
    <>
      <Head>
        <title>SKCA Chat App</title>
        <meta name="description" content="SKCA Chat Web App" />
      </Head>
      <div className="flex min-w-screen min-h-screen md:w-screen md:h-screen text-gray-700">
        <NavBar _id={_id} navBar={navBar} mutateNavBar={mutateNavBar} />
        <AppHome />
      </div>
    </>
  );
}
