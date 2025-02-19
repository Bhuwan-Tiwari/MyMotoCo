require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const ProductControllers = require("./controllers/Productcontrollers.js");
const db = require("./models/product.js");
const app = express();

app.use(cors());
app.use(bodyParser.json()); // Enable JSON body parsing
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(express.json()); // Enable JSON body parsing

app.use("/api", ProductControllers);

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  //  await db.sequelize.sync({ alter: true });
});
