import mongoose from "mongoose";

import { envConfig } from "./env.js";

const connectToDb = async () => {
  try {

    await mongoose.connect(envConfig.MONGO_URI, { serverSelectionTimeoutMS: 10000 });
    console.log(`Connected to MongoDB`);
    return mongoose.connection;

  } catch (error) {
    throw error;
  }
};

export default connectToDb;
