import React, { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaRegMessage } from "react-icons/fa6";
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
import { Link, useNavigate } from "react-router-dom";
import { handleDownvote, handleUpvote } from "../api/voteService";
import ShareBox from "./ShareBox";

function CardThread({ posts, setPosts }) {
  const [modalShare, setModalShare] = useState(null);
  const bodyRef = useRef(null);
  const userLogin = useSelector((state) => state.auth.userDetail);
  const [isError, setIsError] = useState(null);
  const navigate = useNavigate();
  const shareRef = useRef(null);

  const handleModalShare = (event, postId) => {
    event.preventDefault();
    event.stopPropagation();

    setModalShare((prev) => (prev === postId ? null : postId));
  };

  const handleComment = (event, postId) => {
    event.preventDefault();
    event.stopPropagation();
    navigate(`/thread/${postId}`);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsError(null);
    }, 2000);

    return () => clearTimeout(timeout);
  }, [isError]);

  const handleClickOutside = (event) => {
    if (
      shareRef.current &&
      !shareRef.current.contains(event.target) &&
      !event.target.closest("button")
    ) {
      setModalShare(null);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modalShare]);

  return (
    <>
      {posts.map((item) => (
        <div key={item.id}>
          <Link
            to={`/thread/${item.id}`}
            key={item.id}
            className="mt-3 bg-softBlack p-4 rounded-t-md block hover:bg-[#2D3239] transition">
            <div className="flex items-center gap-x-3">
              <Link to={`/user/${item.userId}`}>
                <div className="w-8 h-8 rounded-full">
                  <img
                    src={
                      item.profilePictureUrl ||
                      `https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg`
                    }
                    className="rounded-full w-7 h-7"
                    alt="User"
                  />
                </div>
              </Link>
              <div className="flex justify-center">
                <div className="flex flex-col gap-x-3">
                  <div className="flex gap-2">
                    <Link to={`/user/${item.userId}`}>
                      <p className="text-sm font-bold">{item.user}</p>
                    </Link>
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
            <div className="mt-3">
              <h2 className="font-bold text-lg leading-6">{item.title}</h2>
              <div className="relative mt-1">
                <p
                  ref={bodyRef}
                  className="line-clamp-3 whitespace-pre-line text-sm leading-5">
                  {item.body}
                </p>
              </div>
              <div className="mt-2 grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-2">
                {item.pictures?.slice(0, 4).map((image, index) => (
                  <div
                    key={index}
                    className={`relative ${
                      item.pictures.length === 1 ? "col-span-full" : ""
                    }`}>
                    <img
                      src={image.imageUrl}
                      alt={`Gambar ${index + 1}`}
                      className="object-cover w-full h-full rounded-md aspect-square"
                    />
                    {index === 3 && item.pictures.length > 4 && (
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-md">
                        <span className="text-white text-lg font-bold">
                          +{item.pictures.length - 3}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </Link>
          <div className="flex gap-4 bg-softBlack rounded-b-xl">
            <div className="flex justify-around drop-shadow-md">
              <button
                className={`flex bg-[#30353B] items-center gap-2 px-3 py-1 rounded-l-2xl hover:bg-[#2a2f36] transition ${
                  item.isUpVoted ? "text-green-600" : ""
                }`}
                onClick={(event) =>
                  handleUpvote(
                    event,
                    setPosts,
                    setIsError,
                    item.id,
                    item.isUpVoted,
                    item.isDownVoted,
                    userLogin,
                  )
                }>
                {item.isUpVoted ? <PiArrowFatUpFill /> : <PiArrowFatUpBold />}
                <span className="font-bold">{item.upVotesCount}</span>
              </button>
              <span className="bg-gray-600 w-[1px]"></span>
              <button
                className={`flex bg-[#30353B] items-center gap-2 px-3 py-1 rounded-r-2xl hover:bg-[#2a2f36] transition ${
                  item.isDownVoted ? "text-red-600" : ""
                }`}
                onClick={(event) =>
                  handleDownvote(
                    event,
                    setPosts,
                    setIsError,
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
                <span className="font-bold">{item.downVotesCount}</span>
              </button>
            </div>
            <button
              className="flex bg-[#30353B] px-3 py-1 max-w-32 rounded-3xl justify-around gap-1 drop-shadow-md hover:bg-[#2A2F36] transition"
              onClick={(event) => handleComment(event, item.id)}>
              <div className="flex items-center gap-2">
                <FaRegMessage />
                <span className="font-bold">{item.commentsCount}</span>
              </div>
            </button>
            <div
              ref={shareRef}
              className="flex bg-[#30353B] rounded-3xl justify-around gap-1 relative group drop-shadow-md hover:bg-[#2A2F36] transition">
              <button
                className="px-4 py-1 max-w-32"
                onClick={(e) => handleModalShare(e, item.id)}>
                <div className="flex items-center gap-2 w-full h-full">
                  <PiShareFat className="group-hover:text-red-600 transition" />
                </div>
              </button>
              {modalShare === item.id && (
                <ShareBox
                  id={item.id}
                  shareRef={`http://178.128.97.42:8080/thread/${item.id}`}
                />
              )}
            </div>
          </div>
        </div>
      ))}
      <AnimatePresence>
        {isError && <Alert isError={isError} />}
      </AnimatePresence>
    </>
  );
}

export default CardThread;
