import { Router } from "express";
import {
  createFeedback,
  getFeedbackForItem,
  deleteFeedback,
} from "../controllers/feedback.controller.js";

const router = Router();

router.route("/create-feedback/:id").post(createFeedback);
router.route("/get-feedback/:itemId/:itemType").get(getFeedbackForItem);
router.route("/delete-feedback/:id").delete(deleteFeedback);

export default router;
