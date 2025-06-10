import { createServerClient } from "@workspace/supabase/server";
import { z } from "zod";

export const getPricesByIdInput = z.object({
  id: z.string(),
});

export type GetPricesByIdInput = z.infer<typeof getPricesByIdInput>;

// WIP
export const getPricesById = async ({ id }: GetPricesByIdInput) => {
  const supabase = await createServerClient();

  const { data } = await supabase
    .from("prices")
    .select("*")
    .eq("id", id)
    .single()
    .throwOnError();

  return data;
};
