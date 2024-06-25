import { Router } from "express";
import {
  createSeries,
  deleteSeries,
  getSeries,
  updateSeries,
} from "../controllers/series.controller.js";

const router = Router();

router.route("/create-series").post(createSeries);
router.route("/get-series").get(getSeries);
router.route("/update-series/:id").put(updateSeries);
router.route("/delete-series/:id").delete(deleteSeries);

export default router;
