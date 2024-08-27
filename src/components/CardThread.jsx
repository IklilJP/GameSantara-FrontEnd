import React from "react";
import { FaRegMessage } from "react-icons/fa6";
import {
  PiArrowFatDownBold,
  PiArrowFatUpBold,
  PiShareFat,
} from "react-icons/pi";

function CardThread() {
  return (
    <div className="my-3 bg-softBlack p-4">
      <div className="flex items-center gap-x-4">
        <div className="w-10 rounded-full">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg"
            className="rounded-full"
          />
        </div>
        <p>John doe</p>
      </div>
      <div className="relative">
        <div className="m-3">
          <h3 className="my-2 text-lg font-bold">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti,
            ut?
          </h3>
          <p className="line-clamp-3 text-[15px]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae
            repudiandae est beatae architecto quas! Iure, iste exercitationem!
            Molestiae corporis odio commodi impedit quisquam, excepturi omnis
            saepe voluptas suscipit laudantium aliquid. Lorem ipsum dolor sit
            amet consectetur adipisicing elit. Modi veniam eius earum ullam
            exercitationem, perspiciatis expedita sapiente eligendi recusandae
            aliquid itaque? Laborum magnam excepturi cupiditate tempora error
            repellendus autem possimus.
          </p>
          <span className="absolute top-[80px] right-4 text-blue-700  bg-gradient-to-r from-transparent from-10% to-softBlack to-30% w-52 text-right">
            Lihat selengkapnya
          </span>
        </div>
      </div>
      <div className="flex gap-3 mt-2">
        <div className="flex bg-[#30353B] px-2 py-1 max-w-32 rounded-3xl justify-around gap-1">
          <div className="flex items-center gap-x-2 px-2">
            <PiArrowFatUpBold />
            <span>1</span>
          </div>
          <span className="bg-gray-600 w-[1px]"></span>
          <div className="flex items-center gap-x-2 px-2">
            <PiArrowFatDownBold />
            <span>1</span>
          </div>
        </div>
        <div className="flex bg-[#30353B] px-3 py-1 max-w-32 rounded-2xl justify-around gap-1">
          <div className="flex items-center gap-2">
            <FaRegMessage />
            <span>1</span>
          </div>
        </div>
        <div className="flex bg-[#30353B] py-1 px-4 max-w-32 rounded-2xl justify-around gap-1">
          <div className="flex items-center gap-2">
            <PiShareFat />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardThread;
