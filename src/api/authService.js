import { axiosInstance } from "./axiosInstance";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const login = async (email, password, isRememberMe) => {
  try {
    const response = await axiosInstance.post("/auth/login", {
      email,
      password,
    });

    const { token } = response.data.data;

    if (token) {
      if (!isRememberMe) {
        sessionStorage.setItem("authToken", token);
      } else {
        const decodedToken = jwtDecode(token);
        const exp = decodedToken.exp;
        const expirationDate = new Date(exp * 1000);

        Cookies.set("authToken", token, {
          expires: expirationDate,
          secure: false,
          sameSite: "Strict",
        });
      }
    }

    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message || "Login failed");
    } else {
      throw new Error("An error occurred while logging in");
    }
  }
};

const logout = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      Cookies.remove("authToken");
      sessionStorage.removeItem("authToken");
      resolve("Successfully logged out");
    }, 2000);
  });
};

const getUserDetail = async () => {
  try {
    const response = await axiosInstance.get("/user");
    console.log(response.data.data);
    return response.data.data;
  } catch (error) {
    throw new Error("Failed to fetch user details");
  }
};

const AuthService = {
  login,
  logout,
  getUserDetail,
};

export default AuthService;
