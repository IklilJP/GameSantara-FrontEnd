import React, { useEffect } from "react";
import axiosInstance from "../api/axiosInstance";
import MainLayout from "../components/Layout";

function ProfilePage() {
  const fetchData = async () => {
    try {
      const response = await axiosInstance.get("/user");
      console.log(response.data.data);
    } catch (error) {
      console.log("profile: ", error);
    }
  };
  useEffect(() => {
    fetchData();
  });

  return <MainLayout>hai</MainLayout>;
}

export default ProfilePage;
