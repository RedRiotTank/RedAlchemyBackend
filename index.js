import express from "express";
import dotenv from "dotenv";
import {
  getAllElements,
  getBaseElements,
  proposeElement,
} from "./controllers/elementController.js";
import { findFusion, proposeFusion } from "./controllers/fusionController.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Routes
app.get("/elements", getAllElements);
app.get("/elements/base", getBaseElements);
app.get("/fusion", findFusion);
app.post("/elements/propose", proposeElement);
app.post("/fusion/propose", proposeFusion);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
