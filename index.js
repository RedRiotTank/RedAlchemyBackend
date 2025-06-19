import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import {
  getAllElements,
  getBaseElements,
  proposeElement,
} from "./controllers/elementController.js";
import { findFusion, proposeFusion } from "./controllers/fusionController.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const allowedOrigins = [
  "http://localhost:4321",
  "https://redalchemy.redriottank.com",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "OPTIONS"],
    credentials: true,
  })
);

app.options("*", cors());

app.use((req, res, next) => {
  console.log("Request received:", req.method, req.url);
  next();
});

app.use(express.json());

app.use((req, res, next) => {
  console.log("Request received:", req.method, req.url);
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

// Routes
app.get("/elements", getAllElements);
app.get("/elements/base", getBaseElements);
app.get("/fusion", findFusion);
app.post("/elements/propose", proposeElement);
app.post("/fusion/propose", proposeFusion);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
