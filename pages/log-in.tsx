import { useRouter } from "next/router";
import { useState } from "react";
import Head from "next/head";
import LogInForm from "../components/LogInForm";
import { FormEvent } from "react";
import useUser from "../lib/useUser";
import { ReactElement } from "react";
import Layout from "../components/Layout";

export default function LogIn() {
  const router = useRouter();
  const { user, mutateUser } = useUser({
    redirectTo: "/",
    redirectIfFound: true,
  });

  const [formData, setFormData] = useState({
    loginId: "",
    password: "",
  });

  const [isProcessing, setIsProcessing] = useState(false);

  const [errors, setErrors] = useState({
    error: "",
  });

  function handleChange(event: FormEvent<HTMLInputElement>) {
    const value = event.currentTarget.value;
    setFormData({
      ...formData,
      [event.currentTarget.name]: value,
    });
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    setIsProcessing(true);

    if (!formData.loginId || !formData.password) {
      setErrors({
        ...errors,
        error: "Please fill in both fields",
      });
      setIsProcessing(false);
      return;
    }

    const JSONdata = JSON.stringify(formData);
    const endpoint = "/api/log-in";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSONdata,
    };

    const response = await fetch(endpoint, options);
    setIsProcessing(false);
    if (response.status === 200) {
      router.push("/");
    } else {
      const result = await response.json();
      setErrors({
        error: `Status Code: ${response.status}(${result.error})`,
      });
    }
  }
  return (
    <>
      <Head>
        <title>Log In</title>
        <meta
          name="description"
          content="Log In to access SKCA chat features"
        />
      </Head>
      <div className="w-full flex justify-center bg-indigo-800">
        <LogInForm
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          errors={errors}
          isProcessing={isProcessing}
        />
      </div>
    </>
  );
}

LogIn.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <div>{page}</div>
    </Layout>
  );
};
