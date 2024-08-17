import mongoose from "mongoose"

export async function db() {
  try {
    const uri = process.env.MONGODB_URI
    if (!uri) throw new Error("Mongo DB URI is not defined.")
    await mongoose.connect(uri)
  } catch (e) {
    console.log(e)
  }
}

export async function close() {
  try {
    await mongoose.connection.close();
  } catch (e) {
    console.log(e);
  }
}

