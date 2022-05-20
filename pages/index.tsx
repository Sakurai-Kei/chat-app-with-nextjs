import Head from "next/head";
import { ReactElement } from "react";
import IndexContent from "../components/IndexContent";
import Layout from "../components/Layout";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Head>
        <title>SKCA Home</title>
        <meta name="description" content="Home page for SK Chat-App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <IndexContent />
    </div>
  );
}

Home.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <div>{page}</div>
    </Layout>
  );
};
