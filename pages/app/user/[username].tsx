import { withSessionSsr } from "../../../lib/withSession";
import NavBar from "../../../components/NavBar";
import useNavBar from "../../../lib/useNavBar";
import { IronSessionData } from "iron-session";
import Profile from "../../../components/Profile";
import Head from "next/head";
import User from "../../../models/User";
import dbConnect from "../../../lib/mongoDB";
import { IUser } from "../../../interfaces/models";
import Group from "../../../models/Group";

export const getServerSideProps = withSessionSsr(
  async function getServerSideProps({ req, query }) {
    const user = req.session.user;
    const { username } = query;

    await dbConnect();

    if (!user) {
      return {
        redirect: {
          destination: "/log-in",
          permanent: false,
        },
      };
    }

    if (user.username !== username) {
      return {
        redirect: {
          destination: "/app/user/" + user.username,
          permanent: false,
        },
      };
    }

    const groupModel = Group;

    const userExist = await User.findById(user._id)
      .lean()
      .populate({ path: "groups" })
      .select("-password -email")
      .exec();

    return {
      props: {
        user: req.session.user,
        userExist: JSON.stringify(userExist),
      },
    };
  }
);

export default function ProfilePage(
  props: IronSessionData & { userExist: IUser }
) {
  const { _id, username } = props.user!;
  const { user = props.userExist, mutateUser } = useNavBar(_id);
  return (
    <>
      <Head>
        <title>Profile: {username}</title>
      </Head>
      <div className="flex min-w-screen min-h-screen bg-slate-300">
        <NavBar _id={_id} user={user} mutateUser={mutateUser} />
        <Profile user={user} mutateUser={mutateUser} />
      </div>
    </>
  );
}
