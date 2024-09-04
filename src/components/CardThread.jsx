import React, { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaRegMessage } from "react-icons/fa6";
import { HiLink } from "react-icons/hi";
import {
  PiArrowFatDownBold,
  PiArrowFatDownFill,
  PiArrowFatUpBold,
  PiArrowFatUpFill,
  PiShareFat,
} from "react-icons/pi";
import { id } from "date-fns/locale";
import { formatDistanceToNowStrict } from "date-fns";
import { useSelector } from "react-redux";
import Alert from "./Alert";
import { Link } from "react-router-dom";
import { handleDownvote, handleUpvote } from "../api/voteService";

function CardThread({ posts, setPosts }) {
  const [modalShare, setModalShare] = useState(null);
  const bodyRef = useRef(null);
  const userLogin = useSelector((state) => state.auth.userDetail);
  const [isError, setIsError] = useState(null);

  const handleCopy = (url) => {
    navigator.clipboard.writeText(url);
  };

  const handleModalShare = (postId) => {
    setModalShare((prev) => (prev === postId ? null : postId));
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsError(null);
    }, 2000);

    return () => clearTimeout(timeout);
  }, [isError]);

  return (
    <>
      {posts.map((item) => (
        <Link
          to={`/thread/${item.id}`}
          key={item.id}
          className="my-3 bg-softBlack p-4 rounded-md block">
          <div className="flex items-center gap-x-3">
            <div className="w-8 rounded-full">
              <img
                src={
                  item.profilePictureUrl ||
                  `https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg`
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
            <h2 className="font-bold text-lg leading-6">{item.title}</h2>
            <div className="relative mt-1">
              <p
                ref={bodyRef}
                className="line-clamp-3 whitespace-pre-line text-sm leading-5">
                {item.body}
              </p>
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
          <div className="flex mt-2 gap-4">
            <div className="flex justify-around">
              <button
                className={`flex bg-[#30353B] items-center gap-2 px-4 py-1 rounded-l-2xl hover:bg-black transition ${
                  item.isUpVoted ? "text-red-600" : ""
                }`}
                onClick={(event) =>
                  handleUpvote(
                    event,
                    setPosts,
                    item.id,
                    item.isUpVoted,
                    item.isDownVoted,
                    userLogin,
                  )
                }>
                {item.isUpVoted ? <PiArrowFatUpFill /> : <PiArrowFatUpBold />}
                <span>{item.upVotesCount}</span>
              </button>
              <span className="bg-gray-600 w-[1px]"></span>
              <button
                className={`flex bg-[#30353B] items-center gap-2 px-4 py-1 rounded-r-2xl hover:bg-black transition ${
                  item.isDownVoted ? "text-blue-600" : ""
                }`}
                onClick={(event) =>
                  handleDownvote(
                    event,
                    setPosts,
                    item.id,
                    item.isDownVoted,
                    item.isUpVoted,
                    userLogin,
                  )
                }>
                {item.isDownVoted ? (
                  <PiArrowFatDownFill />
                ) : (
                  <PiArrowFatDownBold />
                )}
                <span>{item.downVotesCount}</span>
              </button>
            </div>
            <button className="flex bg-[#30353B] px-4 py-1 max-w-32 rounded-3xl justify-around gap-1">
              <div className="flex items-center gap-2">
                <FaRegMessage />
                <span>{item.commentsCount}</span>
              </div>
            </button>
            <AnimatePresence>
              <div className="flex bg-[#30353B] rounded-3xl justify-around gap-1 relative group">
                <button
                  className="px-4 py-1 max-w-32"
                  onClick={() => handleModalShare(item.id)}>
                  <div className="flex items-center gap-2 w-full h-full">
                    <PiShareFat className="group-hover:text-red-600 transition" />
                  </div>
                </button>
                {modalShare === item.id && (
                  <motion.button
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    onClick={() =>
                      handleCopy(`https://example.com/posts/${item.id}`)
                    }
                    className="w-36 max-w-40 bg-black absolute top-12 border border-colorBorder rounded-lg">
                    <div className="flex items-center gap-3 py-2 px-3 hover:bg-gray-700 transition">
                      <HiLink /> Salin Link
                    </div>
                  </motion.button>
                )}
              </div>
            </AnimatePresence>
          </div>
        </Link>
      ))}
      <AnimatePresence>
        {isError && (
          <div>
            <Alert isError={isError} />
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

export default CardThread;
