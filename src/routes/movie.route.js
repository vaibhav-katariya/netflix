import { Router } from "express";
import { getMovie } from "../controllers/movie.controller.js";

const router = Router();

router.route("/movieList").get(getMovie);

export default router;
