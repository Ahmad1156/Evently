import mongoose from "mongoose";

const MONOGO_URI = process.env.MONGODB_URI;
console.log(MONOGO_URI);

let cached = (global as any).mongoose || { conn: null, promise: null };

export const connectToDatabase = async () => {
  if (cached.conn) return cached.conn;

  if (!MONOGO_URI) throw new Error("MongoDB uri is missing");

  cached.promise = mongoose.connect(MONOGO_URI);
  cached.conn = await cached.promise;

  return cached.conn;
};
