import { Router } from "express";
import {
  addLecturesByCourseId,
  createCourse,
  deleteCourse,
  deleteLecturesByCourseId,
  getAllCourses,
  getLecturesByCourseId,
  updateCourse,
} from "../controllers/course.controller.js";
import upload from "../middlewares/multer.middleware.js";
import {
  authorizedRoles,
  authorizedSubscriber,
  isLoggedIn,
} from "../middlewares/authMiddleware.js";

const router = Router();

router
  .route("/")
  .get(getAllCourses)
  .post(
    isLoggedIn,
    authorizedRoles("ADMIN"),
    upload.single("thumbnail"),
    createCourse
  );
router
  .route("/:id")
  .get(isLoggedIn, authorizedSubscriber, getLecturesByCourseId)
  .put(isLoggedIn, authorizedRoles("ADMIN"), updateCourse)
  .delete(isLoggedIn, authorizedRoles("ADMIN"), deleteCourse)
  .post(isLoggedIn, authorizedRoles("ADMIN"), addLecturesByCourseId)
  .delete(isLoggedIn, authorizedRoles("ADMIN"), deleteLecturesByCourseId);

export default router;
