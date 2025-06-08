import dotenv from "dotenv"
dotenv.config();
import { clerkMiddleware } from "@clerk/express";
import { corsOptions } from "./constants/configs.js";
import { ErrorHandler } from "./middlewares/error.js";
import express from "express"
import cors,{CorsOptions} from "cors";
import { connectToDatabase } from "./utils/db.js";
import UserRoute from "./routes/UserRoute.js"


const app = express();
app.use(cors(corsOptions as CorsOptions));
app.use(express.json());
app.use(clerkMiddleware({
     publishableKey: process.env.CLERK_PUBLISHABLE_KEY || "",
     secretKey: process.env.CLERK_SECRET_KEY || "",
}));
app.use(express.urlencoded({ extended: true }));
app.use(ErrorHandler);

connectToDatabase();


app.get('/', (req, res) => {
    res.send("Hello World!");
});

app.use('/api/user', UserRoute)






app.listen(5000, () => {
    console.log("Server is running on port 5000");
});