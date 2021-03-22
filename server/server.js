import express from "express";
import cors from "cors";
import connectDB from "./configs/db";
import authRoute from "./routes/authRoute";
import videoRoute from "./routes/videoRoute";
import { errorHandler } from "./middlewares/errorHandler";

connectDB();
let app = express();

// allow request from frontend to backend
app.use(cors());

// Body parse
app.use(express.json());

// if(process.env.NODE_ENV === "production") {
//   app.use(express.static("client/build"));
// }

// Mount routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/video", videoRoute);

// Handle error
app.all("*", (req, res, next) => {
  const err = new Error("The route can not be found");
  err.statusCode = 404;
  next(err) ;
})
app.use(errorHandler);

let port = process.env.PORT || 5000;

app.listen(port,() => {
  console.log(`Hello VAGABOND, I'm running at PORT: ${port}`);
});
