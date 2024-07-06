import User from "../models/user.model.js";
import AppError from "../utils/error.util.js";
import jwt from "jsonwebtoken";

export const isLoggedIn = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new AppError("Unauthenticated, please login", 404));
  }

  const userDetails = await jwt.verify(token, process.env.JWT_SECRET);

  req.user = userDetails;

  next();
};

export const authorizedRoles =
  (...roles) =>
  async (req, res, next) => {
    if (
      req.user.role !== "ADMIN" &&
      req.user.subscription.status !== "active"
    ) {
      return next(new AppError("Please subscribe to access this route.", 403));
    }

    next();
  };

export const authorizedSubscriber = async (req, res, next) => {
  const user = await User.findById(req.user.id);

  if (user.role !== "ADMIN" && user.subscription.status !== "active") {
    return next(new AppError("Subscribe to access this route", 403));
  }

  next();
};
