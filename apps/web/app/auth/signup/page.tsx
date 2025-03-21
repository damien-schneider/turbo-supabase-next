"use client";
import { signUpWithPassword } from "@/app/auth/actions";
import { OrSeparator } from "@/app/auth/components/or-separator";
import { OAuthButton } from "@/app/auth/components/provider-button";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import { H1, P } from "@workspace/ui/components/typography";
import Link from "next/link";
import { useState } from "react";

export default function SignUpPage() {
  const [errorMessage, setErrorMessage] = useState("");
  const [_loading, setLoading] = useState(false);
  const handleSubmit = async (formData: FormData) => {
    setLoading(true);
    const result = await signUpWithPassword(formData);

    setErrorMessage(result);
    setLoading(false);
  };
  return (
    <>
      <div className="my-8 text-center">
        <H1>Create account</H1>
        <p className="text-sm mt-2 text-white">
          Sign Up to BoilerPlate to experience the tool completely.
        </p>
      </div>

      <div className="flex flex-col gap-6">
        <div className="grid gap-4 w-full">
          {/* <OAuthButton provider="notion">Sign Up with</OAuthButton> */}
          <OAuthButton provider="google">Sign Up with</OAuthButton>
        </div>

        <OrSeparator />

        <form action={handleSubmit}>
          <div className="grid gap-2">
            {errorMessage && (
              <P className="text-red-500 text-sm text-center">{errorMessage}</P>
            )}
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="mail@example.com"
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
          </div>
          <Button type="submit" className="w-full mt-8" variant="default">
            Sign Up
          </Button>
        </form>
      </div>

      <P variant="caption" className="text-balance text-center w-full mt-4">
        By joining, you agree to our{" "}
        <Link href="/terms-of-use" className="link-secondary">
          Terms of use
        </Link>{" "}
        and{" "}
        <Link href="/privacy-policy" className="link-secondary">
          Privacy Policy
        </Link>
        .
      </P>
      <P className="text-center mt-2">
        Already have an account?{" "}
        <Link href="/auth/signin" className="link-primary">
          Log in
        </Link>
      </P>
    </>
  );
}
