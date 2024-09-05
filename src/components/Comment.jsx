import { useEffect, useState } from "react";
import { getComment } from "../api/commentService";
import {
  PiArrowFatDownBold,
  PiArrowFatUpBold,
  PiArrowFatUpFill,
} from "react-icons/pi";
import { FaRegMessage } from "react-icons/fa6";
import { formatTime } from "../libs/formatTime";

const Comment = ({ postId, comments, setComments }) => {
  useEffect(() => {
    getComment(postId, setComments);
  }, []);

  return (
    <>
      {comments.map((item) => (
        <div key={item.id}>
          <div className="flex items-center gap-3">
            <div className="w-8">
              <img
                src={
                  item.profileImageUrl ||
                  "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg"
                }
                alt={item.username}
                className=" rounded-full"
              />
            </div>
            <div className="flex gap-2 items-center">
              <span className="font-bold text-gray-300">{item.username}</span>
              &bull;
              <span className="text-sm text-gray-300">
                {formatTime(new Date(item?.createdAt))}
              </span>
            </div>
          </div>
          <div className="mx-11">
            <p className="text-sm text-gray-300">{item.content}</p>
          </div>
          <div className="mx-11 py-2 flex text-sm">
            <button className="flex items-center gap-1 px-2">
              <PiArrowFatUpBold />
              <span className="font-bold">1</span>
            </button>
            <button className="flex items-center gap-1 px-2">
              <PiArrowFatDownBold />
              <span className="font-bold">1</span>
            </button>
            <button className="flex items-center gap-2 px-2">
              <FaRegMessage />
              <span className="font-bold">Balas</span>
            </button>
          </div>
        </div>
      ))}
    </>
  );
};

export default Comment;
