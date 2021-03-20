import express from "express";
import cors from "cors";
import connectDB from "./configs/db";
import authRoute from "./routes/authRoute";
import videoRoute from "./routes/videoRoute";
// require('dotenv').config();

connectDB();
let app = express();

// allow request from frontend to backend
app.use(cors());

// Body parse
app.use(express.json());

// Mount routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/video", videoRoute);

let hostname = process.env.APP_HOST;
let port = process.env.APP_PORT;

app.listen(port,hostname,() => {
  console.log(`Hello VAGABOND, I'm running at ${hostname}:${port}/`);
});