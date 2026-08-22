import { createClient } from "redis";
import { envConfig } from "./env.js";

const redisClient = createClient({
    url: envConfig.REDIS_URL,

    socket: {
        reconnectStrategy: (retries) => {

            // Exponential backoff with a maximum delay of 6 seconds.
            // Redis will keep retrying until the connection succeeds.
            const delay = Math.min(250 * 2 ** retries, 6000);

            console.log(
                `Redis reconnecting... attempt ${retries + 1} in ${delay}ms`
            );

            return delay;
        },
    },
});


// Redis error listener
redisClient.on("error", (error) => {
    console.error("Redis Client Error:", error.message);
});


// Fired when the client starts connecting
redisClient.on("connect", () => {
    console.log("Redis connecting...");
});


// Fired when Redis is ready to execute commands
redisClient.on("ready", () => {
    console.log("Redis connected and ready");
});


// Fired when node-redis is attempting reconnection
redisClient.on("reconnecting", () => {
    console.log("Redis reconnecting...");
});


// Fired when the connection is completely closed
redisClient.on("end", () => {
    console.log("Redis connection closed");
});


/**
 * Connect to Redis.
 */
// Redis is an optional dependency. Failure to connect will not stop the application.
async function connectToRedis() {
    // Already ready
    if (redisClient.isReady) {
        return redisClient;
    }

    // Already connecting/reconnecting
    if (redisClient.isOpen) {
        return redisClient;
    }

    try {
        await redisClient.connect();

        return redisClient;
    } catch (error) {
        console.error(
            "Redis connection failed:",
            error.message
        );

        return null;
    }
}


export {
    redisClient,
    connectToRedis,
};