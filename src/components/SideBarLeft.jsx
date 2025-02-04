import React, { useEffect, useState } from "react";
import { AiOutlineHome } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";
import { HiOutlineClock } from "react-icons/hi";
import { IoTrendingUp } from "react-icons/io5";
import { SlGameController } from "react-icons/sl";
import { Link, useLocation } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import TagList from "./TagList";
import { useSelector } from "react-redux";

function SideBarLeft() {
  const [tagsItems, setTagItems] = useState([]);
  const location = useLocation();
  const userLogin = useSelector((state) => state.auth.userDetail);

  const fetchTags = async () => {
    try {
      const response = await axiosInstance.get("/tags");
      setTagItems(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTags();
  }, []);

  return (
    <div>
      <div>
        <div className="flex flex-col gap-3 py-6">
          <Link
            to={"/"}
            className={`flex items-center gap-3 text-md px-4 leading-5 py-3 transition ${location.pathname == "/" ? "bg-red-600 text-white" : "hover:bg-gray-700"}`}>
            <AiOutlineHome size={20} /> Home
          </Link>
          <Link
            to={"/trending"}
            className={`flex items-center gap-3 text-md px-4 leading-5 py-3 transition ${location.pathname == "/trending" ? "bg-red-600 text-white" : "hover:bg-gray-700"}`}>
            <IoTrendingUp size={20} /> Trending
          </Link>
          <Link
            to={"/terbaru"}
            className={`flex items-center gap-3 text-md px-4 leading-5 py-3 transition ${location.pathname == "/terbaru" ? "bg-red-600 text-white" : "hover:bg-gray-700"}`}>
            <HiOutlineClock size={20} /> Terbaru
          </Link>
          <Link
            to={`/user/${userLogin?.id}`}
            className={`flex items-center gap-3 text-md px-4 leading-5 py-3 transition ${location.pathname.startsWith("/user") ? "bg-red-600 text-white" : "hover:bg-gray-700"}`}>
            {userLogin ? (
              <div className="w-6 h-6">
                <img
                  src={
                    userLogin.profilePicture?.image ||
                    "https://res.cloudinary.com/dpofjmzdu/image/upload/v1724926159/assets/pp-notfound.jpg"
                  }
                  alt={userLogin.username}
                  className="rounded-full w-6 h-6"
                />
              </div>
            ) : (
              <div>
                <FaUserCircle
                  size={25}
                  className="group-hover:text-red-600 transition"
                />
              </div>
            )}
            Profile
          </Link>
        </div>
        <div className="border-t border-t-colorBorder">
          <p className="font-bold px-4 py-3 flex items-center gap-3 text-red-600">
            <SlGameController size={20} />
            Topics
          </p>
          <ul className="mt-3 flex flex-col gap-2">
            {tagsItems.map((item) => (
              <TagList
                key={item.id}
                imgUrl={item.imgUrl}
                title={item.name}
                id={item.id}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default SideBarLeft;
