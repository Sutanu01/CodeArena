import dotenv from "dotenv"
dotenv.config();
import { clerkMiddleware } from "@clerk/express";
import { corsOptions } from "./constants/configs.js";
import { ErrorHandler } from "./middlewares/error.js";
import { fetchAndStoreQuestionsWeekly } from "./utils/utility.js";
import express from "express"
import { createServer } from "http";
import { Server } from "socket.io";
import { socketSetup } from "./socket.js";
import cors,{CorsOptions} from "cors";
import { connectToDatabase } from "./utils/db.js";
import UserRoute from "./routes/UserRoute.js"
import CodeForcesRoute from "./routes/CodeForcesRoute.js"
import Features from "./routes/Features.js";

const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors:corsOptions as CorsOptions
});
app.use(cors(corsOptions as CorsOptions));
app.use(express.json());
app.use(clerkMiddleware({
     publishableKey: process.env.CLERK_PUBLISHABLE_KEY || "",
     secretKey: process.env.CLERK_SECRET_KEY || "",
}));
app.use(express.urlencoded({ extended: true }));
app.use(ErrorHandler);




await connectToDatabase();
fetchAndStoreQuestionsWeekly();

socketSetup(io);


app.get('/', (req, res) => {
    res.send("Hello World!");
});
app.use('/api/user', UserRoute)
app.use('/api/cf', CodeForcesRoute)
app.use('/api/features', Features)



app.listen(5000, () => {
    console.log("Server is running on port 5000");
});