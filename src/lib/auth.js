import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

let authSingleton;

/** Lazy init: avoids `new MongoClient(undefined)` during `next build` / prerender. */
export function getAuth() {
  if (authSingleton) return authSingleton;

  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error(
      "MONGODB_URI is not set. Copy .env.example to .env.local and fill in.",
    );
  }

  const client = new MongoClient(uri);
  const db = client.db("RecipeVault");

  const trustedOrigins = ["http://localhost:3000"];
  if (process.env.BETTER_AUTH_URL) trustedOrigins.push(process.env.BETTER_AUTH_URL);
  if (process.env.VERCEL_URL) trustedOrigins.push(`https://${process.env.VERCEL_URL}`);

  const fallbackAuthURL = process.env.BETTER_AUTH_URL || "http://localhost:3000";

  const socialProviders = {};
  if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
    socialProviders.google = {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    };
  }

  authSingleton = betterAuth({
    baseURL: {
      allowedHosts: ["localhost:3000", "*.vercel.app"],
      fallback: fallbackAuthURL,
      protocol: "auto",
    },
    advanced: {
      trustedProxyHeaders: true,
    },
    database: mongodbAdapter(db, { client }),
    trustedOrigins: [...new Set(trustedOrigins)],
    emailAndPassword: {
      enabled: true,
    },
    socialProviders,
  });

  return authSingleton;
}
