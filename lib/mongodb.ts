import { MongoClient, type Db } from "mongodb";

declare global {
  // Reused across hot reloads in dev and across invocations on the same serverless instance.
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

export function isMongoConfigured() {
  return Boolean(process.env.MONGODB_URI);
}

export async function getDb(): Promise<Db> {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI is not set");

  if (!globalThis._mongoClientPromise) {
    globalThis._mongoClientPromise = new MongoClient(uri, { serverSelectionTimeoutMS: 8000 }).connect();
  }
  const client = await globalThis._mongoClientPromise;
  return client.db(process.env.MONGODB_DB || "portfolio");
}
