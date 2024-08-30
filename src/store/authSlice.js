import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AuthService from "../api/authService";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const token = Cookies.get("authToken") || sessionStorage.getItem("authToken");

const initialState = {
  isLoggedIn: !!token,
  userDetail: null,
  error: null,
};

export const fetchDetailUser = createAsyncThunk(
  "auth/detailUser",
  async (authData, thunkApi) => {
    try {
      const response = await AuthService.getUserDetail();

      return response;
    } catch (err) {
      return thunkApi.rejectWithValue(err.message);
    }
  },
);

export const login = createAsyncThunk(
  "auth/login",
  async (authData, thunkApi) => {
    try {
      const response = await AuthService.login(
        authData.email,
        authData.password,
        authData.isRememberMe,
      );

      thunkApi.dispatch(fetchDetailUser());

      return response;
    } catch (err) {
      return thunkApi.rejectWithValue(err.message);
    }
  },
);

export const logout = createAsyncThunk("auth/logout", async (_, thunkApi) => {
  try {
    const response = await AuthService.logout();

    console.log(response);

    return response;
  } catch (err) {
    return thunkApi.rejectWithValue(err.message);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoggedIn = false;
        state.userDetail = null;
        state.error = action.payload;
      })
      .addCase(fetchDetailUser.fulfilled, (state, action) => {
        state.isLoggedIn = false;
        state.userDetail = action.payload;
        state.error = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoggedIn = false;
        state.userDetail = null;
        state.error = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.isLoggedIn = true;
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;
