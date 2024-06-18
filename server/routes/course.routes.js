import {Router} from 'express';
import { createCourse, deleteCourse, deleteLecturesByCourseId, getAllCourses, getLecturesByCourseId, updateCourse } from '../controllers/course.controller.js';
import upload from "../middlewares/multer.middleware.js";
import {authorizedRoles, isLoggedIn} from "../middlewares/authMiddleware.js"

const router = Router();

router.route('/')
      .get(getAllCourses)
      .post(isLoggedIn,authorizedRoles("ADMIN"),upload.single("thumbnail"),createCourse);
router.route('/:id')
      .get(isLoggedIn,getLecturesByCourseId)
      .put(isLoggedIn,authorizedRoles("ADMIN"),updateCourse)
      .delete(isLoggedIn,authorizedRoles("ADMIN"),deleteCourse)
      .post(isLoggedIn, authorizedRoles("ADMIN"),getLecturesByCourseId)
      .delete(isLoggedIn,authorizedRoles("ADMIN"),deleteLecturesByCourseId);

export default router;
