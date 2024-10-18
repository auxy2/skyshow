import dotenv from "dotenv";
import server from "./server.js";
import { connectDB } from "./services/database.js";

// const  { PORT }  = process.env || "8552"

const PORT = "6843";

const serverStart = async () => {
  try {
    await connectDB();

    server.listen(PORT, () => {
      console.log(`⚡️[server]: Server is running on port ${PORT}`);
    });
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
};

serverStart();
