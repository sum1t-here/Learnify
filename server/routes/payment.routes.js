import { Router } from "express";
import {
  allPayment,
  buySubscription,
  cancelSubscription,
  getRazorpayKey,
  verifySubscription,
} from "../controllers/payment.controller.js";
import { authorizedRoles, isLoggedIn } from "../middlewares/authMiddleware.js";

const router = Router();

router.route("/razorpay-key").get(isLoggedIn, getRazorpayKey);
router.route("/subscribe").post(isLoggedIn, buySubscription);
router.route("/verify").post(isLoggedIn, verifySubscription);
router.route("/unsubscribe").post(isLoggedIn, cancelSubscription);
router.route("/").get(isLoggedIn, authorizedRoles("ADMIN"), allPayment);

export default router;
