import cors, { CorsOptions } from "cors";
import dotenv from "dotenv";
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import helmet from "helmet";
import { clerkMiddleware } from "@clerk/express";
import { corsOptions } from "./constants/configs.js";
import { handleClerkUserChange } from "./controllers/user.js";
import { ErrorHandler } from "./middlewares/error.js";
import CodeForcesRoute from "./routes/CodeForcesRoute.js";
import Features from "./routes/Features.js";
import Practice from "./routes/Practice.js";
import UserRoute from "./routes/UserRoute.js";
import { socketSetup } from "./socket.js";
import initialiseCronJobs from "./utils/cron-jobs.js";
import { connectToDatabase } from "./utils/db.js";
import { getRedisClient, closeRedis } from "./config/redis.js";
import { initSubmissionWorker, closeSubmissionWorker } from "./queues/submission.queue.js";
dotenv.config();

if (!process.env.JUDGE0_API_KEY || !process.env.JUDGE0_API_URL || !process.env.CLERK_SECRET_KEY || !process.env.CLERK_PUBLISHABLE_KEY || !process.env.CLERK_WEBHOOK_SIGNING_SECRET) {
  console.error("CRITICAL ERROR: Missing required configuration variables (JUDGE0_API_KEY, JUDGE0_API_URL, CLERK_SECRET_KEY, CLERK_PUBLISHABLE_KEY, CLERK_WEBHOOK_SIGNING_SECRET)");
  process.exit(1);
}

if (!process.env.REDIS_URL) {
  console.error("CRITICAL ERROR: REDIS_URL environment variable is not set.");
  process.exit(1);
}


const app = express();
app.use(helmet());
const server = createServer(app);
app.use(cors(corsOptions as CorsOptions));
const io = new Server(server, {
cors:corsOptions as CorsOptions
});
app.post(
    "/api/webhooks/clerk",
    express.raw({ type: "application/json" }),
    handleClerkUserChange
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(clerkMiddleware());



const redis = getRedisClient();
await redis.connect();

await connectToDatabase();
await socketSetup(io);

const submissionWorker = initSubmissionWorker();

initialiseCronJobs();


app.get('/', (req, res) => {
    res.send("Hello World!");
});
app.use('/api/user', UserRoute)
app.use('/api/cf', CodeForcesRoute)
app.use('/api/features', Features)
app.use('/api/practice', Practice)
app.use(ErrorHandler);


const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


async function gracefulShutdown(signal: string) {
  console.log(`\n[Server] Received ${signal}. Shutting down gracefully...`);
  server.close(() => {
    console.log("[Server] HTTP server closed.");
  });
  await closeSubmissionWorker();
  await closeRedis();

  console.log("[Server] All connections closed. Exiting.");
  process.exit(0);
}
process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
process.on("SIGINT", () => gracefulShutdown("SIGINT"));