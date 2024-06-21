import { Router } from "express";
import { createMovie, deleteMovie, getMovie, updateMovie } from "../controllers/movie.controller.js";

const router = Router();

router.route("/movieList").get(getMovie);
router.route("/create-movie").post(createMovie);
router.route("/update-movie/:id").put(updateMovie);
router.route("/delete-movie/:id").delete(deleteMovie);

export default router;
