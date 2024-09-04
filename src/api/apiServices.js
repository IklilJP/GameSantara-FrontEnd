import axiosInstance from "./axiosInstance";

export const getAllPosts = async (page) => {
  try {
    const response = await axiosInstance.get(`/post?page=${page}&size=10`);
    return response;
  } catch (error) {
    return error;
  }
};
