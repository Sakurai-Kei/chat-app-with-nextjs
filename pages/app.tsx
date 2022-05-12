import { useRouter } from "next/router";
import NavBar from "../components/NavBar";
import useUser from "../lib/useUser";
import { withSessionSsr } from "../lib/withSession";
import useNavBar from "../lib/useNavBar";

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

export default function App(props: any) {
  const router = useRouter();
  if (!props.user) {
    router.push("/log-in");
  }
  const { user, mutateUser } = useUser();
  const { _id, username } = props.user;
  const { navBar, mutateNavBar } = useNavBar(_id);

  return (
    <div className="flex sm:min-w-screen sm:min-h-screen md:w-screen md:h-screen text-gray-700">
      <NavBar _id={_id} navBar={navBar} mutateNavBar={mutateNavBar} />
    </div>
  );
}
