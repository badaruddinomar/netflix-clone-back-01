const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const helmet = require("helmet");
const compression = require("compression");
const watchListRoutes = require("./routes/watchListRouts");

const app = express();
app.use(express.json());
app.use(helmet());
app.use(compression());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
// mongodb connection--
mongoose
  .connect(process.env.DB)
  .then(() => {
    console.log("DB connection established");
  })
  .catch(() => {
    console.log("server connection error");
  });

// routes--
app.get("/", (req, res) => {
  res.send("Hello World");
});
app.use("/watchList", watchListRoutes);

// create server--
const server = app.listen(process.env.PORT || 4000, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
