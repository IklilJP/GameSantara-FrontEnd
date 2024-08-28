import React, { useEffect } from "react";
import axiosInstance from "../api/axiosInstance";

function ProfilePage() {
  const fetchData = async () => {
    const response = await axiosInstance.get("user");
    console.log(response.data.data);
  };
  useEffect(() => {
    fetchData();
  });

  return <div>ProfilePage</div>;
}

export default ProfilePage;
