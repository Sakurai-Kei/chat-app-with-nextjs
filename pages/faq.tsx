import { ReactElement } from "react";
import FAQComponent from "../components/FAQComponent";
import Head from "next/head";
import Layout from "../components/Layout";

export default function FAQ() {
  return (
    <>
      <Head>
        <title>FAQ</title>
        <meta
          name="description"
          content="Frequently asked questions for SKCA"
        />
      </Head>
      <FAQComponent />
    </>
  );
}

FAQ.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <div>{page}</div>
    </Layout>
  );
};
