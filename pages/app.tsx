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
import { IUser } from "../interfaces/models";

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

    const userExist: IUser = await User.findById(user._id).lean().exec();
    if (!userExist) {
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
        userExist: JSON.stringify(userExist),
      },
    };
  }
);

export default function App(props: AppPage) {
  const { _id } = props.user!;
  const { user = props.userExist, mutateUser } = useNavBar(_id);

  return (
    <>
      <Head>
        <title>SKCA Chat App</title>
        <meta name="description" content="SKCA Chat Web App" />
      </Head>
      <div className="flex min-w-screen min-h-screen md:w-screen md:h-screen text-gray-700">
        <NavBar _id={_id} user={user} mutateUser={mutateUser} />
        <AppHome />
      </div>
    </>
  );
}
