import React, { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaRegMessage } from "react-icons/fa6";
import { HiLink } from "react-icons/hi";
import {
  PiArrowFatDownBold,
  PiArrowFatUpBold,
  PiShareFat,
} from "react-icons/pi";
import { id } from "date-fns/locale";
import { formatDistanceToNowStrict } from "date-fns";

function CardThread({ posts }) {
  const [modalShare, setModalShare] = useState(false);
  const [isClamped, setIsClamped] = useState(false);
  const [copyUrl, setCopyUrl] = useState("");
  const bodyRef = useRef(null);

  const handleCopy = () => {
    navigator.clipboard.writeText(copyUrl);
  };

  useEffect(() => {
    const element = bodyRef.current;
    if (element) {
      const originalHeight = element.scrollHeight;
      console.log(originalHeight);
      const clampedHeight = element.clientHeight;
      console.log(clampedHeight);

      setIsClamped(clampedHeight < originalHeight);
    }
  }, [posts]);

  return (
    <>
      {posts.map((item) => (
        <div key={item.id} className="my-3 bg-softBlack p-4 rounded-md">
          <div className="flex items-center gap-x-3">
            <div className="w-8 rounded-full">
              <img
                src={
                  item.profilePictureUrl ||
                  `https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg `
                }
                className="rounded-full"
                alt="User"
              />
            </div>
            <div className="flex justify-center">
              <div className="flex flex-col gap-x-3">
                <div className="flex gap-2">
                  <p className="text-sm font-bold">{item.user}</p>
                  &bull;
                  <span className="text-sm font-bold text-red-600">
                    {item.tagName}
                  </span>
                </div>
                <span className="text-[11px] leading-5">
                  {formatDistanceToNowStrict(new Date(item.createAt), {
                    addSuffix: true,
                    locale: id,
                  })}
                </span>
              </div>
            </div>
          </div>
          <div className="my-5">
            <h2 className="font-bold text-lg">{item.title}</h2>
            <div className="relative mt-1">
              <p ref={bodyRef} className="line-clamp-3 whitespace-pre-line">
                {item.body}
              </p>
              {isClamped && (
                <span className="absolute bottom-0 right-0 text-blue-700 bg-gradient-to-r from-transparent from-5% to-softBlack to-20% w-52 text-right">
                  Lihat selengkapnya...
                </span>
              )}
            </div>
            <div className="mt-2 grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
              {item.pictures?.map((image, index) => (
                <div
                  key={index}
                  className={`relative ${
                    item.pictures.length === 1 ? "col-span-full" : ""
                  }`}>
                  <img
                    src={image.imageUrl}
                    alt={`Gambar ${index + 1}`}
                    className="object-cover w-full h-full rounded-md"
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="flex gap-3 mt-2">
            <div className="flex bg-[#30353B] px-4 py-1 w-32 rounded-3xl justify-around gap-1">
              <div className="flex items-center gap-2 ">
                <PiArrowFatUpBold />
                <span>{item.upVotesCount}</span>
              </div>
              <span className="bg-gray-600 w-[1px]"></span>
              <div className="flex items-center gap-2">
                <PiArrowFatDownBold />
                <span>{item.downVotesCount}</span>
              </div>
            </div>
            <button className="flex bg-[#30353B] px-4 py-1 max-w-32 rounded-3xl justify-around gap-1">
              <div className="flex items-center gap-2">
                <FaRegMessage />
                <span>{item.commentsCount}</span>
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
                    <button className="flex items-center gap-3 py-2 px-3 hover:bg-gray-700 transition">
                      <HiLink /> Salin Link
                    </button>
                  </motion.button>
                )}
              </button>
            </AnimatePresence>
          </div>
        </div>
      ))}
    </>
  );
}

export default CardThread;
