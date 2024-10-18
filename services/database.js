import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

// const memoryServer = await MongoMemoryServer.create();
mongoose.set("strictQuery", false);

// const { DATABASE_URL, DATABASE_NAME } = process.env;

const DATABASE_URL = "mongodb+srv://personalemail8000:SirUPUcchBtIu3wM@skyshow.yqgndns.mongodb.net/"
const DATABASE_NAME = "SkyshowT"

export const connect = async (uri, dbName) => {
  if (mongoose.connection.readyState === 0) {
    mongoose.connect(uri, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
      dbName,
    });
    console.log("Connected to database");
  }
};

export const connectDB = async (dbName = DATABASE_NAME) => {
  await connect(DATABASE_URL, dbName);
};

export const disconnect = async () => {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }
};
