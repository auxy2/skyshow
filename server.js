import dotenv from "dotenv";
import express from "express";
import http from "http";
import cors from "cors"; 
import compression from "compression";
import paginator from "mongoose-paginate-v2";
import morgan from "morgan";
import helmet from "helmet";
// import { corsOptions } from "./base/cors.js";
import cookieParser from "cookie-parser";
import notFound from "./middlewares/notfound.js";

dotenv.config();
paginator.paginate.options = { lean: true, leanWithId: false };
import routes from "./routers/index.js";

const app = express();

app.use(compression());
app.use(cookieParser());
app.set("trust proxy", 1);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const server = http.createServer(app);


// app.use(cors(corsOptions));
app.use(morgan("tiny"));
app.use(helmet());

app.use("/api", routes);
app.use(notFound);

export default server;
