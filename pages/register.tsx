import { useRouter } from "next/router";
import { useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
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

    if (
      !formData.username ||
      !formData.password ||
      !formData.confirmPassword ||
      formData.password !== formData.confirmPassword ||
      !formData.email
    ) {
      return;
    }

    const JSONdata = JSON.stringify(formData);
    const endpoint = "/api/register";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSONdata,
    };

    const response = await fetch(endpoint, options);
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
      <div className="w-full flex justify-center bg-indigo-800">
        <RegisterForm
          errors={errors}
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
