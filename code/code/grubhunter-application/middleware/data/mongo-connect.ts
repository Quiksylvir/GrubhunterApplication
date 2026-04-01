import mongoose from "mongoose";

declare global {
  var mongoose: {
    conn: unknown;
    promise: unknown;
  };
}

const MONGO_URI = process.env.MONGO_URI || "";

let connection = global.mongoose;

if (!connection) {
  connection = global.mongoose = { conn: null, promise: null };
}

async function dbConnect(): Promise<unknown> {
  if (connection.conn) {
    return connection.conn;
  }

  if (!connection.promise) {
    await mongoose.disconnect();

    connection.promise = mongoose
      .connect(MONGO_URI)
      .then((mongoose) => mongoose)
      .catch((error) => {
        throw new Error(String(error));
      });
  }
  try {
    connection.conn = await connection.promise;
  } catch (error) {
    console.error(error);
  }
  return connection.conn;
}

export default dbConnect;
