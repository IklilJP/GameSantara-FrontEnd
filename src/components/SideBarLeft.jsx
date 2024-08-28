import React, { useEffect } from "react";
import { AiOutlineHome } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";
import { HiOutlineClock } from "react-icons/hi";
import { IoTrendingUp } from "react-icons/io5";
import { SlGameController } from "react-icons/sl";
import { useLocation } from "react-router-dom";

function SideBarLeft() {
  const location = useLocation();

  return (
    <div>
      <div>
        <div className="flex flex-col gap-3 py-6">
          <span
            className={`flex items-center gap-3 text-lg px-4 leading-5 py-3 transition ${location.pathname == "/" ? "bg-red-600 text-white" : "hover:bg-gray-700"}`}>
            <AiOutlineHome size={20} /> Home
          </span>
          <span
            className={`flex items-center gap-3 text-lg px-4 leading-5 py-3 transition ${location.pathname == "/trending" ? "bg-red-600 text-white" : "hover:bg-gray-700"}`}>
            <IoTrendingUp size={20} /> Trending
          </span>
          <span
            className={`flex items-center gap-3 text-lg px-4 leading-5 py-3 transition ${location.pathname == "/terbaru" ? "bg-red-600 text-white" : "hover:bg-gray-700"}`}>
            <HiOutlineClock size={20} /> Terbaru
          </span>
          <span
            className={`flex items-center gap-3 text-lg px-4 leading-5 py-3 transition ${location.pathname == "/profile" ? "bg-red-600 text-white" : "hover:bg-gray-700"}`}>
            <FaUserCircle size={20} /> Profile
          </span>
        </div>
        <div className="border-t border-t-colorBorder">
          <p className="font-bold px-4 py-3 flex items-center gap-3 text-red-600">
            <SlGameController size={20} />
            Topics
          </p>
          <ul className="mt-3 flex flex-col gap-6">
            <li>
              <button type="button" className="flex items-center gap-3 px-4">
                <div className="bg-white rounded-full w-6 h-6 ">
                  <img
                    src="https://res.cloudinary.com/dpofjmzdu/image/upload/v1724832661/arcade.png"
                    alt="Login Background"
                    className="object-contain"
                  />
                </div>
                <p>Arcade</p>
              </button>
            </li>
            <li>
              <button type="button" className="flex items-center gap-3 px-4">
                <div className="bg-white rounded-full w-6 h-6 ">
                  <img
                    src="https://res.cloudinary.com/dpofjmzdu/image/upload/v1724816103/arcade.png"
                    alt="Login Background"
                    className="object-contain"
                  />
                </div>
                <p>Arcade</p>
              </button>
            </li>
            <li>
              <button type="button" className="flex items-center gap-3 px-4">
                <div className="bg-white rounded-full w-6 h-6 ">
                  <img
                    src="https://res.cloudinary.com/dpofjmzdu/image/upload/v1724816103/arcade.png"
                    alt="Login Background"
                    className="object-contain"
                  />
                </div>
                <p>Arcade</p>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default SideBarLeft;
