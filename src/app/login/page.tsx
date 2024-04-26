import { Metadata } from "next"
import { UserAuthForm } from "@/components/auth/user-login-form"
import AuthLayout from "@/components/auth/auth-layout"

export const metadata: Metadata = {
  title: "Authentication",
  description: "Authentication forms built using the components.",
}

export default function AuthenticationPage() {
  return (<AuthLayout btnName="" href="/login" title="Login" description="Login to your account" ><UserAuthForm /></AuthLayout>)
}
