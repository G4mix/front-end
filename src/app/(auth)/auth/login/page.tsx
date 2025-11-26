import { AuthScreenLogo } from "@/components/AuthScreenLogo";
import { LoginForm } from "@/components/Forms/Login";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gamix | Login",
  description: "",
};

export default function Login() {
  return (
    <>
      <AuthScreenLogo screen="login" />
      <LoginForm />
    </>
  );
}
