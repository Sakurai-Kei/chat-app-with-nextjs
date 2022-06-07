import NavBar from "../../components/NavBar";
import dbConnect from "../../lib/mongoDB";
import { withSessionSsr } from "../../lib/withSession";
import User from "../../models/User";
import { IUser } from "../../interfaces/models";
import Head from "next/head";
import { AppPage } from "../../interfaces/pages";
import useNavBar from "../../lib/useNavBar";
import SearchFunction from "../../components/SearchFunction";

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

    const userExist: IUser = await User.findById(user._id)
      .lean()
      .select("-password -email")
      .exec();
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

export default function Search(props: AppPage) {
  const { _id } = props.user!;
  const { user = props.userExist, mutateUser } = useNavBar(_id);

  return (
    <>
      <Head>
        <title>Search Page</title>
        <meta name="description" content="Search for groups or users" />
      </Head>
      <div className="flex min-w-screen min-h-screen md:w-screen md:h-screen text-gray-700">
        <NavBar _id={_id} user={user} mutateUser={mutateUser} />
        <SearchFunction />
      </div>
    </>
  );
}
