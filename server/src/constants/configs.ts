import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
import { CorsOptions } from "cors";
const corsOptions :CorsOptions = {
  origin: [
    process.env.CLIENT_URL as string,
    "http://localhost:4000",
    "http://localhost:8000",
    "http://localhost:5173",
    "http://localhost:4173",
    "http://localhost:3000",
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
};


export { corsOptions };