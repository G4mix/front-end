import { AuthScreenLogo } from "@/components/AuthScreenLogo";
import { ForgotPasswordForm } from "@/components/Forms/ForgotPassword";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gamix | Forgot Password",
  description: "",
};

export default function ForgotPassword() {
  return (
    <>
      <AuthScreenLogo screen="forgot-password" />

      <ForgotPasswordForm />
    </>
  );
}
