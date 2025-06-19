import express from "express";
import dotenv from "dotenv";
import {
  getAllElements,
  getBaseElements,
  proposeElement,
} from "./controllers/elementController.js";
import { findFusion, proposeFusion } from "./controllers/fusionController.js";

import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const allowedOrigins = [
  "http://localhost:4321",
  "https://redalchemy.redriottank.com",
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

// Routes
app.get("/elements", getAllElements);
app.get("/elements/base", getBaseElements);
app.get("/fusion", findFusion);
app.post("/elements/propose", proposeElement);
app.post("/fusion/propose", proposeFusion);

app.listen(PORT, "127.0.0.1", () => {
  console.log(`Backend listening on http://127.0.0.1:${PORT}`);
});
