import { Router } from "express";
import { createFeedback,getFeedbackForItem} from "../controllers/feedback.controller.js";

const router = Router();

router.route("/create-feedback/:id").post(createFeedback);
router.route("/get-feedback/:itemId/:itemType").get(getFeedbackForItem);


export default router;
