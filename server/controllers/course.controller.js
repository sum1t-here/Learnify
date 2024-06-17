import Course from "../models/course.model.js"
import AppError from "../utils/error.util.js";

export const getAllCourses = async(req, res, next) => {
    try {
        const courses = await Course.find({}).select('-lectures');

        res.status(200).json({
            success: true,
            message: 'All courses',
            courses
        });
    } catch (err) {
        return next(new AppError(err))
    }
    
}

export const getLecturesByCourseId = async(req,res,next) => {
    try {
        const {id} = req.params;
        const course = await Course.findById(id);
        res.status(200).json({
            success: true,
            message: 'Course Lecture Fetched Successfully',
            lectures: course.lectures
        })
    } catch (err) {
        return next(new AppError(err));
    }
}