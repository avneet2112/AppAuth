import mongoose from "mongoose";

export const connectWithMongo = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URI);
    console.log("Mongodb connected");
  } catch (err) {
    console.log("Error: ", err);
  }
};
