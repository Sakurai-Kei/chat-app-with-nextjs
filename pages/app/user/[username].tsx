import { useRouter } from "next/router";
import { withSessionSsr } from "../../../lib/withSession";
import NavBar from "../../../components/NavBar";
import useNavBar from "../../../lib/useNavBar";
import { IronSessionData } from "iron-session";
import Profile from "../../../components/Profile";
import Head from "next/head";

export const getServerSideProps = withSessionSsr(
  async function getServerSideProps({ req, query }) {
    const user = req.session.user;
    const { username } = query;

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

    return {
      props: {
        user: req.session.user,
      },
    };
  }
);

export default function ProfilePage(props: IronSessionData) {
  const router = useRouter();
  const { _id, username } = props.user!;
  const { navBar, mutateNavBar } = useNavBar(_id);
  return (
    <>
      <Head>
        <title>Profile: {username}</title>
      </Head>
      <div className="flex w-screen h-screen bg-slate-300">
        <NavBar _id={_id} navBar={navBar} mutateNavBar={mutateNavBar} />
        <Profile
          user={navBar.user}
          mutateUser={mutateNavBar.mutateUser}
          groups={navBar.groups}
        />
      </div>
    </>
  );
}
