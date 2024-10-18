import server from "./src/server.js";
import dotenv from "dotenv";
import { connectDB } from "./src/services/database.js";

// const  { PORT }  = process.env || "8552"

const PORT = "8552";

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
