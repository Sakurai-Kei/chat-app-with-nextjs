import NavBar from "../components/NavBar";
import Head from "next/head";
import { withSessionSsr } from "../lib/withSession";
import useNavBar from "../lib/useNavBar";
import AppHome from "../components/AppHome";
import { IronSessionData } from "iron-session";

export const getServerSideProps = withSessionSsr(
  async function getServerSideProps({ req }) {
    const user = req.session.user;

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
      },
    };
  }
);

export default function App(props: IronSessionData) {
  const { _id, username } = props.user!;
  const { navBar, mutateNavBar } = useNavBar(_id);

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
