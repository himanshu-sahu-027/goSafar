import http from "http";

import app from "./src/app.js";
import connectToDb from "./src/config/db.js";
import { envConfig } from "./src/config/env.js";
import { connectToRedis } from "./src/config/redis.js";
import { initializeSocket } from "./src/socket.js";

const startServer = async () => {
  try {
    await connectToDb();

    await connectToRedis();

    const server = http.createServer(app);

    initializeSocket(server);

    server.listen(envConfig.PORT, () => {
      console.log(`Server running on port ${envConfig.PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();