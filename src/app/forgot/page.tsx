import { Metadata } from "next"
import { UserAuthForm } from "@/components/auth/user-signup-form"
import AuthLayout from "@/components/auth/auth-layout"
import { ForgotPassForm } from "@/components/auth/forgot-signin"

export const metadata: Metadata = {
  title: "Authentication",
  description: "Authentication forms built using the components.",
}

export default function AuthenticationPage() {
  return (<AuthLayout btnName="Log In" href="/login" title="Forgot Password" description="" ><ForgotPassForm/></AuthLayout>)
}
