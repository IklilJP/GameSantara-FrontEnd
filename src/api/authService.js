import { jwtDecode } from "jwt-decode";
import { axiosInstance } from "./axiosInstance";
import Cookies from "js-cookie";

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
          secure: true,
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
      resolve("Berhasil logout");
    }, 3000);
  });
};

const AuthService = {
  login,
  logout,
};

export default AuthService;
