const express = require("express");
require("dotenv").config();
const elementController = require("./controllers/elementController");
const fusionController = require("./controllers/fusionController");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Rutas
app.get("/elements", elementController.getAllElements);
app.get("/fusion", fusionController.findFusion);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
