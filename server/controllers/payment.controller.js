import User from "../models/user.model";
import AppError from "../utils/error.util.js";
import crypto from "crypto";
import { razorpay } from "../server.js";
import Payment from "../models/payment.model.js";

export const getRazorpayKey = async (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      message: "Razorpay API key",
      key: process.env.RAZORPAY_KEY_ID,
    });
  } catch (err) {
    return next(new AppError(err));
  }
};

export const buySubscription = async (req, res, next) => {
  try {
    const { id } = req.user;
    const user = await User.findById(id);

    if (!user) {
      return next(new AppError("Unauthorised, Please login"));
    }

    if (user.role == "ADMIN") {
      return next(new AppError("ADMIN cannot purchase subscription", 403));
    }

    const subscription = await razorpay.subscriptions.create({
      plan_id: process.env.RAZORPAY_PLAN_ID,
      customer_notify: 1,
    });

    user.subscription.id = subscription.id;
    user.subscription.status = subscription.status;

    await User.save();

    res.status(200).json({
      success: true,
      message: "Subscribed successfully",
      subscription_id: subscription.id,
    });
  } catch (err) {
    return next(new AppError(err));
  }
};

export const verifySubscription = async (req, res, next) => {
  try {
    const { id } = req.user;
    const {
      razorpay_payment_id,
      razorpay_signature,
      razorpay_subscription_id,
    } = req.body;
    const user = await User.findById(id);

    if (!user) {
      return next(new AppError("Unauthorised, Please login"));
    }

    if (user.role == "ADMIN") {
      return next(new AppError("ADMIN cannot purchase subscription", 403));
    }

    const subscriptionId = user.subscription.id;

    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(`${razorpay_payment_id}|${subscriptionId}`)
      .digest("hex");

    if (generatedSignature !== razorpay_signature) {
      return next(new AppError("Payment not verified", 500));
    }

    await Payment.create({
      razorpay_payment_id,
      razorpay_signature,
      razorpay_subscription_id,
    });

    (user.subscription.status = "active"), await user.save();

    res.status(200).json({
      success: true,
      message: "Payment verified successfully",
    });
  } catch (err) {
    return next(new AppError(err));
  }
};

export const cancelSubscription = async (req, res, next) => {
  try {
    const { id } = req.user;
    const user = await User.findById(id);

    if (user.role === "ADMIN") {
      return next(
        new AppError("Admin does not need to cannot cancel subscription", 400)
      );
    }

    const subscriptionId = user.subscription.id;

    try {
      const subscription = await razorpay.subscriptions.cancel(subscriptionId);

      user.subscription.status = subscription.status;

      await user.save();
    } catch (error) {
      // Returning error if any, and this error is from razorpay so we have statusCode and message built in
      return next(new AppError(error.error.description, error.statusCode));
    }

    // Finding the payment using the subscription ID
    const payment = await Payment.findOne({
      razorpay_subscription_id: subscriptionId,
    });

    // Getting the time from the date of successful payment (in milliseconds)
    const timeSinceSubscribed = Date.now() - payment.createdAt;

    // refund period which in our case is 14 days
    const refundPeriod = 14 * 24 * 60 * 60 * 1000;

    // Check if refund period has expired or not
    if (refundPeriod <= timeSinceSubscribed) {
      return next(
        new AppError(
          "Refund period is over, so there will not be any refunds provided.",
          400
        )
      );
    }
  } catch (err) {
    return next(new AppError(err));
  }
};

export const allPayment = async (req, res, next) => {
  try {
    const { count, skip } = req.query;

    // Find all subscriptions from razorpay
    const allPayments = await razorpay.subscriptions.all({
      count: count ? count : 10, // If count is sent then use that else default to 10
      skip: skip ? skip : 0, // // If skip is sent then use that else default to 0
    });

    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const finalMonths = {
      January: 0,
      February: 0,
      March: 0,
      April: 0,
      May: 0,
      June: 0,
      July: 0,
      August: 0,
      September: 0,
      October: 0,
      November: 0,
      December: 0,
    };

    const monthlyWisePayments = allPayments.items.map((payment) => {
      // We are using payment.start_at which is in unix time, so we are converting it to Human readable format using Date()
      const monthsInNumbers = new Date(payment.start_at * 1000);

      return monthNames[monthsInNumbers.getMonth()];
    });

    monthlyWisePayments.map((month) => {
      Object.keys(finalMonths).forEach((objMonth) => {
        if (month === objMonth) {
          finalMonths[month] += 1;
        }
      });
    });

    const monthlySalesRecord = [];

    Object.keys(finalMonths).forEach((monthName) => {
      monthlySalesRecord.push(finalMonths[monthName]);
    });

    res.status(200).json({
      success: true,
      message: "All payments",
      allPayments,
      finalMonths,
      monthlySalesRecord,
    });
  } catch (err) {
    return next(new AppError(err));
  }
};
