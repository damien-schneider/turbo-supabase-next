import type { SeedClient } from "@snaplet/seed";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";

const USER_EMAIL = "test@mail.com";
const USER_PASSWORD = "password";

async function hashPassword(password: string): Promise<string> {
  const saltRounds = 10; // You can adjust the salt rounds as needed
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}

export async function seedFirstUser(seed: SeedClient) {
  const USER_ENCRYPTED_PASSWORD = await hashPassword(USER_PASSWORD);
  const USER_ID = uuidv4();

  await seed.auth_users([
    {
      id: USER_ID,
      instance_id: "00000000-0000-0000-0000-000000000000",
      aud: "authenticated",
      role: "authenticated",
      email: USER_EMAIL,
      encrypted_password: USER_ENCRYPTED_PASSWORD,
      // email_confirmed_at: "", // Snaplet will generate this for you
      invited_at: null,
      confirmation_token: "",
      confirmation_sent_at: null,
      recovery_token: "",
      recovery_sent_at: null,
      email_change_token_new: "",
      email_change: "",
      email_change_sent_at: null,
      // last_sign_in_at: "", // Snaplet will generate this for you
      raw_app_meta_data: { provider: "email", providers: ["email"] },
      raw_user_meta_data: {
        sub: USER_ID,
        email: USER_EMAIL,
        email_verified: false,
        phone_verified: false,
      },
      is_super_admin: null,
      // created_at: "", // Snaplet will generate this for you
      // updated_at: "", // Snaplet will generate this for you
      phone: null,
      phone_confirmed_at: null,
      phone_change: "",
      phone_change_token: "",
      phone_change_sent_at: null,
      email_change_token_current: "",
      email_change_confirm_status: 0,
      banned_until: null,
      reauthentication_token: "",
      reauthentication_sent_at: null,
      is_sso_user: false,
      deleted_at: null,
      is_anonymous: false,

      identities: [
        {
          // id: "", // Snaplet will generate this for you
          identity_data: {
            sub: USER_ID,
            email: USER_EMAIL,
            email_verified: false,
            phone_verified: false,
          },
          provider: "email",
          provider_id: USER_ID,
        },
      ],
    },
  ]);
}
