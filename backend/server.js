require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyparser = require("body-parser");

const uploadRoutes = require("./controllers/Uploadcontrollers.js");
const db = require("./models/product.js");
const app = express();

app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

app.use("/api", uploadRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  //  await db.sequelize.sync({ alter: true });
});
