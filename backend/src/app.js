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
import captainRouter from "./routes/captain.routes.js";
import mapRouter from "./routes/map.routes.js";
import rideRouter from "./routes/ride.routes.js";
import paymentRouter from "./routes/payment.routes.js";
// use routes

app.use('/users', userRouter);
app.use('/captains', captainRouter);
app.use('/maps', mapRouter);
app.use('/rides', rideRouter);
app.use('/payments', paymentRouter);

app.get("/", (req,res) => {
    res.send("Health check ok");
})


export default app;