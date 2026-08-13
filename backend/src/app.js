import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import { envConfig } from "./config/env.js";

const app = express();

app.get("/", (req,res) => {
    res.send("Hello world");
})
export default app;