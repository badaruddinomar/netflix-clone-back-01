const mongoose = require("mongoose");

const watchSchema = new mongoose.Schema(
  {
    usermail: {
      type: String,
      required: true,
    },
    movies: Array,
  },
  { timestamps: true }
);

const WatchList = mongoose.model("WatchList", watchSchema);
module.exports = WatchList;
