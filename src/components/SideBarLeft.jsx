import React from "react";
import { AiOutlineHome } from "react-icons/ai";
import { HiOutlineClock } from "react-icons/hi";
import { IoTrendingUp } from "react-icons/io5";
import { SlGameController } from "react-icons/sl";

function SideBarLeft() {
  return (
    <div>
      <div>
        <div className="flex flex-col gap-3 py-6">
          <span className="flex items-center gap-3 text-lg px-4 leading-5 bg-red-600 py-3 text-white">
            <AiOutlineHome size={20} /> Home
          </span>
          <span className="flex items-center gap-3 text-lg px-4 leading-5 py-3">
            <IoTrendingUp size={20} /> Trending
          </span>
          <span className="flex items-center gap-3 text-lg px-4 leading-5 py-3">
            <HiOutlineClock size={20} /> Terbaru
          </span>
        </div>
        <div className="border-t border-t-colorBorder">
          <p className="font-bold px-4 text-sm py-3 flex items-center gap-3">
            <SlGameController size={20} />
            Topics
          </p>
          <ul>
            <li>cd</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default SideBarLeft;
