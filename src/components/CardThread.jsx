import React from "react";
import { FaRegMessage } from "react-icons/fa6";
import {
  PiArrowFatDown,
  PiArrowFatDownBold,
  PiArrowFatUp,
  PiArrowFatUpBold,
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
      <div>
        <p className="px-3 py-3">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae
          repudiandae est beatae architecto quas! Iure, iste exercitationem!
          Molestiae corporis odio commodi impedit quisquam, excepturi omnis
          saepe voluptas suscipit laudantium aliquid.
        </p>
      </div>
      <div className="flex gap-3">
        <div className="flex bg-[#30353B] px-2 py-1 max-w-32 rounded-3xl justify-around gap-1">
          <div className="flex items-center gap-2 ">
            <PiArrowFatUpBold />
            <span>1</span>
          </div>
          <span className="bg-gray-600 w-[1px]"></span>
          <div className="flex items-center gap-2">
            <PiArrowFatDownBold />
            <span>1</span>
          </div>
        </div>
        <div className="flex bg-[#30353B] p-2 max-w-32 rounded-3xl justify-around gap-1">
          <div className="flex items-center gap-2">
            <FaRegMessage />
            <span>1</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardThread;
