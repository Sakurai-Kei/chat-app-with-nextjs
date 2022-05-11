import { useRouter } from "next/router";
import { useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { FormEvent } from "react";
import RegisterForm from "../components/RegisterForm";

export default function Register() {
  const router = useRouter();
  // const user = useUser({
  //   redirectTo: "/",
  //   redirectIfFound: true,
  // });
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
  });
  const [errors, setErrors] = useState({
    alreadyExist: false,
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
      const result = await response.json();
      router.push("/");
    } else if (response.status === 400) {
      const result = await response.json();
      const { error } = result;

      setErrors({
        ...errors,
        error,
      });
    } else if (response.status === 409) {
      const result = await response.json();
      const { error, alreadyExist } = result;

      setErrors({
        alreadyExist,
        error,
      });
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
      <Header />
      <div className="w-full flex justify-center">
        <RegisterForm
          errors={errors}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
        />
      </div>
      <Footer />
    </>
  );
}
