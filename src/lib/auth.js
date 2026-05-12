import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const mongoUri = process.env.MONGODB_URI || process.env.MongoDB_URL;
if (!mongoUri) {
  throw new Error("Missing MONGODB_URI");
}

const secret = process.env.BETTER_AUTH_SECRET;
if (!secret) {
  throw new Error("Missing BETTER_AUTH_SECRET");
}

const globalForMongo = globalThis;
const client = globalForMongo._mongoClient || new MongoClient(mongoUri);
if (!globalForMongo._mongoClient) globalForMongo._mongoClient = client;

const clientPromise = globalForMongo._mongoClientPromise || client.connect();
if (!globalForMongo._mongoClientPromise) {
  globalForMongo._mongoClientPromise = clientPromise;
}

const db = client.db("RecipeVault");

const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;

function getBaseURL() {
  const vercelProductionURL = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercelProductionURL) {
    return `https://${vercelProductionURL}`;
  }

  const vercelURL = process.env.VERCEL_URL;
  if (vercelURL) {
    return `https://${vercelURL}`;
  }

  if (process.env.BETTER_AUTH_URL) {
    return process.env.BETTER_AUTH_URL;
  }
}

function getTrustedOrigins() {
  const origins = new Set();

  if (process.env.BETTER_AUTH_URL) {
    origins.add(process.env.BETTER_AUTH_URL);
  }

  const vercelProductionURL = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercelProductionURL) {
    origins.add(`https://${vercelProductionURL}`);
  }

  const vercelURL = process.env.VERCEL_URL;
  if (vercelURL) {
    origins.add(`https://${vercelURL}`);
  }

  return [...origins];
}

export const auth = betterAuth({
  secret,
  baseURL: getBaseURL(),
  trustedOrigins: getTrustedOrigins(),
  database: mongodbAdapter(db, {
    // Optional: if you don't provide a client, database transactions won't be enabled.
    client,
    transaction: false
  }),
  emailAndPassword: {
    enabled: true,
  },
  ...(googleClientId && googleClientSecret
    ? {
        socialProviders: {
          google: {
            clientId: googleClientId,
            clientSecret: googleClientSecret,
          },
        },
      }
    : {}),
});

export const getAuth = () => auth;

