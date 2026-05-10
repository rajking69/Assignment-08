import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  // No baseURL — Better Auth uses current origin (works on localhost + any deployed URL).
});

export const { signIn, signUp, useSession, signOut } = authClient;
