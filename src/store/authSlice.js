import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AuthService from "../api/authService";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const token = Cookies.get("authToken") || sessionStorage.getItem("authToken");
let initialState;

if (token) {
  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    if (decodedToken.exp > currentTime) {
      initialState = { isLoggedIn: true, user: decodedToken, error: null };
    } else {
      Cookies.remove("authToken");
      initialState = { isLoggedIn: false, user: null, error: null };
    }
  } catch (error) {
    initialState = { isLoggedIn: false, user: null, error: null };
  }
} else {
  initialState = { isLoggedIn: false, user: null, error: null };
}

export const login = createAsyncThunk(
  "auth/login",
  async (authData, thunkApi) => {
    try {
      const response = await AuthService.login(
        authData.email,
        authData.password,
        authData.isRememberMe,
      );

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
        const decodedToken = jwtDecode(action.payload.data.token);
        state.user = decodedToken;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoggedIn = false;
        state.user = null;
        state.error = action.payload;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoggedIn = false;
        state.user = null;
        state.error = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.isLoggedIn = true;
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;
