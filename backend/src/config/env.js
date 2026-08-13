import "dotenv/config";

export const envConfig={
    PORT: Number(process.env.PORT || 5000),
    FRONTEND_URL: process.env.FRONTEND_URL || "http://localhost:5173",
    JWT_SECRET: process.env.JWT_SECRET,
    MONGO_URI: process.env.MONGO_URI,
};

const requiredEnvVar = ["JWT_SECRET", "MONGO_URI"];

requiredEnvVar.forEach((key) => {
  if (!envConfig[key]) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
});