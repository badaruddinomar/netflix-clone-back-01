const WatchList = require("../models/watchListModel");

exports.createWatchList = async (req, res) => {
  try {
    const { usermail, movieData } = req.body;
    let movieList = [];
    movieList.push(movieData);

    const watchListDoc = await WatchList.findOne({ usermail });
    if (watchListDoc) {
      const isMoviesExist = watchListDoc.movies.find((item) => {
        return (
          item.backdrop_path === req.body.backdrop_path ||
          item.poster_path === req.body.poster_path
        );
      });

      if (isMoviesExist)
        return res
          .status(404)
          .json({ message: "Movie already added to watchlist" });
      watchListDoc.movies.push(movieData);
      await watchListDoc.save();
    } else {
      const newWatchListDoc = new WatchList({
        usermail,
        movies: movieList,
      });
      await newWatchListDoc.save();
    }

    res.status(200).json({
      success: true,
      message: "Movie added to watchList successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};
// get movie lists using user email--
exports.getMovieList = async (req, res) => {
  try {
    const { usermail } = req.body;
    const watchList = await WatchList.findOne({ usermail });
    res.status(200).json({
      success: true,
      data: watchList,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

// delete user watch list --
exports.deleteWatchList = async (req, res) => {
  try {
    const { usermail, backdrop_path, poster_path } = req.body;
    const watchList = await WatchList.findOne({ usermail });
    watchList.movies = watchList.movies.filter((item) => {
      return (
        item.backdrop_path !== backdrop_path && item.poster_path !== poster_path
      );
    });
    await watchList.save();

    res.status(200).json({
      success: true,
      message: "Movies deleted from watchlist successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};
