//@ts-nocheck

import { MongoClient } from "mongodb";

const MONGODB_URI = process.env.MONGO_URI;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGO_URI environment variable");
}

let client;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    global._mongoClientPromise = MongoClient.connect(MONGODB_URI, {});
  }

  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(MONGODB_URI, {});
  clientPromise = client.connect();
}

export default clientPromise;
