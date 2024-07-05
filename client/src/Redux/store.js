import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "./Slices/AuthSlice";
import courseSlice from "./Slices/CourseSlice";

const store = configureStore({
  reducer: {
    auth: authSliceReducer,
    course: courseSlice,
  },
  devTools: true,
});

export default store;
