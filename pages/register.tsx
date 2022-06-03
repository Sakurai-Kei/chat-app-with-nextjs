import { useRouter } from "next/router";
import Head from "next/head";
import { useState } from "react";
import Layout from "../components/Layout";
import { FormEvent } from "react";
import RegisterForm from "../components/RegisterForm";
import useUser from "../lib/useUser";
import { ReactElement } from "react";

export default function Register() {
  const router = useRouter();
  const { user, mutateUser } = useUser({
    redirectTo: "/",
    redirectIfFound: true,
  });
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
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
    if (
      !formData.username ||
      !formData.password ||
      !formData.confirmPassword ||
      !formData.email
    ) {
      setIsProcessing(false);
      setErrors({
        ...errors,
        error: "Please fill in all fields",
      });
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setIsProcessing(false);
      setErrors({
        ...errors,
        error: "Password does not match",
      });
      return;
    }

    const JSONdata = JSON.stringify(formData);
    const endpoint = "/api/v2/users";
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
        ...errors,
        error: result.error,
      });
    }
  }
  return (
    <>
      <Head>
        <title>Register</title>
        <meta name="description" content="Make an account with SKCA" />
      </Head>
      <div className="w-full flex justify-center bg-indigo-800">
        <RegisterForm
          errors={errors}
          isProcessing={isProcessing}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
        />
      </div>
    </>
  );
}

Register.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <div>{page}</div>
    </Layout>
  );
};
