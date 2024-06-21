import { Router } from "express";
import {
  createUser,
  deleteUser,
  getUserByName,
  updateUser,
} from "../controllers/user.controller.js";

const router = Router();

router.route("/create-account").post(createUser);
router.route("/getuser/:name").get(getUserByName);
router.route("/delete-user/:id").delete(deleteUser);
router.route("/update-user/:id").put(updateUser);

export default router;
