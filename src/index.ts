import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import mongoose from "mongoose";

import router from "./router";

const app = express();

app.use(
  cors({
    credentials: true,
    origin: true,
  })
);

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());
//app.use(express.json());

const server = http.createServer(app);

server.listen(8080, () => {
  console.log("server running on pot 8080");
});

const MONGO_URL =
  "mongodb+srv://josephinezayawe69:inezayawe12@cluster5.1rpjiom.mongodb.net/?retryWrites=true&w=majority&appName=Cluster5";
console.log("connected successfully");

mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);

mongoose.connection.on("error", (error: Error) => console.log(error));
mongoose.connection.once("open", () => {
  console.log("✅ MongoDB connected successfully!");
});

app.post("/test", (req, res) => {
  console.log("Test route hit. Body:", req.body);
  res.json({ received: req.body });
});

app.use("/", router());

console.log("all set");
