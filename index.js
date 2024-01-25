const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const helmet = require("helmet");
const compression = require("compression");
const watchListRoutes = require("./routes/watchListRouts");
const cors = require("cors");
const frontendUrl = process.env.FRONTEND_URL;

const app = express();
const corsOptions = {
  origin: frontendUrl,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  // optionsSuccessStatus: 204,
  optionsSuccessStatus: 200,
  allowedHeaders: "Content-Type,Authorization",
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(helmet());
app.use(compression());

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
