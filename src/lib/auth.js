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

export const auth = betterAuth({
  secret,
  baseURL: process.env.BETTER_AUTH_URL,
  database: mongodbAdapter(db, {
    // Optional: if you don't provide a client, database transactions won't be enabled.
    client,
    transaction: false
  }),
  emailAndPassword: { 
    enabled: true, 
  }, 
});

export const getAuth = () => auth;

