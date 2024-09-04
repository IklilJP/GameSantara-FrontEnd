import { useParams } from "react-router-dom";
import MainLayout from "../components/MainLayout";
import { useEffect, useState } from "react";
import { fetchThreadDetailService } from "../api/apiServices";
import { formatDistanceToNowStrict } from "date-fns";
import { id } from "date-fns/locale";
import { HiLink } from "react-icons/hi";
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

const DetailThreadPage = () => {
  const { postId } = useParams();
  const [threadDetail, setThreadDetail] = useState({});
  const [modalShare, setModalShare] = useState(null);
  const userLogin = useSelector((state) => state.auth.userDetail);
  const [isError, setIsError] = useState(null);

  const handleModalShare = (postId) => {
    setModalShare((prev) => (prev === postId ? null : postId));
  };

  const fetchDataDetail = () => {
    fetchThreadDetailService(postId, setThreadDetail);
  };

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setIsError(null);
    }, 2000);

    return () => clearTimeout(timeOut);
  }, [isError]);

  useEffect(() => {
    fetchDataDetail();
  }, []);

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
              className="rounded-full"
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
                  className="object-cover w-full h-full rounded-md"
                />
              </div>
            ))}
          </div>

          <div className="flex mt-10 gap-4 ">
            <div className="flex justify-around">
              <button
                className={`flex bg-[#30353B] items-center gap-2 px-4 py-1 rounded-l-2xl hover:bg-black transition ${
                  threadDetail.isUpVoted ? "text-red-600" : ""
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
                className={`flex bg-[#30353B] items-center gap-2 px-4 py-1 rounded-r-2xl hover:bg-black transition ${
                  threadDetail.isDownVoted ? "text-blue-600" : ""
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
            <button className="flex bg-[#30353B] px-4 py-1 max-w-32 rounded-3xl justify-around gap-1">
              <div className="flex items-center gap-2">
                <FaRegMessage />
                <span className="font-bold">{threadDetail.commentsCount}</span>
              </div>
            </button>
            <AnimatePresence>
              <div className="flex bg-[#30353B] rounded-3xl justify-around gap-1 relative group">
                <button
                  className="px-4 py-1 max-w-32"
                  onClick={() => handleModalShare(threadDetail.id)}>
                  <div className="flex items-center gap-2 w-full h-full">
                    <PiShareFat className="group-hover:text-red-600 transition" />
                  </div>
                </button>
                {modalShare === threadDetail.id && (
                  <motion.button
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    onClick={() =>
                      handleCopy(`https://example.com/posts/${threadDetail.id}`)
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
      </div>
      <AnimatePresence>
        {isError && <Alert isError={isError} />}
      </AnimatePresence>
    </MainLayout>
  );
};

export default DetailThreadPage;
