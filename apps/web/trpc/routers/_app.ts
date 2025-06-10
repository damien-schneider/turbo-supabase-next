import {
  getPricesById,
  getPricesByIdInput,
} from "@/trpc/api/supabase/prices.queries";
import {
  updateCurrentUser,
  updateCurrentUserInput,
  updateUser,
  updateUserInput,
} from "@/trpc/api/supabase/users.mutations";
import {
  getCurrentUser,
  getUserById,
  getUserByIdInput,
} from "@/trpc/api/supabase/users.queries";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";

export const appRouter = createTRPCRouter({
  // Page-related operations
  spaces: createTRPCRouter({
    byId: baseProcedure.input(getPricesByIdInput).query(async (opts) => {
      return await getPricesById(opts.input);
    }),
  }),
  // User-related operations
  user: createTRPCRouter({
    current: baseProcedure.query(async () => {
      return await getCurrentUser();
    }),
    byId: baseProcedure.input(getUserByIdInput).query(async (opts) => {
      return await getUserById(opts.input);
    }),
    updateCurrent: baseProcedure
      .input(updateCurrentUserInput)
      .mutation(async (opts) => {
        return await updateCurrentUser(opts.input);
      }),
    update: baseProcedure.input(updateUserInput).mutation(async (opts) => {
      return await updateUser(opts.input);
    }),
  }),
});

// export type definition of API
export type AppRouter = typeof appRouter;
