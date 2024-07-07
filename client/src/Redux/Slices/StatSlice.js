import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from "../../helpers/axiosInstance";

const initialState = {
  allUserCount: 0,
  subscriberCount: 0,
};

export const getStatsData = createAsyncThunk("stats/get", async () => {
  try {
    const response = axiosInstance.get("admin/stats/users");
    toast.promise(response, {
      loading: "Getting user stats ...",
      success: (data) => {
        return data?.data?.message;
      },
      error: "Failed to load data",
    });
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});

const statSlice = createSlice({
  name: "state",
  initialState,
  reducers: {},
  extraReducers: () => {},
});

export default statSlice.reducer;
