import { Movie } from "../models/movie.model.js";

const createMovie = async (req, res) => {
  try {
    const { title, description, rating } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        message: "Please provide all required fields",
      });
    }

    const newMovie = await Movie.create({
      title,
      description,
      rating,
    });

    const createdMovie = await Movie.findById(newMovie?._id);

    if (!createMovie) {
      return res.status(500).json({
        message: "Failed to create movie",
      });
    }

    res.status(200).json({
      message: "Movie created successfully",
      createdMovie,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Failed to get movie",
    });
  }
};

const getMovie = async (req, res) => {
  try {
    const allMovies = await Movie.find();

    if (!allMovies) {
      return res.status(400).json({
        message: "No movies found",
      });
    }

    res.status(200).json({
      message: "Movies fetched successfully",
      allMovies,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Failed to get movie",
    });
  }
};

const updateMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    const movie = Movie.findById(id);

    if (!movie) {
      return res.status(404).json({
        message: "movie not found",
      });
    }

    const updateMovie = await Movie.findByIdAndUpdate(
      id,
      {
        title,
        description,
      },
      { new: true }
    );

    const updated_movie = await Movie.findById(updateMovie?._id);

    if (!updated_movie) {
      return res.status(400).json({
        message: "Failed to update movie",
      });
    }

    res.status(200).json({
      message: "movie updated successfully",
      updated_movie,
    });
  } catch (error) {
    console.log("error while updating the movie", error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const deleteMovie = async (req, res) => {
  try {
    const { id } = req.params;

    const movie = await Movie.findById(id);

    if (!movie) {
      return res.status(404).json({
        message: "Movie not found",
      });
    }

    await Movie.findByIdAndDelete(id);

    res.status(200).json({
      message: "Movie deleted successfully",
    });
  } catch (error) {
    console.log("error while deleting the Movie", error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export { getMovie, createMovie, updateMovie, deleteMovie };
