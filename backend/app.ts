import { config } from "./config.js";
import cookieParser from "cookie-parser";
import express from "express";
import router from "./routers/router.js";
import cors from "cors";

const app = express();

const originUrl = config.appMode === "DEV"
  ? "http://localhost:5173"
  : "https://frontendhanddraw.vercel.app";

app.use(express.json());
app.use(express.json({ limit: "25mb" }));
app.use(
  cors({
    origin: originUrl,
    credentials: true,
  }),
);

app.use(cookieParser());

app.use(router);
app.listen(config.port);
