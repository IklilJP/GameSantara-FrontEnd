import React, { useCallback, useEffect, useRef, useState } from "react";
import MainLayout from "../components/MainLayout";
import CardThread from "../components/CardThread";
import { BsFillGrid3X3GapFill } from "react-icons/bs";
import { Link, useParams } from "react-router-dom";
import { PiArrowFatUpBold, PiShareFat } from "react-icons/pi";
import MeatballMenu from "../components/MeatballMenu";
import { useSelector } from "react-redux";
import { LiaEdit } from "react-icons/lia";
import { AnimatePresence, motion } from "framer-motion";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  fetchDataService,
  fetchPostByUserId,
  fetchLikedPostsByUserId,
} from "../api/apiServices";
import { MdScubaDiving } from "react-icons/md";
import axiosInstance from "../api/axiosInstance";
import ShareBox from "../components/ShareBox";

function ProfilePage() {
  const userLogin = useSelector((state) => state.auth.userDetail);
  const [modalShare, setModalShare] = useState(null);
  const [isMenu, setIsMenu] = useState(false);
  const [userDetail, setUserDetail] = useState({});
  const { userId } = useParams();
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [activeTab, setActiveTab] = useState("thread");
  const shareRef = useRef(null);

  useEffect(() => {
    if (userId === userLogin?.id) {
      setUserDetail(userLogin);
    } else {
      axiosInstance
        .get(`/user/${userId}`)
        .then((res) => setUserDetail(res.data.data));
    }
  }, [userLogin, userId]);

  const handleModalShare = (event, postId) => {
    event.preventDefault();
    event.stopPropagation();

    setModalShare((prev) => (prev === postId ? null : postId));
  };

  const fetchDataPosts = useCallback(async () => {
    if (userId === userLogin?.id) {
      await fetchDataService(
        page,
        "user",
        hasMore,
        setPosts,
        setPage,
        setHasMore,
      );
    } else {
      await fetchPostByUserId(
        page,
        hasMore,
        setPosts,
        setPage,
        setHasMore,
        userId,
      );
    }
  }, [userId, userLogin?.id, page, hasMore]);

  const fetchLikedPosts = useCallback(async () => {
    await fetchLikedPostsByUserId(
      page,
      hasMore,
      setPosts,
      setPage,
      setHasMore,
      userId,
    );
  }, [page, hasMore, userId]);

  useEffect(() => {
    if (activeTab === "thread") {
      fetchDataPosts();
    } else if (activeTab === "likes" && page === 1) {
      fetchLikedPosts();
    }
  }, [activeTab, fetchDataPosts, fetchLikedPosts]);

  const handleTabChange = (tab) => {
    if (activeTab === tab) return;

    setActiveTab(tab);
    setPage(1);
    setPosts([]);
    setHasMore(true);
  };

  const handleClickOutside = (event) => {
    if (shareRef.current && !shareRef.current.contains(event.target)) {
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
    <MainLayout>
      <div className="py-12">
        <div className="flex px-10 justify-between">
          <div className="flex gap-6">
            <div className="w-28 h-28 rounded-full flex flex-col items-center">
              {userDetail?.profilePicture ? (
                <img
                  src={userDetail?.profilePicture.image}
                  alt="Profile Picture"
                  className="rounded-full bg-cover w-28 h-28"
                />
              ) : (
                <img
                  src="https://res.cloudinary.com/dpofjmzdu/image/upload/v1724926159/assets/pp-notfound.jpg"
                  alt="Profile Picture"
                  className="rounded-full bg-contain"
                />
              )}
            </div>

            <div className="flex flex-col mt-3">
              <span className="font-bold text-xl capitalize text-gray-200">
                {userDetail?.fullName}
              </span>
              <span>@{userDetail?.username}</span>

              <div className="flex gap-2">
                <div className="flex gap-2">
                  <span className="font-bold">{userDetail?.postsCount}</span>
                  <span>thread</span>
                </div>
                <span>&bull;</span>
                <div className="flex gap-2">
                  <span className="font-bold">{userDetail?.upVotesCount}</span>
                  <span>upvote</span>
                </div>
              </div>
            </div>
          </div>

          <div className="h-10 flex justify-end items-center gap-3">
            <div
              ref={shareRef}
              className="flex rounded-3xl justify-around gap-1 relative group drop-shadow-md hover:bg-[#2A2F36] transition">
              <button
                className="px-4 py-1 max-w-32"
                onClick={(e) => handleModalShare(e, userDetail?.id)}>
                <div className="flex items-center gap-2 w-full h-full">
                  <PiShareFat className="group-hover:text-red-600 transition" />
                </div>
              </button>
              {modalShare && (
                <div className="absolute -bottom-52 -left-10">
                  <ShareBox
                    id={userDetail.id}
                    shareRef={`http://178.128.97.42:8080/user/${userDetail?.id}`}
                  />
                </div>
              )}
            </div>
            {userId === userLogin?.id && (
              <div className="relative w-10 right-0">
                <MeatballMenu
                  IsMenuActive={isMenu}
                  setIsMenuActive={setIsMenu}
                />
                <AnimatePresence>
                  {isMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="absolute w-32 right-5">
                      <Link
                        className="flex items-center gap-2 bg-softBlack hover:bg-gray-600 py-1 px-2 border border-colorBorder rounded-lg transition text-sm"
                        to={"/settings"}>
                        <LiaEdit size={15} />
                        Edit Profile
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>

        <div className="px-16 mt-6 max-w-xs">
          <span className="text-white">{userDetail?.bio}</span>
        </div>

        <div className="mt-10 border-t border-t-gray-700">
          <div className="flex gap-4 justify-center w-5/12 mx-auto">
            <div
              className={`flex justify-center px-3 py-1 ${activeTab === "thread" ? " border-t border-t-red-600" : ""}`}>
              <Link
                className={`flex gap-2 justify-center items-center ${activeTab === "thread" ? "text-red-600" : ""}`}
                onClick={() => handleTabChange("thread")}>
                <BsFillGrid3X3GapFill />
                <span>Thread</span>
              </Link>
            </div>

            <div
              className={`flex justify-center px-3 py-1 ${activeTab === "likes" ? " border-t border-t-red-600" : ""}`}>
              <Link
                className={`flex gap-2 justify-center items-center ${activeTab === "likes" ? "text-red-600" : ""}`}
                onClick={() => handleTabChange("likes")}>
                <PiArrowFatUpBold />
                <span>Disukai</span>
              </Link>
            </div>
          </div>

          <div className="mt-8">
            <InfiniteScroll
              dataLength={posts.length}
              next={activeTab === "thread" ? fetchDataPosts : fetchLikedPosts}
              hasMore={hasMore}
              loader={
                <div className="w-full flex justify-center py-5">
                  <span className="loading loading-spinner loading-md text-red-600"></span>
                </div>
              }
              scrollableTarget="scrollMain"
              endMessage={
                <div className="flex flex-col justify-center items-center gap-2 py-2">
                  <div className="flex items-center gap-2">
                    <MdScubaDiving size={30} color="#dc2626" />
                    <span>Kamu menyelam terlalu dalam</span>
                  </div>
                  <span>Sudah tidak ada postingan lagi</span>
                </div>
              }>
              <CardThread posts={posts} setPosts={setPosts} />
            </InfiniteScroll>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default ProfilePage;
