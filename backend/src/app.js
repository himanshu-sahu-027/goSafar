import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import { envConfig } from "./config/env.js";

const app = express();

app.use(
  cors({
    origin: envConfig.FRONTEND_URL,
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended : true }));
app.use(cookieParser());


// import routes
import userRouter from "./routes/user.routes.js";

// use routes

app.use('/api/user', userRouter);

app.get("/", (req,res) => {
    res.send("Hello world");
})


export default app;