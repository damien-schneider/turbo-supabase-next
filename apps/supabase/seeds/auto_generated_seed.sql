INSERT INTO auth.users (instance_id,id,aud,role,email,encrypted_password,email_confirmed_at,invited_at,confirmation_token,confirmation_sent_at,recovery_token,recovery_sent_at,email_change_token_new,email_change,email_change_sent_at,last_sign_in_at,raw_app_meta_data,raw_user_meta_data,is_super_admin,created_at,updated_at,phone,phone_confirmed_at,phone_change,phone_change_token,phone_change_sent_at,email_change_token_current,email_change_confirm_status,banned_until,reauthentication_token,reauthentication_sent_at,is_sso_user,deleted_at,is_anonymous) VALUES ('00000000-0000-0000-0000-000000000000', 'bc0c4ed8-3534-4a58-a122-6dec637e9e5c', 'authenticated', 'authenticated', 'test@mail.com', '$2b$10$gLd.wctYU4zqaR5OxDm.qO2wrl0Zyz42NhX4fr.H.KtXlypmLQr2.', '2020-11-23T10:23:33.000Z', NULL, '', NULL, '', NULL, '', '', NULL, '2020-08-16T20:07:51.000Z', '{"provider":"email","providers":["email"]}', '{"sub":"bc0c4ed8-3534-4a58-a122-6dec637e9e5c","email":"test@mail.com","email_verified":false,"phone_verified":false}', NULL, '2020-03-03T14:27:55.000Z', '2020-03-03T02:16:57.000Z', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, 'f', NULL, 'f');
INSERT INTO auth.identities (provider_id,user_id,identity_data,provider,last_sign_in_at,created_at,updated_at,id) VALUES ('bc0c4ed8-3534-4a58-a122-6dec637e9e5c', 'bc0c4ed8-3534-4a58-a122-6dec637e9e5c', '{"sub":"bc0c4ed8-3534-4a58-a122-6dec637e9e5c","email":"test@mail.com","email_verified":false,"phone_verified":false}', 'email', '2020-07-23T06:58:07.000Z', '2020-12-28T11:32:05.000Z', '2020-03-07T14:28:34.000Z', 'd7b0a33c-1082-58b8-b1e8-a5d1228cc45d');
