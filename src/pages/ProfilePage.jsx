import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import MainLayout from "../components/Layout";
import CardThread from "../components/CardThread";
import { BsFillGrid3X3GapFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { PiArrowFatUpBold } from "react-icons/pi";

function ProfilePage() {
  const [userProfile, setUserProfile] = useState({});

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get("/user");
      setUserProfile(response.data.data);
    } catch (error) {
      console.log("profile: ", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <MainLayout>
      <div className="py-12">
        <div className="flex px-10 gap-6">
          <div className="w-28 h-28 rounded-full flex flex-col items-center">
            <img
              src="https://res.cloudinary.com/dpofjmzdu/image/upload/v1724926159/assets/pp-notfound.jpg"
              alt="Profile Picture"
              className="rounded-full"
            />
          </div>
          <div className="flex flex-col mt-3">
            <span className="font-bold text-2xl">Syahroni Bawafi</span>
            <span className="text-lg">wapi</span>
            <div className="flex gap-2">
              <div className="flex gap-2">
                <span className="font-bold">10</span>
                <span className="">thread</span>
              </div>
              <span>&bull;</span>
              <div className="flex gap-2">
                <span className="font-bold">534</span>
                <span className="">upvote</span>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-10 border-t border-t-gray-700">
          <div className="flex gap-4 justify-center w-5/12 mx-auto">
            <div className="flex justify-center px-3 py-1 border-t border-t-red-600">
              <Link className="flex gap-2 justify-center items-center text-red-600 font-semibold">
                <BsFillGrid3X3GapFill />
                <span>Thread</span>
              </Link>
            </div>
            <Link className="flex gap-2 justify-center items-center font-semibold">
              <PiArrowFatUpBold />
              <span>upvote</span>
            </Link>
          </div>
          <div className="mt-8">
            <CardThread />
            <CardThread />
            <CardThread />
            <CardThread />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default ProfilePage;
