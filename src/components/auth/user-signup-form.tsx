"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { signIn } from "next-auth/react"
import Link from "next/link"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from "@/app/firebase"
import { toast } from "../ui/use-toast"
import {useRouter} from "next/navigation"

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {

  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [email, setEmail] = React.useState<string>("")
  const [password, setPassword] = React.useState<string>("")
  const [confirm, setConfirm] = React.useState<string>("")
  const router = useRouter()

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault()
    try {
     setIsLoading(true)
    if (password !== confirm) {
      toast({title: "Passwords don't match"})
    } else {
        const res = await signIn("credentials", {email, password, type: "signup"})
        router.push("/")
    }
 
    } catch (err) {
      console.log(err)
    } finally {
        setIsLoading(false)
    }
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              onChange={e => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <div className="grid-gap-1" >
            <Label className="sr-only" htmlFor="password" >
              Password
            </Label>
            <Input id="passoword" placeholder="Password" onChange={e => setPassword(e.target.value)} value={password} type="password" disabled={isLoading} />
          </div>
          <div className="grid-gap-1" >
            <Label className="sr-only" >Confirm Password</Label>
            <Input id="conf" placeholder="Confirm Password" type="password" onChange={e => setConfirm(e.target.value)} value={confirm} />
          </div>
          <Button disabled={!email || !password || isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign In with Email
          </Button>
        </div>
      </form>
      {/* <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <Button variant="outline" type="button" disabled={isLoading}>
        {isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.google className="mr-2 h-4 w-4" />
        )}{" "}
        Google
      </Button> */}
    </div>
  )
}
