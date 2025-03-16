"use client";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";

import { signInWithPassword } from "@/app/auth/actions";
import { OrSeparator } from "@/app/auth/components/or-separator";
import { OAuthButton } from "@/app/auth/components/provider-button";
import { H1, P } from "@workspace/ui/components/typography";
import Link from "next/link";
import { useState } from "react";

export default function SignInPage() {
  const [errorMessage, setErrorMessage] = useState("");
  const [_loading, setLoading] = useState(false);
  const handleSubmit = async (formData: FormData) => {
    setLoading(true);
    const result = await signInWithPassword(formData);

    setErrorMessage(result);
    setLoading(false);
  };
  return (
    <>
      <H1 className="text-center my-8">Login to your Account</H1>
      <div className="flex flex-col gap-6">
        <div className="grid gap-4 w-full">
          <OAuthButton provider="notion" />
          {/* <OAuthButton provider="google" /> */}
        </div>
        <OrSeparator />
        <form action={(formData) => handleSubmit(formData)}>
          <div className="grid gap-2">
            {errorMessage && (
              <P className="text-red-500 text-sm text-center">{errorMessage}</P>
            )}
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="m@example.com"
              autoComplete="email"
              required={true}
            />
          </div>
          <div className="grid gap-2 mt-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              name="password"
              autoComplete="current-password"
              required={true}
            />
            <Link href="/auth/forgot-password" className="link-primary">
              Forgot password?
            </Link>
          </div>
          <Button type="submit" variant="default" className="w-full mt-8">
            Sign In
          </Button>
        </form>
      </div>

      <P className="text-center mt-2">
        New to BoilerPlate?{" "}
        <Link className="link-primary" href="/auth/signup">
          Sign up
        </Link>
      </P>
    </>
  );
}
