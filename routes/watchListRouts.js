const express = require("express");
const {
  createWatchList,
  deleteWatchList,
  getMovieList,
} = require("../controllers/watchListController");
const router = express.Router();

router.route("/create").put(createWatchList);
router.route("/delete").post(deleteWatchList);
router.route("/movies").post(getMovieList);

module.exports = router;
