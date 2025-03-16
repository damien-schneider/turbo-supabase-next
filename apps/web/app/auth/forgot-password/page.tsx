"use client";
import { createClient } from "@workspace/supabase/client";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";

// import { sendPasswordResetEmail } from "@/ui/auth/actions";
import { H1, P } from "@workspace/ui/components/typography";
import Link from "next/link";
import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@workspace/ui/components/form";
import { useForm } from "react-hook-form";
import { z } from "zod";

const FormSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});

export default function ForgotPasswordPage() {
  const supabase = createClient();
  const [errorMessage, setErrorMessage] = useState<string | null>("");
  const [successMessage, setSuccessMessage] = useState<string | null>("");
  const [_isLoading, setIsLoading] = useState(false);
  const [sixtySecondsLoading, setSixtySecondsLoading] = useState(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(dataForm: z.infer<typeof FormSchema>) {
    setIsLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(dataForm.email);

    // const { error } = await supabase.auth.reauthenticate();

    if (error) {
      setErrorMessage(error.message);
      setSuccessMessage(null);
    } else {
      setSuccessMessage(
        "Password reset email sent successfully, check your inbox.",
      );
      setErrorMessage(null);
      setSixtySecondsLoading(true);
      setTimeout(() => {
        setSuccessMessage(null);
        setSixtySecondsLoading(false);
      }, 60 * 1000); // 1 minute
    }
    setIsLoading(false);
  }

  /**
   * Step 2: Once the user is redirected back to your application,
   * ask the user to reset their password.
   */
  // useEffect(() => {
  //   supabase.auth.onAuthStateChange(async (event, session) => {
  //     console.log("event AUTH STATE", event);
  //     if (event === "PASSWORD_RECOVERY") {
  //       const newPassword = prompt(
  //         "What would you like your new password to be?",
  //       );
  //       if (!newPassword) {
  //         return;
  //       }
  //       const { data, error } = await supabase.auth.updateUser({
  //         password: newPassword,
  //       });

  //       if (data) {
  //         alert("Password updated successfully!");
  //       }
  //       if (error) {
  //         alert("There was an error updating your password.");
  //       }
  //     }
  //   });
  // }, [supabase]);

  return (
    <>
      {/* <form action={sendPasswordResetEmail}> */}
      <div className="text-center my-8">
        <H1>Forgot Password</H1>
        <P className="mt-2">
          We will send a password reset link to your email address if there is
          an existing account.
        </P>
      </div>
      {errorMessage && (
        <P variant="error" className="text-center">
          {errorMessage}
        </P>
      )}
      {successMessage && (
        <P variant="success" className="text-center">
          {successMessage}
        </P>
      )}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-6"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="mail@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            variant="secondary"
            className="w-full"
            type="submit"
            disabled={sixtySecondsLoading}
          >
            Submit
          </Button>
        </form>
      </Form>

      <div className="mx-auto mt-4 text-center">
        <Link href="/auth/signin" className="link-primary">
          Go back to Sign In
        </Link>
      </div>
    </>
  );
}
