import { useParams } from "react-router-dom";
import MainLayout from "../components/MainLayout";
import { useEffect, useRef, useState } from "react";
import { fetchThreadDetailService } from "../api/apiServices";
import { formatDistanceToNowStrict } from "date-fns";
import { id } from "date-fns/locale";
import {
  PiArrowFatDownBold,
  PiArrowFatDownFill,
  PiArrowFatUpBold,
  PiArrowFatUpFill,
  PiShareFat,
} from "react-icons/pi";
import { FaRegMessage } from "react-icons/fa6";
import { AnimatePresence, motion } from "framer-motion";
import { useSelector } from "react-redux";
import { handleDownvoteDetail, handleUpvoteDetail } from "../api/voteService";
import Linkify from "linkify-react";
import Alert from "../components/Alert";
import { sendComment } from "../api/commentService";
import Comment from "../components/Comment";
import FsLightbox from "fslightbox-react";
import ShareBox from "../components/ShareBox";

const DetailThreadPage = () => {
  const { postId } = useParams();
  const [threadDetail, setThreadDetail] = useState({});
  const [modalShare, setModalShare] = useState(null);
  const userLogin = useSelector((state) => state.auth.userDetail);
  const [isError, setIsError] = useState(null);
  const [isComment, setIsComment] = useState(false);
  const textareaRef = useRef(null);
  const [contentComment, setContentComment] = useState("");
  const [comments, setComments] = useState([]);
  const [lightboxController, setLightboxController] = useState({
    toggler: false,
    slide: 1,
  });
  const shareRef = useRef();

  const handleModalShare = (event, postId) => {
    event.preventDefault();
    event.stopPropagation();
    setModalShare((prev) => (prev === postId ? null : postId));
  };

  const fetchDataDetail = () => {
    fetchThreadDetailService(postId, setThreadDetail);
  };

  const handleSendComment = () => {
    if (!contentComment.trim()) {
      setIsError("Comment cannot be empty");
      return;
    }

    if (!userLogin) {
      setIsError("Silahkan Login Terlebih dahulu");
    }

    sendComment(threadDetail.id, contentComment, null, setComments, userLogin);
    setContentComment("");
  };

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setIsError(null);
    }, 2000);

    return () => clearTimeout(timeOut);
  }, [isError]);

  useEffect(() => {
    if (isComment) {
      textareaRef.current?.focus();
    }
  }, [isComment]);

  useEffect(() => {
    fetchDataDetail();
  }, [postId]);

  const openLightboxOnSlide = (index) => {
    setLightboxController({
      toggler: !lightboxController.toggler,
      slide: index + 1,
    });
  };

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

  if (!threadDetail.user) {
    return (
      <MainLayout>
        <div className="w-full flex justify-center my-5">
          <span className="loading loading-spinner loading-md text-red-600"></span>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="py-8">
        <div className="flex items-center gap-x-3">
          <div className="w-10 rounded-full">
            <img
              src={
                threadDetail.profilePictureUrl ||
                `https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg`
              }
              className="rounded-full w-10 h-10"
              alt="User"
            />
          </div>
          <div className="flex justify-center">
            <div className="flex flex-col gap-x-3">
              <div className="flex gap-2">
                <p className="text-md font-bold">{threadDetail.user}</p>
                &bull;
                <span className="text-sm font-bold text-red-600">
                  {threadDetail.tagName}
                </span>
              </div>
              <span className="text-[12px] leading-5">
                {formatDistanceToNowStrict(new Date(threadDetail?.createAt), {
                  addSuffix: true,
                  locale: id,
                })}
              </span>
            </div>
          </div>
        </div>

        <div className="w-full">
          <div className="mt-2">
            <h2 className="font-bold text-xl my-2">{threadDetail.title}</h2>
            <Linkify
              options={{
                defaultProtocol: "https",
                className: "text-blue-600",
              }}>
              <p className="leading-5 text-sm subpixel-antialiased">
                {threadDetail.body}
              </p>
            </Linkify>
          </div>

          <div className="mt-2 flex flex-col gap-4">
            {threadDetail.pictures?.map((image, index) => (
              <div key={index} className="">
                <img
                  src={image.imageUrl}
                  alt={`Gambar ${index + 1}`}
                  className="object-contain w-full max-h-96 rounded-md"
                  onClick={() => openLightboxOnSlide(index)}
                />
              </div>
            ))}
          </div>

          <div className="flex mt-5 gap-4">
            <div className="flex justify-around drop-shadow-md">
              <button
                className={`flex bg-[#30353B] items-center gap-2 px-3 py-1 rounded-l-2xl hover:bg-black transition ${
                  threadDetail.isUpVoted ? "text-green-600" : ""
                }`}
                onClick={(event) =>
                  handleUpvoteDetail(
                    event,
                    setThreadDetail,
                    setIsError,
                    threadDetail.id,
                    threadDetail.isUpVoted,
                    threadDetail.isDownVoted,
                    userLogin,
                  )
                }>
                {threadDetail.isUpVoted ? (
                  <PiArrowFatUpFill />
                ) : (
                  <PiArrowFatUpBold />
                )}
                <span className="font-bold">{threadDetail.upVotesCount}</span>
              </button>
              <span className="bg-gray-600 w-[1px]"></span>
              <button
                className={`flex bg-[#30353B] items-center gap-2 px-3 py-1 rounded-r-2xl hover:bg-black transition ${
                  threadDetail.isDownVoted ? "text-red-600" : ""
                }`}
                onClick={(event) =>
                  handleDownvoteDetail(
                    event,
                    setThreadDetail,
                    setIsError,
                    threadDetail.id,
                    threadDetail.isDownVoted,
                    threadDetail.isUpVoted,
                    userLogin,
                  )
                }>
                {threadDetail.isDownVoted ? (
                  <PiArrowFatDownFill />
                ) : (
                  <PiArrowFatDownBold />
                )}
                <span className="font-bold">{threadDetail.downVotesCount}</span>
              </button>
            </div>
            <button
              className="flex bg-[#30353B] px-3 py-1 max-w-32 rounded-3xl justify-around gap-1 drop-shadow-md hover:bg-black transition"
              onClick={() => setIsComment(!isComment)}>
              <div className="flex items-center gap-2">
                <FaRegMessage />
                <span className="font-bold">{threadDetail.commentsCount}</span>
              </div>
            </button>
            <div className="flex bg-[#30353B] rounded-3xl justify-around gap-1 relative group drop-shadow-md hover:bg-black transition">
              <button
                className="px-4 py-1 max-w-32"
                onClick={(e) => handleModalShare(e, threadDetail.id)}>
                <div className="flex items-center gap-2 w-full h-full ">
                  <PiShareFat className="group-hover:text-red-600 transition" />
                </div>
              </button>
              {modalShare === threadDetail.id && (
                <ShareBox
                  id={threadDetail.id}
                  shareRef={`http://178.128.97.42:8080/thread/${threadDetail.id}`}
                />
              )}
            </div>
          </div>
        </div>
        <div className="my-3">
          {isComment ? (
            <div className="w-full bg-black top-0 p-3 rounded-lg border border-colorBorder">
              <textarea
                ref={textareaRef}
                value={contentComment}
                onChange={(e) => setContentComment(e.target.value)}
                className="w-full p-2 rounded-lg bg-transparent focus:outline-none"></textarea>
              <div className="flex justify-end gap-2 mt-2">
                <button
                  className="bg-red-600 text-white px-3 py-1 rounded-lg"
                  onClick={() => setIsComment(false)}>
                  Cancel
                </button>
                <button
                  className="bg-blue-700 text-white px-3 py-1 rounded-lg"
                  onClick={() => {
                    handleSendComment();
                    setIsComment(false);
                  }}>
                  Send
                </button>
              </div>
            </div>
          ) : (
            <button
              className="w-full text-left border border-colorBorder py-2 px-4 rounded-2xl hover:bg-gray-800 transition"
              onClick={() => setIsComment(true)}>
              <span>Kirim komentarmu....</span>
            </button>
          )}
        </div>
        <div className="flex flex-col gap-4">
          <Comment
            postId={threadDetail.id}
            comments={comments}
            setComments={setComments}
          />
        </div>

        <FsLightbox
          toggler={lightboxController.toggler}
          sources={threadDetail.pictures?.map((image) => image.imageUrl)}
          slide={lightboxController.slide}
        />
      </div>
      <AnimatePresence>
        {isError && <Alert isError={isError} />}
      </AnimatePresence>
    </MainLayout>
  );
};

export default DetailThreadPage;
