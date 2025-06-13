import cors, { CorsOptions } from "cors";
import dotenv from "dotenv";
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { corsOptions } from "./constants/configs.js";
import { handleClerkUserChange } from "./controllers/user.js";
import { ErrorHandler } from "./middlewares/error.js";
import CodeForcesRoute from "./routes/CodeForcesRoute.js";
import Features from "./routes/Features.js";
import UserRoute from "./routes/UserRoute.js";
import { socketSetup } from "./socket.js";
import { connectToDatabase } from "./utils/db.js";
import { fetchAndStoreQuestionsWeekly } from "./utils/utility.js";
dotenv.config();

const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors:corsOptions as CorsOptions
});

app.use(cors(corsOptions as CorsOptions));
app.post(
    "/api/webhooks/clerk",
    express.raw({ type: "application/json" }),
    handleClerkUserChange
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(ErrorHandler);



// await connectToDatabase();
// fetchAndStoreQuestionsWeekly();


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