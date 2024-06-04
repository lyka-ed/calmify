import mongoose from "mongoose";
import { ENVIRONMENT } from "./environment";

export const connectDB = async () => {
  try {
    const connect = await mongoose.connect(ENVIRONMENT.DB.URL, {
      useUnifiedTopology: true,
      newUserUrlParser: true,
    });

    console.log("Database Connected" + connect.connectiom.host);
  } catch (error) {
    console.log("Error: " + error.message);
    process.exit(1);
  }
};
