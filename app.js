// for loading environment variable
require("dotenv").config();

//  for server
const express = require("express");
const app = express();
const PORT = 5000;

app.use(express.json());

// connecting to database
const connectDB = require("./server/database/config/db");
connectDB();

// router configurations
const main_router = require("./server/routes/main_route");
app.use("/", main_router);

// running the server
app.listen(PORT, () => {
  console.log(`Starting servvice at port ${PORT}`);
});
