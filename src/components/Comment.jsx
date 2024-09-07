import { useEffect, useState } from "react";
import {
  downvoteComment,
  getComment,
  sendCommentChild,
  upvoteComment,
} from "../api/commentService";
import {
  PiArrowFatDownBold,
  PiArrowFatDownFill,
  PiArrowFatUpBold,
  PiArrowFatUpFill,
} from "react-icons/pi";
import { FaRegMessage, FaChevronDown, FaChevronUp } from "react-icons/fa6";
import { formatTime } from "../libs/formatTime";
import { useSelector } from "react-redux";

const Comment = ({ postId, comments = [], setComments }) => {
  const userLogin = useSelector((state) => state.auth.userDetail);
  const [isComment, setIsComment] = useState({});
  const [contentComment, setContentComment] = useState("");
  const [openComment, setOpenComment] = useState({});

  useEffect(() => {
    getComment(postId, setComments);
  }, [postId, setComments]);

  const handleUpvote = async (commentId, isUpVoted, isDownVoted) => {
    try {
      await upvoteComment(
        setComments,
        commentId,
        isUpVoted,
        isDownVoted,
        userLogin,
      );
    } catch (err) {
      console.log(err);
    }
  };

  const handleDownvote = async (commentId, isUpVoted, isDownVoted) => {
    try {
      await downvoteComment(
        setComments,
        commentId,
        isUpVoted,
        isDownVoted,
        userLogin,
      );
    } catch (err) {
      console.log(err);
    }
  };

  if (!comments || comments.length === 0) {
    return null;
  }

  const getChildComments = (parentId) => {
    return comments.filter((comment) => comment.parentCommentId === parentId);
  };

  const renderComments = (commentsList, level = 0) => {
    return commentsList.map((comment) => (
      <div
        key={comment.id}
        className={`mt-2 ml-4 border-l ${comment.childCommentsCount ? "border-gray-700" : "border-none"} rounded-l-xl`}>
        {/* Comment */}
        <div className="flex items-center gap-3">
          <div className="w-7 h-7">
            <img
              src={
                comment.profileImageUrl ||
                "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg"
              }
              alt={comment.username}
              className="rounded-full w-7 h-7"
            />
          </div>
          <div className="flex gap-2 items-center">
            <span className="font-bold text-gray-300">{comment.username}</span>
            &bull;
            <span className="text-sm text-gray-300">
              {formatTime(new Date(comment?.createdAt))}
            </span>
          </div>
        </div>
        <div className="ml-4 mt-3">
          <p className="text-sm text-gray-300">{comment.content}</p>
        </div>
        <div className="ml-4 py-2 flex text-sm">
          <button
            className={`flex items-center gap-1 px-2 hover:bg-gray-600 rounded-2xl transition ${comment.isUpVoted ? "text-green-600" : ""}`}
            onClick={() =>
              handleUpvote(comment.id, comment.isUpVoted, comment.isDownVoted)
            }>
            {comment.isUpVoted ? <PiArrowFatUpFill /> : <PiArrowFatUpBold />}
            <span className="font-bold">{comment.upVotesCount}</span>
          </button>
          <button
            className={`flex items-center gap-1 px-2 hover:bg-gray-600 rounded-2xl transition ${comment.isDownVoted ? "text-red-600" : ""}`}
            onClick={() =>
              handleDownvote(comment.id, comment.isUpVoted, comment.isDownVoted)
            }>
            {comment.isDownVoted ? (
              <PiArrowFatDownFill />
            ) : (
              <PiArrowFatDownBold />
            )}
            <span className="font-bold">{comment.downVotesCount}</span>
          </button>
          <button
            className="flex items-center gap-2 px-2"
            onClick={() =>
              setIsComment((prevState) => ({
                ...prevState,
                [comment.id]: !prevState[comment.id],
              }))
            }>
            <FaRegMessage />
            <span className="font-bold">Balas</span>
          </button>
          <button
            className="ml-2 text-sm text-gray-500 hover:text-gray-300"
            onClick={() =>
              setOpenComment((prevState) => ({
                ...prevState,
                [comment.id]: !prevState[comment.id],
              }))
            }>
            {openComment[comment.id] ? <FaChevronUp /> : <FaChevronDown />}
          </button>
        </div>

        {isComment[comment.id] && (
          <div className="w-10/12 mx-auto p-2 rounded-lg border border-gray-600">
            <textarea
              value={contentComment}
              onChange={(e) => setContentComment(e.target.value)}
              className="w-full p-2 rounded-lg bg-transparent focus:outline-none text-gray-300"></textarea>
            <div className="flex justify-end gap-2 mt-2">
              <button
                className="bg-red-600 text-white px-3 py-1 rounded-lg"
                onClick={() =>
                  setIsComment((prevState) => ({
                    ...prevState,
                    [comment.id]: false,
                  }))
                }>
                Cancel
              </button>
              <button
                className="bg-blue-700 text-white px-3 py-1 rounded-lg"
                onClick={() => {
                  sendCommentChild(
                    postId,
                    comment.id,
                    contentComment,
                    setComments,
                    userLogin,
                  );
                  setContentComment("");
                  setIsComment((prevState) => ({
                    ...prevState,
                    [comment.id]: false,
                  }));
                }}>
                Send
              </button>
            </div>
          </div>
        )}

        {/* Render Child Comments */}
        {openComment[comment.id] &&
          renderComments(getChildComments(comment.id), level + 1)}
      </div>
    ));
  };

  const parentComments = comments.filter((comment) => {
    return !comment.parentCommentId;
  });

  return <>{renderComments(parentComments)}</>;
};

export default Comment;
