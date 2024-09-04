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
import axiosInstance from "../api/axiosInstance";
import { useSelector } from "react-redux";
import Alert from "./Alert";

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

  const handleUpvote = async (postId, isUpVoted, isDownVoted) => {
    if (!userLogin) {
      setIsError("Silahkan login terlebih dahulu");
    }
    try {
      const response = await axiosInstance.post(
        `/vote-posts/${postId}/up-vote`,
      );
      if (response.status === 200) {
        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post.id === postId
              ? {
                  ...post,
                  upVotesCount: isUpVoted
                    ? post.upVotesCount - 1
                    : post.upVotesCount + 1,
                  isUpVoted: !isUpVoted,
                  downVotesCount: isDownVoted
                    ? post.downVotesCount - 1
                    : post.downVotesCount,
                  isDownVoted: false,
                }
              : post,
          ),
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDownvote = async (postId, isDownVoted, isUpVoted) => {
    if (!userLogin) {
      setIsError("Silahkan login terlebih dahulu");
    }
    try {
      const response = await axiosInstance.post(
        `/vote-posts/${postId}/down-vote`,
      );
      if (response.status === 200) {
        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post.id === postId
              ? {
                  ...post,
                  downVotesCount: isDownVoted
                    ? post.downVotesCount - 1
                    : post.downVotesCount + 1,
                  isDownVoted: !isDownVoted,
                  upVotesCount: isUpVoted
                    ? post.upVotesCount - 1
                    : post.upVotesCount,
                  isUpVoted: false,
                }
              : post,
          ),
        );
      }
    } catch (error) {
      console.log(error);
    }
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
        <div key={item.id} className="my-3 bg-softBlack p-4 rounded-md">
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
            <h2 className="font-bold text-lg">{item.title}</h2>
            <div className="relative mt-1">
              <p ref={bodyRef} className="line-clamp-3 whitespace-pre-line">
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
          <div className="flex gap-3 mt-2">
            <div className="flex bg-[#30353B] w-32 rounded-3xl justify-around gap-1">
              <button
                className={`flex items-center gap-2 pl-4 py-1  ${
                  item.isUpVoted ? "text-red-600" : ""
                }`}
                onClick={() =>
                  handleUpvote(item.id, item.isUpVoted, item.isDownVoted)
                }>
                {item.isUpVoted ? <PiArrowFatUpFill /> : <PiArrowFatUpBold />}
                <span>{item.upVotesCount}</span>
              </button>
              <span className="bg-gray-600 w-[1px]"></span>
              <button
                className={`flex items-center gap-2 pr-4 py-1 ${
                  item.isDownVoted ? "text-blue-600" : ""
                }`}
                onClick={() =>
                  handleDownvote(item.id, item.isDownVoted, item.isUpVoted)
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
        </div>
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
