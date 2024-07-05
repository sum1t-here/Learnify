import { Router } from "express";
import { contactUs } from "../controllers/misc.controller.js";

const router = new Router();

router.route("/contacts").post(contactUs);

export default router;
