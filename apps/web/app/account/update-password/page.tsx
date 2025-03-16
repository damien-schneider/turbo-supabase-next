"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { createClient } from "@workspace/supabase/client";
import { Button } from "@workspace/ui/components/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@workspace/ui/components/form";
import { Input } from "@workspace/ui/components/input";
import { H2, P } from "@workspace/ui/components/typography";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const FormSchema = z
  .object({
    password: z
      .string()
      .min(8, "Password must be at least 1 character long") // Set the minimum length as required
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(
        /[^A-Za-z0-9]/,
        "Password must contain at least one special character",
      ),
    passwordConfirm: z.string(),
  })
  // Check if the passwords match
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords don't match",
    path: ["passwordConfirm"], // field which will be pointed as error source
  });

export default function LogicNewPassword() {
  const supabase = createClient();
  const [errorMessage, setErrorMessage] = useState<string | null>("");
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      password: "",
      passwordConfirm: "",
    },
  });

  async function onSubmit(dataForm: z.infer<typeof FormSchema>) {
    const { error } = await supabase.auth.updateUser({
      password: dataForm.password,
    });
    if (error) {
      console.error(error);
      setErrorMessage(error.message);
    } else {
      toast.success("Password updated successfully");
    }
  }

  // Inform user that the password has been updated
  // const onSubmitPassword: SubmitHandler<IFormInputNewPassword> = async (
  //   data,
  // ) => {
  //   await setUpNewPwd(data.password, data.passwordConfirm);
  // };

  return (
    <Form {...form}>
      <H2>Update Password</H2>
      <P variant="error">{errorMessage}</P>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="New Password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="passwordConfirm"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm New Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Confirm New Password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Update Password</Button>
      </form>
    </Form>
  );
}
