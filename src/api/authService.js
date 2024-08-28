import { axiosInstance } from "./axiosInstance";

const login = async (email, password) => {
  try {
    const response = await axiosInstance.post("/auth/login", {
      email,
      password,
    });

    const { token } = response.data.data;

    if (token) {
      localStorage.setItem("token", token);
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
      localStorage.removeItem("token");
      resolve("Berhasil logout");
    }, 3000);
  });
};

const AuthService = {
  login,
  logout,
};

export default AuthService;
