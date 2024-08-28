import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AuthService from "../api/authService";

const user = JSON.parse(localStorage.getItem("user"));

export const login = createAsyncThunk(
  "auth/login",
  async (authData, thunkApi) => {
    try {
      const response = await AuthService.login(
        authData.email,
        authData.password,
      );

      console.log(response);

      return response;
    } catch (err) {
      return thunkApi.rejectWithValue(err.message);
    }
  },
);

const initialState = user
  ? { isLoggedIn: true, user }
  : { isLoggedIn: false, user: null };

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoggedIn = false;
        state.error = null;
      });
  },
});

export default authSlice.reducer;
