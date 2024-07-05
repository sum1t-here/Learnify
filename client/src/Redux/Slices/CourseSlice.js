import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from "../../helpers/axiosInstance";

const initialState = {
  courseData: [],
};

export const getAllCourses = createAsyncThunk("course/get", async () => {
  try {
    const response = axiosInstance.get("course");
    toast.promise(response, {
      loading: "Loading course data",
      success: "Courses loaded successfully",
      error: "Failed to get the courses",
    });
    return (await response).data.courses;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});

const courseSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

export default courseSlice.reducer;
