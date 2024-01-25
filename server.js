const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const mongoose = require("mongoose");
const helmet = require("helmet");
const compression = require("compression");
const watchListRoutes = require("./routes/watchListRouts");

const app = express();
app.use(express.json());
app.use(helmet());
app.use(compression());
app.use(cors({ origin: "*" }));
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
app.use("/watchList", watchListRoutes);

// create server--
const server = app.listen(process.env.PORT || 4000, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
