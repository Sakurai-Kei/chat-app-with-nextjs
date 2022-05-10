import type { NextPage } from "next";
import Head from "next/head";
import Footer from "../components/Footer";
import Header from "../components/Header";
import IndexContent from "../components/IndexContent";

const Home: NextPage = () => {
  return (
    <div className="flex flex-col">
      <Head>
        <title>SKCA Home</title>
        <meta name="description" content="Home page for SK Chat-App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <IndexContent />
      <Footer />
    </div>
  );
};

export default Home;
