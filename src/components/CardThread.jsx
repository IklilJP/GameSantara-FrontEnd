import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import { FaRegMessage } from "react-icons/fa6";
import { HiLink } from "react-icons/hi";
import {
  PiArrowFatDownBold,
  PiArrowFatUpBold,
  PiShareFat,
} from "react-icons/pi";

function CardThread() {
  const [modalShare, setModalShare] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("COpy BRo");
  };
  return (
    <div className="my-3 bg-softBlack p-4 rounded-md">
      <div className="flex items-center gap-x-3">
        <div className="w-8 rounded-full">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg"
            className="rounded-full"
          />
        </div>
        <div className="flex justify-center">
          <div className="flex flex-col gap-x-3">
            <p className="text-sm font-bold">John doe</p>
            <span className="text-[11px] leading-5">1 Hari</span>
          </div>
          <div className="flex justify-center ml-2">
            &bull;
            <span className="ml-2 text-sm font-bold text-red-600">Arcade</span>
          </div>
        </div>
      </div>
      <div className="my-5">
        <h2 className="font-bold text-lg">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corrupti,
          impedit.
        </h2>
        <div className="relative mt-1">
          <p className="line-clamp-3 whitespace-pre-line">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae
            repudiandae est beatae architecto quas! Iure, iste exercitationem!
            Molestiae corporis odio commodi impedit quisquam, excepturi omnis
            saepe voluptas suscipit laudantium aliquid. Lorem ipsum dolor sit
            amet consectetur adipisicing elit. Modi veniam eius earum ullam
            exercitationem, perspiciatis expedita sapiente eligendi recusandae
            aliquid itaque? Laborum magnam excepturi cupiditate tempora error
            repellendus autem possimus.
          </p>
          <span className="absolute bottom-0 right-0 text-blue-700 bg-gradient-to-r from-transparent from-5% to-softBlack to-20% w-52 text-right">
            Lihat selengkapnya
          </span>
        </div>
      </div>
      <div className="flex gap-3 mt-2">
        <div className="flex bg-[#30353B] px-4 py-1 w-32 rounded-3xl justify-around gap-1">
          <div className="flex items-center gap-2 ">
            <PiArrowFatUpBold />
            <span>1</span>
          </div>
          <span className="bg-gray-600 w-[1px]"></span>
          <div className="flex items-center gap-2">
            <PiArrowFatDownBold />
            <span>6</span>
          </div>
        </div>
        <button className="flex bg-[#30353B] px-4 py-1 max-w-32 rounded-3xl justify-around gap-1">
          <div className="flex items-center gap-2">
            <FaRegMessage />
            <span>1</span>
          </div>
        </button>
        <AnimatePresence>
          <button
            className="flex bg-[#30353B] px-4 py-1 max-w-32 rounded-3xl justify-around gap-1 relative group"
            onClick={() => setModalShare(!modalShare)}>
            <div className="flex items-center gap-2 w-full h-full">
              <PiShareFat className="group-hover:text-red-600 transition" />
            </div>
            {modalShare && (
              <motion.button
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                onClick={handleCopy}
                className="w-36 max-w-40 bg-black absolute top-12 border border-colorBorder rounded-lg">
                <span className="flex items-center gap-3 py-2 px-3  hover:bg-gray-700 transition">
                  <HiLink /> Salin Link
                </span>
              </motion.button>
            )}
          </button>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default CardThread;
