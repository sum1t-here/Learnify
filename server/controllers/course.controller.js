import Course from "../models/course.model.js";
import AppError from "../utils/error.util.js";
import cloudinary from "cloudinary";
import fs from "fs/promises";
import path from "path";

export const getAllCourses = async (req, res, next) => {
  try {
    const courses = await Course.find({}).select("-lectures");

    res.status(200).json({
      success: true,
      message: "All courses",
      courses,
    });
  } catch (err) {
    return next(new AppError(err));
  }
};

export const getLecturesByCourseId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const course = await Course.findById(id);
    res.status(200).json({
      success: true,
      message: "Course Lecture Fetched Successfully",
      lectures: course.lectures,
    });
  } catch (err) {
    return next(new AppError(err));
  }
};

/**
 * @CREATE_COURSE
 * @ROUTE @POST {{URL}}/api/v1/course
 * @ACCESS Private (admin only)
 */

export const createCourse = async (req, res, next) => {
  try {
    const { title, description, category, createdBy } = req.body;

    if (!title || !description || !category || !createdBy) {
      return next(new AppError("All fields are required", 400));
    }

    const course = await Course.create({
      title,
      description,
      category,
      createdBy,
    });

    if (!course) {
      return next(new AppError("Course not created, PLease try again !", 404));
    }

    if (req.file) {
      const result = await cloudinary.v2.uploader.upload(req.file.path, {
        folder: "lms",
        timeout: 60000, // increase the timeout to 60 seconds
      });
      if (result) {
        course.thumbnail.public_id = result.public_id;
        course.thumbnail.secure_url = result.secure_url;
      }

      fs.rm(`uploads/${req.file.filename}`);
    }
    await course.save();
    res.status(200).json({
      success: true,
      message: "Course created successfully !!!",
      course,
    });
  } catch (err) {
    console.log(err);
    // Empty the uploads directory without deleting the uploads directory
    for (const file of await fs.readdir("uploads/")) {
      await fs.unlink(path.join("uploads/", file));
    }

    return next(new AppError(err.message, 404));
  }
};

export const updateCourse = async (req, res, next) => {
  try {
    const { id } = req.params;
    const course = await Course.findByIdAndUpdate(
      { id },
      {
        $set: req.body,
      },
      {
        runValidators: true,
      }
    );

    if (!course) {
      return next(new AppError("Invalid course id or course not found.", 400));
    }

    res.status(200).json({
      success: true,
      message: "Course updated successfully",
    });
  } catch (err) {
    return next(new AppError(err.message, 404));
  }
};

export const deleteCourse = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Finding the course via the course ID
    const course = await Course.findById(id);

    // If course not find send the message as stated below
    if (!course) {
      return next(new AppError("Course with given id does not exist.", 404));
    }

    // Remove course
    await course.deleteOne();

    // Send the message as response
    res.status(200).json({
      success: true,
      message: "Course deleted successfully",
    });
  } catch (err) {
    return next(new AppError(err, 404));
  }
};

export const addLecturesByCourseId = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    const { id } = req.params;

    if (!title || !description) {
      return next(new AppError("All fields are required", 400));
    }

    const course = await Course.findById(id);

    if (!course) {
      return next(new AppError("Course doesnot exist", 403));
    }

    const lectureData = {
      title,
      description,
    };

    if (req.file) {
      const result = await cloudinary.v2.uploader.upload(req.file.path, {
        folder: "lms", // Save files in a folder named lms
        chunk_size: 50000000, // 50 mb size
        resource_type: "video",
      });
      if (result) {
        // Set the public_id and secure_url in array
        lectureData.public_id = result.public_id;
        lectureData.secure_url = result.secure_url;
      }

      // After successful upload remove the file from local storage
      fs.rm(`uploads/${req.file.filename}`);
    }
    course.lectures.push({
      title,
      description,
      lecture: lectureData,
    });

    course.numberOfLectures = course.lectures.length;

    // Save the course object
    await course.save();

    console.log(course);

    res.status(200).json({
      success: true,
      message: "Course lecture added successfully",
      course,
    });
  } catch (err) {
    // Empty the uploads directory without deleting the uploads directory
    for (const file of await fs.readdir("uploads/")) {
      await fs.unlink(path.join("uploads/", file));
    }
    console.log(err);
    return next(new AppError(err, 404));
  }
};

export const deleteLecturesByCourseId = async (req, res, next) => {
  try {
    const { courseId, lectureId } = req.query;

    console.log(courseId, lectureId);

    // Checking if both courseId and lectureId are present
    if (!courseId) {
      return next(new AppError("Course ID is required", 400));
    }

    if (!lectureId) {
      return next(new AppError("Lecture ID is required", 400));
    }

    // Find the course uding the courseId
    const course = await Course.findById(courseId);

    // If no course send custom message
    if (!course) {
      return next(new AppError("Invalid ID or Course does not exist.", 404));
    }

    // Find the index of the lecture using the lectureId
    const lectureIndex = course.lectures.findIndex(
      (lecture) => lecture._id.toString() === lectureId.toString()
    );

    // If returned index is -1 then send error as mentioned below
    if (lectureIndex === -1) {
      return next(new AppError("Lecture does not exist.", 404));
    }

    // Delete the lecture from cloudinary
    await cloudinary.v2.uploader.destroy(
      course.lectures[lectureIndex].lecture.public_id,
      {
        resource_type: "video",
      }
    );

    // Remove the lecture from the array
    course.lectures.splice(lectureIndex, 1);

    // update the number of lectures based on lectres array length
    course.numberOfLectures = course.lectures.length;

    // Save the course object
    await course.save();

    // Return response
    res.status(200).json({
      success: true,
      message: "Course lecture removed successfully",
    });
  } catch (err) {
    return next(new AppError(err, 404));
  }
};
