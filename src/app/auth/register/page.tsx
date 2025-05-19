import { AuthScreenLogo } from "@/components/AuthScreenLogo";
import { RegisterForm } from "@/components/Forms/Register";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gamix | Register",
  description: "",
};

export default function Register() {
  return (
    <>
      <AuthScreenLogo screen="register" />

      <RegisterForm />
    </>
  );
}
