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
const main_router = require("./server/routes/mainRoutes");
const userRoutes = require("./server/routes/userRoutes");


app.use("/", main_router);
app.use("/", userRoutes);

// running the server
app.listen(PORT, () => {
  console.log(`Starting servvice at port ${PORT}`);
});
