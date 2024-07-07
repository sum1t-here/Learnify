import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from "../../helpers/axiosInstance";

const initialState = {
  lectures: [],
};

export const getCourseLectures = createAsyncThunk(
  "course/lecture/id",
  async (course_id) => {
    try {
      const response = axiosInstance.get(`course/${course_id}`);
      toast.promise(response, {
        loading: "Fetching course lectures",
        success: "Lecture fetched successfully",
        error: "Failed to load the lectures",
      });
      return (await response).data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
);

export const addCourseLectures = createAsyncThunk(
  "course/lecture/add",
  async (data) => {
    try {
      const formData = new FormData();
      formData.append("lectures", data.lectures);
      formData.append("title", data.title),
        formData.append("description", data.descrption);
      const response = axiosInstance.get(`course/${data.id}`, formData);
      toast.promise(response, {
        loading: "Adding course lectures",
        success: "Lecture added successfully",
        error: "Failed to add the lectures",
      });
      return (await response).data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
);

export const deleteCourseLecture = createAsyncThunk(
  "course/delete",
  async (data) => {
    try {
      const response = axiosInstance.delete(
        `course?courseId=${data.id}&lectureId=${data.lectureId}`
      );
      toast.promise(response, {
        loading: "Deleting course ...",
        success: "Courses deleted successfully",
        error: "Failed to delete the courses",
      });

      return (await response).data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
);

const lectureSlice = createSlice({
  name: "lecture",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCourseLectures.fulfilled, (state, action) => {
        state.lectures = action?.payload?.lectures;
      })
      .addCase(addCourseLectures.fulfilled, (state, action) => {
        state.lectures = action?.payload?.course?.lectures;
      });
  },
});

export default lectureSlice.reducer;
