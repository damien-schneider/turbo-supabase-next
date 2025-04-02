/**
 * ! Executing this script will delete all data in your database and seed it with 10 auth_users.
 * ! Make sure to adjust the script to your needs.
 * Use any TypeScript runner to run this script, for example: `npx tsx seed.ts`
 * Learn more about the Seed Client by following our guide: https://docs.snaplet.dev/seed/getting-started
 */
import { createSeedClient } from "@snaplet/seed";
import { seedFirstUser } from "./utils/seeds/first-user.seed";

// DRY_RUN set to true will not execute any database operations but console them instead, which can be then used with `pnpx tsx seed.ts > seed.sql`
const DRY_RUN = true;

const main = async () => {
  const seed = await createSeedClient({ dryRun: DRY_RUN });

  // Truncate all tables in the database
  await seed.$resetDatabase();

  await seedFirstUser(seed);

  // Type completion not working? You might want to reload your TypeScript Server to pick up the changes

  // console.log("Database seeded successfully!");

  process.exit();
};

main();
