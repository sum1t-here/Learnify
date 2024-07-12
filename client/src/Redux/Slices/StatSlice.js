import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from "../../helpers/axiosInstance";

const initialState = {
  allUsersCount: 0,
  subscribedCount: 0,
  monthlySalesRecord: 0,
  allPayments: 0,
};

export const getStatsData = createAsyncThunk("stats/get", async () => {
  try {
    const response = axiosInstance.get("payments");
    toast.promise(response, {
      loading: "Getting user stats ...",
      success: (data) => {
        return data?.data?.message;
      },
      error: "Failed to load data",
    });
    return (await response).data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});

export const getAllUserCount = createAsyncThunk("user/get", async () => {
  try {
    const response = axiosInstance.get("user/get");
    toast.promise(response, {
      loading: "Getting user stats ...",
      success: (data) => {
        return data?.data?.message;
      },
      error: "Failed to load data",
    });
    return (await response).data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});

const statSlice = createSlice({
  name: "state",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getStatsData.fulfilled, (state, action) => {
        state.subscribedCount = action?.payload?.allPayments?.count || 0;
        state.monthlySalesRecord = action?.payload?.monthlySalesRecord || 0;
        state.allPayments = action?.payload?.allPayments;
      })
      .addCase(getAllUserCount.fulfilled, (state, action) => {
        state.allUsersCount = action?.payload?.count || 0;
      });
  },
});

export default statSlice.reducer;
